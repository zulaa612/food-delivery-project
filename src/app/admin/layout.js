import Sidebar from "./dishes/features/category-sidebar";
import { Avatar } from "@base-ui/react";

export default function Admin({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex bg-gray-100 min-h-screen">
        
        {children}
      </div>
    </div>
  );
}
