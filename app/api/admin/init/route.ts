import { NextResponse } from "next/server"
import supabaseAdmin from "@/lib/supabaseAdmin"
import MENU from "@/data/menu"
import { requireAdminSecret } from "@/lib/adminAuth"

type RestaurantIdRow = {
  id: number
}

type CategoryRow = {
  id: number
  name: string
}

type ItemRow = {
  id: number
  category_id: number
  name: string
  price: number
  description: string | null
}

export async function POST(request: Request) {
  const authError = requireAdminSecret(request)
  if (authError) return authError

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin client not configured" }, { status: 500 })
  }

  try {
    const restaurantPayload = MENU.restaurant

    // 1) find or create restaurant by handle
    const { data: existing, error: eErr } = (await supabaseAdmin
      .from("restaurants")
      .select("id")
      .eq("handle", restaurantPayload.handle)
      .limit(1)) as { data: { id: number }[] | null; error: any }

    if (eErr) throw eErr

    const existingRestaurant = existing && existing.length > 0 ? existing[0] : null

    let restaurantId: number
    if (existing && existing.length > 0) {
      restaurantId = existing[0].id
    } else {
      restaurantId = 0
    }
    if (restaurantId === 0) {
      const insRes = (await supabaseAdmin
        .from("restaurants")
        .insert({ name: restaurantPayload.name, handle: restaurantPayload.handle } as any)
        .select("id")
        .limit(1)) as any

      if (insRes.error) throw insRes.error

      const inserted = insRes.data as Array<{ id: number }> | null
      restaurantId = inserted?.[0]?.id ?? 0
    }

    // 2) delete existing categories (and cascade items) for a clean seed
    const { error: delErr } = await supabaseAdmin.from("categories").delete().eq("restaurant_id", restaurantId)
    if (delErr) throw delErr

    // 3) insert categories
    const categoriesToInsert = restaurantPayload.categories.map((c: any) => ({ restaurant_id: restaurantId, name: c.name }))
    const { data: insertedCategories, error: catErr } = await supabaseAdmin
      .from("categories")
      .insert(categoriesToInsert)
      .select("id,name")

    if (catErr) throw catErr

    // map category name -> id
    const categoryIdMap: Record<string, number> = {}
    (insertedCategories || []).forEach((c: any) => {
      categoryIdMap[c.name] = c.id
    })

    // 4) insert items in bulk
    const itemsToInsert: any[] = []
    restaurantPayload.categories.forEach((c: any) => {
      const cid = categoryIdMap[c.name]
      if (!cid) return
      c.items.forEach((it: any) => {
        itemsToInsert.push({ category_id: cid, name: it.name, price: it.price, description: it.description })
      })
    })

    let itemsInserted = 0
    if (itemsToInsert.length > 0) {
      const { data: insItems, error: itemsErr } = await supabaseAdmin.from("items").insert(itemsToInsert).select("id")
      if (itemsErr) throw itemsErr
      itemsInserted = (insItems || []).length
    }

    return NextResponse.json({ success: true, restaurantId, categories: (insertedCategories || []).length, itemsInserted })
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("admin init error:", err)
    return NextResponse.json({ error: "init_failed", details: err?.message || String(err) }, { status: 500 })
  }
}
