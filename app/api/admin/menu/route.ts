import { NextResponse } from "next/server"
import supabaseAdmin from "@/lib/supabaseAdmin"
import { requireAdminSecret } from "@/lib/adminAuth"

export async function GET(request: Request) {
  const authError = requireAdminSecret(request)
  if (authError) return authError

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin client not configured" }, { status: 500 })
  }

  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get("slug") || undefined

    // Fetch restaurant (by handle if provided, otherwise first)
    let restaurantQuery = supabaseAdmin.from("restaurants").select("id,name,handle").limit(1)
    if (slug) restaurantQuery = restaurantQuery.eq("handle", slug)

    const { data: restaurants, error: rErr } = (await restaurantQuery) as any
    if (rErr) throw rErr
    if (!restaurants || restaurants.length === 0) return NextResponse.json(null, { status: 404 })

    const restaurant = restaurants[0]

    // Fetch categories
    const { data: categories, error: cErr } = (await supabaseAdmin
      .from("categories")
      .select("id,name")
      .eq("restaurant_id", restaurant.id)) as any

    if (cErr) throw cErr

    const categoryIds = (categories || []).map((c: any) => c.id)

    // Fetch items belonging to these categories
    let items: any[] = []
    if (categoryIds.length > 0) {
      const { data: itemsData, error: iErr } = (await supabaseAdmin
        .from("items")
        .select("id,category_id,name,price,description")
        .in("category_id", categoryIds)) as any
      if (iErr) throw iErr
      items = itemsData || []
    }

    const categoriesWithItems = (categories || []).map((c: any) => ({
      name: c.name,
      items: (items || []).filter((it) => it.category_id === c.id).map((it) => ({
        name: it.name,
        price: Number(it.price),
        description: it.description,
      })),
    }))

    return NextResponse.json({ name: restaurant.name, handle: restaurant.handle, categories: categoriesWithItems })
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("admin/menu route error:", err)
    return NextResponse.json({ error: "internal_error", details: err?.message || String(err) }, { status: 500 })
  }
}
