export type Product = {
  id: string;
  name: string;
  seller: string;
  price: number;
  mrp?: number;
  rating?: number;
  reviewCount?: number;
  color: string;
  emoji: string;
};

export const products: Product[] = [
  { id: '1', name: 'Pour-Over Ceramic Kettle', seller: 'Hearth & Home Co.', price: 48, mrp: 68, rating: 4.3, reviewCount: 1204, color: '#C97B4A', emoji: '☕' },
  { id: '2', name: 'Recycled Wool Throw', seller: 'Nordwool Studio', price: 76, mrp: 99, rating: 4.1, reviewCount: 532, color: '#6B7A8F', emoji: '🧶' },
  { id: '3', name: 'Mechanical Desk Lamp', seller: 'Foundry Lighting', price: 112, mrp: 149, rating: 4.5, reviewCount: 2871, color: '#3E4C50', emoji: '💡' },
  { id: '4', name: 'Canvas Weekender Bag', seller: 'Port & Anchor', price: 89, mrp: 120, rating: 4.0, reviewCount: 341, color: '#8A6E4B', emoji: '🎒' },
  { id: '5', name: 'Stackable Planter Set', seller: 'Terra Studio', price: 34, mrp: 45, rating: 4.4, reviewCount: 678, color: '#5B7A5B', emoji: '🪴' },
  { id: '6', name: 'Wireless Earbuds Case', seller: 'Loop Audio', price: 59, mrp: 79, rating: 3.9, reviewCount: 219, color: '#4A5568', emoji: '🎧' },
  { id: '7', name: 'Hand-poured Soy Candle', seller: 'Glow & Ember', price: 22, mrp: 30, rating: 4.6, reviewCount: 1532, color: '#A9705A', emoji: '🕯️' },
  { id: '8', name: 'Bamboo Cutting Board', seller: 'Grove Kitchenware', price: 38, mrp: 52, rating: 4.2, reviewCount: 890, color: '#7C8B5E', emoji: '🍽️' },
];
