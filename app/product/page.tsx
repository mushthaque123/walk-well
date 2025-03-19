import axios from 'axios';
import Head from "next/head";
import Header from "../header/page";
import Footer from "../footer/page";
import Link from "next/link";
import Image from 'next/image';
// Define types for product data
interface Product {
  id: string;
  title: string;
  maxPrice: string;
  imageSrc: string;
}

// Fetch products from Shopify GraphQL API
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.post(
      `https://${process.env.SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
      {
        query: `
          {
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  description
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
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
            }
          }
        `,
      },
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_STORE_FRONT_TOKEN!,
          'Content-Type': 'application/json',
        },
      }
    );
    //console.log(response.data.data.products.edges,'ddddd');

    return response.data.data.products.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      maxPrice: `${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`,
      imageSrc: node.images.edges[0]?.node.url || "",
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <div>
      <Head>
        <title>Walk Well</title>
      </Head>
      <Header />
      <main>
        <div className='image_product'>
          <Image src="/footware.jpg" alt="Slide 1" width={1500} height={700}
            className="w-full h-auto max-h-[600px] object-cover" />
          <h1 className="text-4xl font-bold text-center text-gray-800 my-6 uppercase tracking-wide collection_header">
            NEW COLLECTIONS
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                  {product.imageSrc && (
                    <img
                      src={product.imageSrc}
                      alt={product.title}
                      className="w-full h-80 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                  <p className="text-lg font-bold mt-2">
                    Price : {product.maxPrice}
                  </p>
                  <Link
                    href={`/product_details/${product.id.split('/').pop()}`}   style={{ textDecoration: "none" }}
                    className="block text-center mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                  
                  <ul>
                  </ul>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
