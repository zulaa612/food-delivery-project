"use client";

export default function OrderSuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center flex flex-col items-center shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Your order has been successfully placed !
        </h3>

        <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-red-200">
          <span className="text-4xl">🛵</span>
        </div>

        <button
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-8 py-2.5 rounded-full text-sm transition-colors cursor-pointer"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}