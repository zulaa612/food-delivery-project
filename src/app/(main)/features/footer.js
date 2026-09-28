"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/app/provider/categoryProvider";

export default function Footer() {
  const { categories } = useCategory();

  return (
    <footer className="bg-black text-white w-full pt-0 pb-12 flex flex-col items-center">
      {/* Banner */}
      <div className="bg-red-500 w-full py-6 flex items-center overflow-hidden whitespace-nowrap mb-12">
        <div className="inline-flex gap-8 font-bold text-3xl whitespace-nowrap pl-12">
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Logo & Tagline */}
          <div className="md:col-span-3 flex flex-col items-start gap-2">
            <div className="flex items-center gap-3">
              <Image src="/pic/Logo.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold text-white">
                Nom<span className="text-red-500">Nom</span>
              </span>
            </div>
            <span className="text-xs text-gray-400">Swift delivery</span>
          </div>

          {/* NOMNOM Section */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              NOMNOM
            </span>
            <ul className="space-y-3 text-sm text-white">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-500 transition-colors"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-zone"
                  className="hover:text-red-500 transition-colors"
                >
                  Delivery zone
                </Link>
              </li>
            </ul>
          </div>

          {/* MENU Section - 2 Column Grid */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              MENU
            </span>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/category/${category._id || category.id}`}
                      className="hover:text-red-500 transition-colors"
                    >
                      {category.categoryName}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Appetizers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Side dish
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Salads
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Brunch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Pizzas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Desserts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Main dishes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Beverages
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Desserts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="hover:text-red-500 transition-colors"
                    >
                      Fish & Sea foods
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* FOLLOW US Section */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              FOLLOW US
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/pic/Facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/pic/Instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-800 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>Copy right 2026 © Nomnom LLC</span>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Terms and conditoin
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-white transition-colors"
            >
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
