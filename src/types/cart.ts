export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  weight: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
};
