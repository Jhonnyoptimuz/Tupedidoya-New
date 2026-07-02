import { NextResponse } from "next/server"
import MENU from "@/data/menu"
import supabaseAdmin from "@/lib/supabaseAdmin"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get("slug") || undefined

  if (!supabaseAdmin) {
    if (slug) {
      if (MENU.restaurant.handle !== slug) {
        return NextResponse.json(null, { status: 404 })
      }
    }
    return NextResponse.json(MENU.restaurant)
  }

  try {
    let restaurantQuery = supabaseAdmin.from("restaurants").select("id,name,handle").limit(1)
    if (slug) restaurantQuery = restaurantQuery.eq("handle", slug)

    const { data: restaurants, error: rErr } = await restaurantQuery
    if (rErr) throw rErr
    if (!restaurants || restaurants.length === 0) {
      return NextResponse.json(null, { status: 404 })
    }

    const restaurant = restaurants[0]
    const { data: categories, error: cErr } = await supabaseAdmin
      .from("categories")
      .select("id,name")
      .eq("restaurant_id", restaurant.id)

    if (cErr) throw cErr

    const categoryIds = (categories || []).map((c: any) => c.id)
    let items: any[] = []
    if (categoryIds.length > 0) {
      const { data: itemsData, error: iErr } = await supabaseAdmin
        .from("items")
        .select("id,category_id,name,price,description")
        .in("category_id", categoryIds)
      if (iErr) throw iErr
      items = itemsData || []
    }

    const categoriesWithItems = (categories || []).map((c: any) => ({
      name: c.name,
      items: (items || [])
        .filter((it) => it.category_id === c.id)
        .map((it) => ({
          name: it.name,
          price: Number(it.price),
          description: it.description,
        })),
    }))

    return NextResponse.json({ name: restaurant.name, handle: restaurant.handle, categories: categoriesWithItems })
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("public menu route error:", err)
    return NextResponse.json({ error: "internal_error", details: err?.message || String(err) }, { status: 500 })
  }
}
