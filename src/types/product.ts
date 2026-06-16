export type StockStatus = "available" | "low_stock" | "sold_out";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: string;
  weight: string;
  stockStatus: StockStatus;
  isBestSeller?: boolean;
  isPromo?: boolean;
  storage?: string;
  cooking?: string;
  highlights?: string[];
};
