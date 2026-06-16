import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/product/product-detail";
import { findProductBySlug, products } from "@/data/products";
import { storeProfile } from "@/data/store";

type ProductPageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageParams): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) {
    return {
      title: "Produk tidak ditemukan",
    };
  }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — ${storeProfile.name}`,
      description: product.description.slice(0, 160),
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageParams) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
