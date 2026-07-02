import MENU from "@/data/menu"

export async function getRestaurantData(slug?: string) {
  const path = slug ? `/api/menu?slug=${encodeURIComponent(slug)}` : "/api/menu"

  try {
    const res = await fetch(path, { next: { revalidate: 60 } })

    if (res.status === 404) {
      return null
    }

    if (!res.ok) {
      throw new Error(`Menu API failed: ${res.status}`)
    }

    return res.json()
  } catch (err) {
    // Fallback to in-memory MENU when the public API is unavailable.
    // eslint-disable-next-line no-console
    console.error("Public menu fetch failed, falling back to in-memory MENU:", err)
    if (slug) {
      return MENU.restaurant.handle === slug ? MENU.restaurant : null
    }
    return MENU.restaurant
  }
}

export default getRestaurantData
