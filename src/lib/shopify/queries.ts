export const SHOP_QUERY = `#graphql
  query Shop {
    shop {
      name
    }
  }
`;

export type ShopQueryResult = {
  shop: {
    name: string;
  };
};
