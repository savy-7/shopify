export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  width: number;
  height: number;
  altText: string | null;
};

export type ProductVariant = {
  /** Storefront global id, e.g. gid://shopify/ProductVariant/123. */
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  /** Merchant-authored HTML from Shopify admin. */
  descriptionHtml: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: Money;
  };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ProductVariant }[] };
};
