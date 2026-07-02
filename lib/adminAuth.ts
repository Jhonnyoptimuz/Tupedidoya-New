import { NextResponse } from "next/server"

export function requireAdminSecret(request: Request) {
  const secret = request.headers.get("x-admin-secret")
  const adminSecret = process.env.SUPABASE_ADMIN_SECRET || process.env.ADMIN_SECRET_KEY

  if (!adminSecret) {
    return NextResponse.json(
      { error: "admin_secret_not_configured", message: "Set SUPABASE_ADMIN_SECRET or ADMIN_SECRET_KEY on the server." },
      { status: 500 }
    )
  }

  if (!secret || secret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return null
}
