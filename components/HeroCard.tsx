export function HeroCard() {
  return (
    <section className="rounded-[2rem] border border-black bg-white/95 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-700">Bienvenido</p>
      <h2 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em] text-black">
        Tu pedido ya está listo
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Explora el menú, elige tus platos favoritos y completa tu orden en segundos.
        Disfruta de la mejor sazón y entrega rápida desde nuestro restaurante.
      </p>
    </section>
  )
}
