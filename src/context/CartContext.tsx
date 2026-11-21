import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "../data/products";

export const CUSTOM_TEE_ID = "CUSTOM-SIGNATURE-TEE";
export const CUSTOM_TEE_BASE_PRICE = 1890;
export const CUSTOM_TEE_DEMO_LIMIT = 10;

export const customPrints = [
  { id: "none", name: "No Print", price: 0 },
  { id: "original", name: "Original", price: 450 },
  { id: "freedom", name: "Freedom", price: 550 },
  { id: "street", name: "Street Club", price: 650 },
  { id: "minimal", name: "Minimal", price: 350 },
] as const;

export const customColors = ["Ivory", "Black", "Burgundy", "Grey"] as const;
export const customSizes = ["S", "M", "L", "XL"] as const;

type RegularCartItem = {
  kind: "regular";
  key: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type CustomizedCartItem = {
  kind: "custom";
  key: string;
  productId: typeof CUSTOM_TEE_ID;
  size: string;
  color: string;
  printId: string;
  quantity: number;
};

export type CartItem = RegularCartItem | CustomizedCartItem;

type CartResult = { success: boolean; message: string };

type CartContextType = {
  items: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (product: Product, size: string, color: string) => CartResult;
  addCustomItem: (size: string, color: string, printId: string) => CartResult;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
};

const STORAGE_KEY = "jeanyous-cart-v2";
const LEGACY_STORAGE_KEY = "jeanyous-cart-v1";
const CartContext = createContext<CartContextType | null>(null);

function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

function regularKey(productId: string, size: string, color: string) {
  return JSON.stringify(["regular", productId, size, color]);
}

function customKey(size: string, color: string, printId: string) {
  return JSON.stringify(["custom", CUSTOM_TEE_ID, size, color, printId]);
}

export function getCustomPrint(id: string) {
  return customPrints.find((print) => print.id === id);
}

export function getItemUnitPrice(item: CartItem): number {
  if (item.kind === "custom") {
    return CUSTOM_TEE_BASE_PRICE + (getCustomPrint(item.printId)?.price ?? 0);
  }
  return getProduct(item.productId)?.price ?? 0;
}

function validQuantity(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function parseCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const unique = new Map<string, CartItem>();

  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    if (
      typeof item.size !== "string" ||
      typeof item.color !== "string" ||
      !validQuantity(item.quantity)
    ) continue;

    if (item.kind === "custom") {
      if (
        item.productId !== CUSTOM_TEE_ID ||
        typeof item.printId !== "string" ||
        !getCustomPrint(item.printId) ||
        !customSizes.some((size) => size === item.size) ||
        !customColors.some((color) => color === item.color)
      ) continue;

      const key = customKey(item.size, item.color, item.printId);
      const old = unique.get(key);
      const quantity = Math.min(CUSTOM_TEE_DEMO_LIMIT, (old?.quantity ?? 0) + item.quantity);
      unique.set(key, {
        kind: "custom", key, productId: CUSTOM_TEE_ID,
        size: item.size, color: item.color, printId: item.printId, quantity,
      });
      continue;
    }

    if (typeof item.productId !== "string") continue;
    const product = getProduct(item.productId);
    if (
      !product || product.stock <= 0 ||
      !product.sizes.includes(item.size) ||
      !product.colors.includes(item.color)
    ) continue;

    const key = regularKey(item.productId, item.size, item.color);
    const existing = unique.get(key);
    const alreadyReserved = Array.from(unique.values())
      .filter((entry) => entry.kind === "regular" && entry.productId === product.id && entry.key !== key)
      .reduce((sum, entry) => sum + entry.quantity, 0);
    const available = Math.max(0, product.stock - alreadyReserved);
    if (!available) continue;
    const quantity = Math.min(available, (existing?.quantity ?? 0) + item.quantity);
    unique.set(key, {
      kind: "regular", key, productId: item.productId,
      size: item.size, color: item.color, quantity,
    });
  }
  return Array.from(unique.values());
}

function readStoredCart(): CartItem[] {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current !== null) return parseCart(JSON.parse(current));
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacy ? parseCart(JSON.parse(legacy)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const itemsRef = useRef(items);
  const [isCartOpen, setCartOpen] = useState(false);

  function commit(next: CartItem[]) {
    itemsRef.current = next;
    setItems(next);
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Cart remains usable in this tab if storage is unavailable.
    }
  }, [items]);

  function addItem(product: Product, size: string, color: string): CartResult {
    const currentProduct = getProduct(product.id);
    if (!currentProduct || currentProduct.stock <= 0) {
      return { success: false, message: "This product is unavailable." };
    }
    if (!currentProduct.sizes.includes(size) || !currentProduct.colors.includes(color)) {
      return { success: false, message: "Please select a valid size and color." };
    }
    const previous = itemsRef.current;
    const total = previous
      .filter((item) => item.kind === "regular" && item.productId === product.id)
      .reduce((sum, item) => sum + item.quantity, 0);
    if (total >= currentProduct.stock) {
      return { success: false, message: "Maximum available stock reached." };
    }
    const key = regularKey(product.id, size, color);
    const existing = previous.find((item) => item.key === key);
    commit(existing
      ? previous.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      : [...previous, { kind: "regular", key, productId: product.id, size, color, quantity: 1 }]);
    setCartOpen(true);
    return { success: true, message: "Added to your shopping bag." };
  }

  function addCustomItem(size: string, color: string, printId: string): CartResult {
    if (
      !customSizes.some((value) => value === size) ||
      !customColors.some((value) => value === color) ||
      !getCustomPrint(printId)
    ) return { success: false, message: "Please select a valid size, color and print." };

    const previous = itemsRef.current;
    const key = customKey(size, color, printId);
    const existing = previous.find((item) => item.key === key);
    if (existing && existing.quantity >= CUSTOM_TEE_DEMO_LIMIT) {
      return { success: false, message: "Demo limit of 10 for this design reached." };
    }
    commit(existing
      ? previous.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      : [...previous, { kind: "custom", key, productId: CUSTOM_TEE_ID, size, color, printId, quantity: 1 }]);
    setCartOpen(true);
    return { success: true, message: "Customized T-shirt added to your bag." };
  }

  function updateQuantity(key: string, quantity: number) {
    if (!Number.isSafeInteger(quantity)) return;
    const previous = itemsRef.current;
    const target = previous.find((item) => item.key === key);
    if (!target) return;
    if (quantity <= 0) {
      commit(previous.filter((item) => item.key !== key));
      return;
    }
    if (target.kind === "custom") {
      commit(previous.map((item) => item.key === key
        ? { ...item, quantity: Math.min(quantity, CUSTOM_TEE_DEMO_LIMIT) } : item));
      return;
    }
    const product = getProduct(target.productId);
    if (!product) return;
    const otherQuantity = previous
      .filter((item) => item.kind === "regular" && item.productId === target.productId && item.key !== key)
      .reduce((sum, item) => sum + item.quantity, 0);
    const available = Math.max(0, product.stock - otherQuantity);
    if (available === 0) return;
    commit(previous.map((item) => item.key === key
      ? { ...item, quantity: Math.min(quantity, available) } : item));
  }

  function removeItem(key: string) {
    commit(itemsRef.current.filter((item) => item.key !== key));
  }

  function clearCart() {
    commit([]);
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + getItemUnitPrice(item) * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isCartOpen, setCartOpen, addItem, addCustomItem,
      updateQuantity, removeItem, clearCart, cartCount, subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
