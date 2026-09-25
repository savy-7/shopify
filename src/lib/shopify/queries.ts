const POLICY_FIELDS = `#graphql
  fragment PolicyFields on ShopPolicy {
    title
    url
  }
`;

export const SHOP_QUERY = `#graphql
  ${POLICY_FIELDS}
  query Shop {
    shop {
      name
      privacyPolicy { ...PolicyFields }
      termsOfService { ...PolicyFields }
      shippingPolicy { ...PolicyFields }
      refundPolicy { ...PolicyFields }
    }
  }
`;

export type ShopPolicy = { title: string; url: string };

export type ShopQueryResult = {
  shop: {
    name: string;
    // Null until the merchant fills that policy in under Settings → Policies.
    privacyPolicy: ShopPolicy | null;
    termsOfService: ShopPolicy | null;
    shippingPolicy: ShopPolicy | null;
    refundPolicy: ShopPolicy | null;
  };
};

const PRODUCT_FIELDS = `#graphql
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    featuredImage {
      url
      width
      height
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 8) {
      edges {
        node {
          url
          width
          height
          altText
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  ${PRODUCT_FIELDS}
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FIELDS}
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
`;
