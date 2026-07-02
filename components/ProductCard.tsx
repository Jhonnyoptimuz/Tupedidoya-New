import React from 'react';

interface ProductProps {
  name: string;
  description: string;
  price: number;
}

export const ProductCard = ({ name, description, price }: ProductProps) => {
  // Ajusta este número con tu código de área de Venezuela (+58)
  const phoneNumber = "584220338181"; 
  const message = `Hola, quiero pedir: ${name}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-lg">
      <h3 className="text-xl font-extrabold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">${price.toFixed(2)}</span>
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
};