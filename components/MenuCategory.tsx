import MenuItem from "@/components/MenuItem"

interface MenuCategoryProps {
  category: {
    name: string
    items: { name: string; price: number; description?: string }[]
  }
}

export function MenuCategory({ category }: MenuCategoryProps) {
  return (
    <section className="w-full">
      <h2 className="mb-4 text-2xl font-black uppercase tracking-widest text-black">{category.name}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {category.items.map((it) => (
          <MenuItem key={it.name} item={it} />
        ))}
      </div>
    </section>
  )
}

export default MenuCategory
