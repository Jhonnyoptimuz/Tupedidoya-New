export function FooterButton() {
  return (
    <div className="fixed bottom-6 left-1/2 z-20 w-[calc(100%-2rem)] -translate-x-1/2 rounded-3xl border border-black bg-black px-6 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:w-[min(720px,calc(100%-3rem))]">
      <div className="flex flex-col items-center justify-between gap-4 text-center text-white sm:flex-row sm:text-left">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Listo para ordenar</p>
          <p className="mt-1 text-xl font-black uppercase tracking-[-0.03em]">Haz tu pedido ahora</p>
        </div>
        <button className="rounded-full bg-[#F6B729] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#ffc142]">
          Ver menú completo
        </button>
      </div>
    </div>
  )
}
