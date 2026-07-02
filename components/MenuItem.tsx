interface MenuItemProps {
  item: {
    name: string
    price: number
    description?: string
  }
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-transform duration-200 hover:scale-[1.02]">
      <div>
        <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
        {item.description && (
          <p className="mt-1 text-sm text-slate-500">{item.description}</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-lg font-bold text-emerald-600">${item.price}</span>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
          Pedir
        </button>
      </div>
    </div>
  )
}

export default MenuItem
