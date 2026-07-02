"use client"

import { useEffect, useState } from "react"
import MenuCategory from "@/components/MenuCategory"
import { HeroCard } from "@/components/HeroCard"
import { FooterButton } from "@/components/FooterButton"

type MenuItem = {
  name: string
  price: number
  description?: string
}

type MenuCategoryType = {
  name: string
  items: MenuItem[]
}

type RestaurantMenu = {
  name: string
  handle: string
  categories: MenuCategoryType[]
}

export default function Home() {
  const [restaurant, setRestaurant] = useState<RestaurantMenu | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = `${window.location.origin}/api/menu`

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Menu fetch failed: ${res.status}`)
        return res.json()
      })
      .then((data) => setRestaurant(data))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
        setError("No se pudo cargar el menú. Intenta de nuevo más tarde.")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="relative min-h-screen bg-[#F6B729] text-black pt-28">
      <div className="mx-auto flex min-h-[calc(100vh-112px)] max-w-6xl flex-col items-center justify-start px-4 pb-28 pt-10 md:px-10">
        <HeroCard />

        <div className="mt-12 w-full">
          <section className="mb-10 rounded-[2rem] border border-black bg-white/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-700">Restaurante</p>
            <h1 className="mt-2 text-4xl font-black uppercase tracking-[-0.05em] text-black">
              {restaurant?.name ?? "Las Alitas"}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{restaurant?.handle ?? "lasalitas-ve"}</p>
          </section>

          {loading ? (
            <div className="space-y-4 p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[2rem] border border-black bg-white/95 p-12 text-center text-lg font-semibold shadow-[0_24px_60px_rgba(0,0,0,0.12)] text-slate-900">
              {error}
            </div>
          ) : restaurant ? (
            <div className="space-y-12">
              {restaurant.categories.map((cat) => (
                <MenuCategory key={cat.name} category={cat} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-black bg-white/95 p-12 text-center text-lg font-semibold shadow-[0_24px_60px_rgba(0,0,0,0.12)] text-slate-900">
              Menú no disponible.
            </div>
          )}
        </div>
      </div>

      <FooterButton />
    </main>
  )
}
