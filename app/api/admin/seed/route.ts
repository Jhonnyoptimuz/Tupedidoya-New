import { NextResponse } from "next/server"
import supabaseAdmin from "@/lib/supabaseAdmin"
import { requireAdminSecret } from "@/lib/adminAuth"

const menuData = [
  { restaurant_handle: "lasalitas-ve", category: "ALI-BOXES", name: "10 piezas", price: 8, description: "1 aderezo" },
  { restaurant_handle: "lasalitas-ve", category: "ALI-BOXES", name: "21 piezas", price: 15, description: "2 aderezos" },
  { restaurant_handle: "lasalitas-ve", category: "ALI-BOXES", name: "36 piezas", price: 22, description: "3 aderezos" },
  { restaurant_handle: "lasalitas-ve", category: "ALI-BOXES", name: "70 piezas", price: 43, description: "5 aderezos" },
  { restaurant_handle: "lasalitas-ve", category: "ALI-BOXES", name: "BIG BOX", price: 59, description: "100 piezas, 7 aderezos" },
  { restaurant_handle: "lasalitas-ve", category: "COMBOS", name: "Solito", price: 9, description: "7 piezas, papitas, 1 aderezo" },
  { restaurant_handle: "lasalitas-ve", category: "COMBOS", name: "Doble", price: 16, description: "14 piezas, papitas, 5 tequeños, 2 aderezos" },
  { restaurant_handle: "lasalitas-ve", category: "COMBOS", name: "Feliz", price: 21, description: "21 piezas, papitas, 5 tequeños, 3 aderezos" },
  { restaurant_handle: "lasalitas-ve", category: "COMBOS", name: "Jumbo", price: 36, description: "35 piezas, 10 tequeños, doble papitas" },
]

export async function POST(request: Request) {
  const authError = requireAdminSecret(request)
  if (authError) return authError

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error: "supabase_admin_not_configured",
        message:
          "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SERVICE_ROLE_KEY) in .env.local.",
      },
      { status: 500 }
    )
  }

  try {
    const { data, error } = (await supabaseAdmin
      .from("menu_items")
      .upsert(menuData as any, { onConflict: ["name", "restaurant_handle"] })) as any

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Base de datos poblada exitosamente", data })
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("admin seed error:", err)
    return NextResponse.json({ error: "seed_failed", details: err?.message || String(err) }, { status: 500 })
  }
}
