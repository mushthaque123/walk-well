"use client";

import Footer from "../footer/page";
import Header from "../header/page";
import Cart from "./Cart";

const CartPage = () => {
    return (
        <div>
            <Header />
            <main className="max-w-6xl mx-auto p-6 bg-gray-100">
                <Cart />
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;
