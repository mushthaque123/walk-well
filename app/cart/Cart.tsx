"use client";

import { useState, useEffect } from "react";
import { fetchCart, updateCartQuantity, removeCartItem, Cart } from "./fetchCart";
import Image from "next/image";

const CartComponent = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCart = async () => {
      const cartId = localStorage.getItem("shopify_cart_id");
    //  console.log(cartId);
      
      if (!cartId) {
        console.warn("No cart found in localStorage.");
        setLoading(false);
        return;
      }

      const cartData = await fetchCart(cartId);
    //  console.log(cartData);  
      setCart(cartData);
      setLoading(false);
    };

    loadCart();
  }, []);
  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (!cart) return;
    const updatedCart = await updateCartQuantity(cart.id, lineId, newQuantity);
    if (updatedCart) {
      //console.log("hh");
      setCart(await fetchCart(cart.id));
    }
  };
  const handleRemoveItem = async (lineId: string) => {
    if (!cart) return;
    const updatedCart = await removeCartItem(cart.id, lineId);
    if (updatedCart) {
      setCart(await fetchCart(cart.id));
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart) return <p className="text-center text-gray-500">Your cart is empty.</p>;

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Cart</h2>

      <ul className="space-y-6">
        {cart.lines.edges.map(({ node }) => (
          <li key={node.id} className="flex gap-6 items-center p-4 border rounded-lg shadow-sm">
            <Image
              src={node.merchandise.product.featuredImage.url} alt={node.merchandise.product.title}
              width={90} height={90} className="rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="text-lg font-semibold">{node.merchandise.product.title}</p>
              <p className="text-gray-600">
                Price: {node.merchandise.price.amount} {node.merchandise.price.currencyCode}
              </p>
              <div className="flex gap-3 items-center mt-2">
                <button
                  onClick={() => handleUpdateQuantity(node.id, node.quantity - 1)}
                  disabled={node.quantity <= 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-lg">{node.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(node.id, node.quantity + 1)}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(node.id)}
                className="mt-2 text-red-600 hover:text-red-800 text-sm">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t pt-4 text-center">
        <p className="text-xl font-semibold">
          Total: {cart.cost.subtotalAmount.amount} {cart.cost.subtotalAmount.currencyCode}
        </p>

        {cart.checkoutUrl && (
          <a href={cart.checkoutUrl} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none" }} className="mt-4 inline-block w-full bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition" >
            Checkout
          </a>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
