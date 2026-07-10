export type Product = {
  id: string;
  name: string;
  seller: string;
  price: number;
  color: string;
  emoji: string;
};

export const products: Product[] = [
  { id: '1', name: 'Pour-Over Ceramic Kettle', seller: 'Hearth & Home Co.', price: 48, color: '#C97B4A', emoji: '☕' },
  { id: '2', name: 'Recycled Wool Throw', seller: 'Nordwool Studio', price: 76, color: '#6B7A8F', emoji: '🧶' },
  { id: '3', name: 'Mechanical Desk Lamp', seller: 'Foundry Lighting', price: 112, color: '#3E4C50', emoji: '💡' },
  { id: '4', name: 'Canvas Weekender Bag', seller: 'Port & Anchor', price: 89, color: '#8A6E4B', emoji: '🎒' },
  { id: '5', name: 'Stackable Planter Set', seller: 'Terra Studio', price: 34, color: '#5B7A5B', emoji: '🪴' },
  { id: '6', name: 'Wireless Earbuds Case', seller: 'Loop Audio', price: 59, color: '#4A5568', emoji: '🎧' },
  { id: '7', name: 'Hand-poured Soy Candle', seller: 'Glow & Ember', price: 22, color: '#A9705A', emoji: '🕯️' },
  { id: '8', name: 'Bamboo Cutting Board', seller: 'Grove Kitchenware', price: 38, color: '#7C8B5E', emoji: '🍽️' },
];
