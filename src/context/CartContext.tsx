import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Product } from '../data/products';
import { trackAddToCart } from '../lib/analytics';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: Product['id']) => void;
  updateQuantity: (productId: Product['id'], quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: Product['id']) => boolean;
  getItemQuantity: (productId: Product['id']) => number;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'porto-exotico-cart';

const isValidCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as CartItem;

  return (
    typeof item.quantity === 'number' &&
    Number.isFinite(item.quantity) &&
    item.quantity > 0 &&
    !!item.product &&
    typeof item.product === 'object' &&
    typeof item.product.id === 'string' &&
    typeof item.product.name === 'string' &&
    typeof item.product.slug === 'string' &&
    typeof item.product.category === 'string' &&
    typeof item.product.shortDescription === 'string' &&
    typeof item.product.description === 'string' &&
    typeof item.product.price === 'number' &&
    Array.isArray(item.product.tags)
  );
};

const normalizeCartItems = (value: unknown): CartItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const map = new Map<string, CartItem>();

  for (const rawItem of value) {
    if (!isValidCartItem(rawItem)) {
      continue;
    }

    const safeQuantity = Math.max(1, Math.floor(rawItem.quantity));
    const existing = map.get(rawItem.product.id);

    if (existing) {
      map.set(rawItem.product.id, {
        ...existing,
        quantity: existing.quantity + safeQuantity,
      });
    } else {
      map.set(rawItem.product.id, {
        product: rawItem.product,
        quantity: safeQuantity,
      });
    }
  }

  return Array.from(map.values());
};

const readStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return normalizeCartItems(JSON.parse(stored));
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }

      setItems(readStoredCart());
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }

      return [...currentItems, { product, quantity: safeQuantity }];
    });

    trackAddToCart({
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_category2: product.tags[0],
      price: product.price,
      quantity: safeQuantity,
    });
  }, []);

  const removeFromCart = useCallback((productId: Product['id']) => {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: Product['id'], quantity: number) => {
    const safeQuantity = Math.floor(quantity);

    setItems((currentItems) => {
      if (safeQuantity <= 0) {
        return currentItems.filter((item) => item.product.id !== productId);
      }

      return currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: safeQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: Product['id']) => {
      return items.some((item) => item.product.id === productId);
    },
    [items]
  );

  const getItemQuantity = useCallback(
    (productId: Product['id']) => {
      return items.find((item) => item.product.id === productId)?.quantity ?? 0;
    },
    [items]
  );

  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
      itemCount,
      subtotal,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
      itemCount,
      subtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export type { CartItem };
