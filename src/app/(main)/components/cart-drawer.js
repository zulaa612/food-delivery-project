"use client";

import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  orders = [],
}) {
  const [activeTab, setActiveTab] = useState("cart");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#27272a] h-full p-6 flex flex-col justify-between overflow-y-auto text-white shadow-xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-700">
            <h3 className="text-lg font-bold">Order detail</h3>
            <button onClick={onClose} className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-2 bg-gray-800 p-1 rounded-full my-4">
            <button
              onClick={() => setActiveTab("cart")}
              className={`py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "cart" ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "order" ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Order
            </button>
          </div>

          {/* Cart Tab View */}
          {activeTab === "cart" ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">My cart</h4>
              {cartItems.length === 0 ? (
                <div className="bg-gray-800 rounded-2xl p-8 text-center text-gray-400 mt-6">
                  <p className="font-bold text-lg text-white">Your cart is empty</p>
                  <p className="text-xs mt-1">Add some delicious dishes to your cart!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="bg-white text-gray-900 rounded-2xl p-3 flex gap-3 relative">
                    <button
                      onClick={() => onRemoveItem(item._id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {item.imageUrl && (
                        <Image src={item.imageUrl} alt={item.dishName} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-red-500 leading-tight">{item.dishName}</h5>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.ingredients}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item._id, -1)}
                            className="text-gray-500 hover:text-black cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item._id, 1)}
                            className="text-gray-500 hover:text-black cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Order History Tab View */
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">Order history</h4>
              {orders.map((ord) => (
                <div key={ord._id} className="bg-white text-gray-900 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span>${ord.total.toFixed(2)} (#{ord._id.slice(-5)})</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{ord.date}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{ord.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Summary Footer */}
        {activeTab === "cart" && cartItems.length > 0 && (
          <div className="bg-white text-gray-900 rounded-2xl p-4 mt-6 space-y-2">
            <h5 className="font-bold text-sm">Payment info</h5>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Items</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <hr className="border-dashed my-2" />
            <div className="flex justify-between font-bold text-sm">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-full hover:bg-red-600 transition-colors mt-3 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}