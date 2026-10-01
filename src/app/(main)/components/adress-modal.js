"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAddress } from "@/app/provider/addressProvider";

export default function DeliveryAddressModal({ isOpen, onClose, onSubmit }) {
  const [addressInput, setAddressInput] = useState("");
  const { createAddress, loading } = useAddress();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    try {
      await createAddress(addressInput);
      setAddressInput("");
      onClose();
    } catch (error) {
      console.log("Failed to add address:", error);
    }
  };

  return (
    // Backdrop / Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal Box */}
      <div
        className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative flex flex-col gap-4 text-black"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Please write your delivery address!
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <textarea
            value={address}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Please share your complete address"
            rows={3}
            className="w-full p-3.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-white"
          />

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !addressInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {loading ? "Sending..." : "Deliver Here"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
