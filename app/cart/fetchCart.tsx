import axios from "axios";

const SHOPIFY_STORE_URL = 'gmw5ga-wc.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'dba0c18e53eda696e0427f2ba39bd559';

export interface Cart {
  id: string;
  totalQuantity: number;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          product: {
            title: string;
            featuredImage: {
              url: string;
            };
          };
        };
      };
    }[];
  };
}

export const fetchCart = async (cartId: string): Promise<Cart | null> => {
  try {
    const response = await axios.post(
      `https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
      {
        query: `
          query GetCart($cartId: ID!) {
            cart(id: $cartId) {
              id
              checkoutUrl
              totalQuantity
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                        product {
                          title
                          featuredImage {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { cartId },
      },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN!,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data.cart as Cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};

// ✅ Update quantity in the cart
export const updateCartQuantity = async (cartId: string, lineId: string, quantity: number) => {
  try {
    const response = await axios.post(
      `https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
      {
        query: `
          mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                id
                totalQuantity
              }
            }
          }
        `,
        variables: {
          cartId,
          lines: [{ id: lineId, quantity }],
        },
      },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN!,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};

// ✅ Remove item from the cart
export const removeCartItem = async (cartId: string, lineId: string) => {
  try {
    const response = await axios.post(
      `https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
      {
        query: `
          mutation RemoveCartItem($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart {
                id
                totalQuantity
              }
            }
          }
        `,
        variables: { cartId, lineIds: [lineId] },
      },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN!,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data.cartLinesRemove.cart;
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};
