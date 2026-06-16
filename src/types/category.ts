export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
};

export type CategoryFilter = "all" | "best_seller" | "promo" | string;
