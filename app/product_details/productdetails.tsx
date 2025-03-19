"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Header from "@/app/header/page";
import Footer from "@/app/footer/page";
import Link from "next/link";

interface Variant {
  id: string;
  title: string;
  price: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  variants: Variant[];
}

// 🛒 Create a Shopify Cart
const createCart = async (variantId: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://${process.env.SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
      {
        query: `
          mutation {
            cartCreate(input: { lines: [{ merchandiseId: "${variantId}" }] }) {
              cart {
                id
              }
            }
          }
        `,
      },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_STORE_FRONT_TOKEN!,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data?.data?.cartCreate?.cart?.id || "";
  } catch (error) {
    console.error("Error creating cart:", error);
    return "";
  }
};

// 🛒 Add Product to Existing Cart
const addToCart = async (cartId: string, variantId: string): Promise<any> => {
  // Ensure environment variables exist
  const storeUrl ='gmw5ga-wc.myshopify.com'
  const accessToken ='dba0c18e53eda696e0427f2ba39bd559' ;
  
  try {
    const response = await axios.post(
      `https://${storeUrl}/api/2024-01/graphql.json`,
      {
        query: `
        mutation {
          cartLinesAdd(
            cartId: "${cartId}"
            lines: [{ merchandiseId: "${variantId}", quantity: 1 }]
          ) {
            cart {
              id
            }
          }
        }
        `,
      },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": accessToken!,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data,'dddd');
    
    return response.data; 
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null; 
  }
};


const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const existingCartId = localStorage.getItem("shopify_cart_id");
    if (existingCartId) {
      setCartId(existingCartId);
    }
  }, []);

  const handleAddToCart = async (variantId: string) => {
    let currentCartId = localStorage.getItem("shopify_cart_id");

    if (!currentCartId) {
      currentCartId = await createCart(variantId);
      if (currentCartId) {
        localStorage.setItem("shopify_cart_id", currentCartId);
        setCartId(currentCartId);
      }
    } else {
      await addToCart(currentCartId, variantId);
    }

    alert("Product added to cart!");
  };

  return (
    <div>
      <Header />
      <main className="p-6 flex flex-col md:flex-row items-start gap-6">
        {product.imageSrc && (
          <Image
            src={product.imageSrc}
            alt={product.title}
            width={700}
            height={700}
            className="object-cover rounded-lg"
          />
        )}
        <div className="product-details">
          <h1 className="text-3xl font-bold">BRAND: {product.title}</h1>
          <p className="text-gray-600 text-2xl">{product.description}</p>
          <h2 className="text-lg font-bold mt-2">Price: {product.price}</h2>

          {product.variants.length > 0 && (
            <ul>
              {product.variants.map((variant) => (
                <li key={variant.id}>
                  <button
                    onClick={() => handleAddToCart(variant.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    ADD TO CART
                  </button>
                  <Link
                    href={`/cart/`}   style={{ textDecoration: "none", margin:"20px"}}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 square-lg hover:bg-blue-600">
                    VIEW CART
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
