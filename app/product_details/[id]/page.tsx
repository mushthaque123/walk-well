// 📌 Server Component for fetching product data from Shopify
import ProductDetails from "../productdetails";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  variants: Variant[];
}

interface Variant {
  id: string;
  title: string;
  price: string;
}

// 🛒 Fetch product data from Shopify
const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_STORE_FRONT_TOKEN!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              product(id: "gid://shopify/Product/${id}") {
                id
                title
                description
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      }
    );

    const json = await response.json();
    const data = json.data?.product;

    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      description: data.description || "No description available",
      price: `${data.priceRange?.maxVariantPrice?.amount} ${data.priceRange?.maxVariantPrice?.currencyCode}`,
      imageSrc: data.images?.edges[0]?.node?.url || "/placeholder.jpg",
      variants: data.variants.edges.map((variant: any) => ({
        id: variant.node.id,
        title: variant.node.title,
        price: `${variant.node.priceV2.amount} ${variant.node.priceV2.currencyCode}`,
      })),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
    if (!params?.id) {
      return <p className="text-center text-red-500">Invalid product ID.</p>;
    }
  
    try {
      console.log("Fetching product for ID:", params.id);
  
      const product = await fetchProduct(params.id);
  
      if (!product) {
        return <p className="text-center text-red-500">Product not found.</p>;
      }
  
      return <ProductDetails product={product} />;
    } catch (error) {
      console.error("Error fetching product:", error);
      return <p className="text-center text-red-500">Failed to load product.</p>;
    }
  };
  
  export default ProductPage;
  
