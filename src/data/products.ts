
export type Category = "T-Shirts" | "Hoodies" | "Trousers";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  secondImage: string;
  sizes: string[];
  colors: string[];
  stock: number;
  isNew: boolean;
  description: string;
};

const images = {
  tshirt: [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  ],
  hoodie: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    "https://images.unsplash.com/photo-1578681994506-b8f463449011",
  ],
  trousers: [
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    "https://images.unsplash.com/photo-1517438476312-10d79c077509",
  ],
};

const imageUrl = (url: string, width = 800) =>
  `${url}?auto=format&fit=crop&w=${width}&q=80`;

type ProductSeed = {
  name: string;
  price: number;
  stock: number;
  color: string;
};

const tshirts: ProductSeed[] = [
  { name: "Essential Oversized Tee", price: 1890, stock: 20, color: "Black" },
  { name: "Classic Ivory Tee", price: 1690, stock: 16, color: "Ivory" },
  { name: "Burgundy Signature Tee", price: 2190, stock: 12, color: "Burgundy" },
  { name: "Relaxed Street Tee", price: 1990, stock: 18, color: "Charcoal" },
  { name: "Minimal Everyday Tee", price: 1590, stock: 25, color: "White" },
  { name: "Vintage Washed Tee", price: 2390, stock: 9, color: "Grey" },
  { name: "Urban Graphic Tee", price: 2490, stock: 14, color: "Black" },
  { name: "Premium Boxy Tee", price: 2290, stock: 11, color: "Olive" },
];

const hoodies: ProductSeed[] = [
  { name: "Essential Pullover Hoodie", price: 4290, stock: 14, color: "Black" },
  { name: "Burgundy Core Hoodie", price: 4590, stock: 8, color: "Burgundy" },
  { name: "Oversized Street Hoodie", price: 4890, stock: 10, color: "Grey" },
  { name: "Everyday Comfort Hoodie", price: 3990, stock: 17, color: "Cream" },
  { name: "Minimal Zip Hoodie", price: 4690, stock: 12, color: "Charcoal" },
  { name: "Heavyweight Urban Hoodie", price: 5290, stock: 6, color: "Black" },
  { name: "Relaxed Fit Hoodie", price: 4490, stock: 15, color: "Olive" },
  { name: "Signature Fleece Hoodie", price: 4990, stock: 0, color: "Navy" },
];

const trousers: ProductSeed[] = [
  { name: "Relaxed Cargo Trousers", price: 3490, stock: 13, color: "Black" },
  { name: "Everyday Straight Pants", price: 2990, stock: 19, color: "Beige" },
  { name: "Wide Leg Street Trousers", price: 3790, stock: 8, color: "Charcoal" },
  { name: "Classic Cotton Trousers", price: 3290, stock: 16, color: "Cream" },
  { name: "Utility Cargo Pants", price: 4190, stock: 7, color: "Olive" },
  { name: "Relaxed Jogger Pants", price: 2890, stock: 21, color: "Grey" },
  { name: "Premium Tailored Trousers", price: 4490, stock: 5, color: "Black" },
  { name: "Minimal Everyday Pants", price: 3190, stock: 0, color: "Navy" },
];

function createProducts(
  seeds: ProductSeed[],
  category: Category,
  prefix: string,
  categoryImages: string[],
): Product[] {
  return seeds.map((seed, index) => ({
    id: `${prefix}-${String(index + 1).padStart(3, "0")}`,
    name: seed.name,
    category,
    price: seed.price,
    originalPrice: index === 2 || index === 5
      ? Math.round(seed.price * 1.2 / 10) * 10
      : undefined,
    image: imageUrl(categoryImages[0]),
    secondImage: imageUrl(categoryImages[1]),
    sizes: category === "Trousers"
      ? ["28", "30", "32", "34", "36"]
      : ["S", "M", "L", "XL"],
    colors: [seed.color],
    stock: seed.stock,
    isNew: index < 3,
    description: `${seed.name} is a contemporary unisex ${category.toLowerCase()} piece designed for comfortable everyday styling.`,
  }));
}

export const products: Product[] = [
  ...createProducts(tshirts, "T-Shirts", "TS", images.tshirt),
  ...createProducts(hoodies, "Hoodies", "HD", images.hoodie),
  ...createProducts(trousers, "Trousers", "TR", images.trousers),
];

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}
