const MENU = {
  restaurant: {
    name: "Las Alitas",
    handle: "lasalitas-ve",
    categories: [
      {
        name: "Alitas",
        items: [
          {
            name: "Alitas Clásicas",
            price: 12,
            description: "Alitas doradas con la receta tradicional de la casa.",
          },
          {
            name: "Alitas BBQ",
            price: 14,
            description: "Alitas bañadas en salsa BBQ dulce y ahumada.",
          },
        ],
      },
      {
        name: "Especialidades",
        items: [
          {
            name: "Combo Familiar",
            price: 28,
            description: "12 alitas, papas fritas y bebida grande.",
          },
          {
            name: "Alitas Picantes",
            price: 15,
            description: "Con salsa picante casera para los más atrevidos.",
          },
        ],
      },
      {
        name: "Bebidas",
        items: [
          {
            name: "Refresco",
            price: 3,
            description: "Surtido de refrescos bien fríos.",
          },
          {
            name: "Agua Mineral",
            price: 2,
          },
        ],
      },
    ],
  },
}

export default MENU
