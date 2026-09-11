import Sidebar from "./dishes/features/category-sidebar";
import { Avatar } from "@base-ui/react";
import { Toaster } from "sonner";

export default function Admin({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <Toaster position="top-center" />
    </div>
  );
}
