import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret")
  const adminSecret = process.env.SUPABASE_ADMIN_SECRET || process.env.ADMIN_SECRET_KEY

  if (!adminSecret) {
    return NextResponse.json(
      { error: "admin_secret_not_configured", message: "Set SUPABASE_ADMIN_SECRET or ADMIN_SECRET_KEY on the server." },
      { status: 500 }
    )
  }

  if (!secret || secret !== adminSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.next()
}
