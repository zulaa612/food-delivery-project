import Sidebar from "./dishes/features/category-sidebar";
import { Avatar } from "@base-ui/react";
import { Toaster } from "sonner";
import Dishes from "./dishes/page";
import Orders from "./orders/page";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("foodMenu");
  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 w-full min-w-0 p-8">
        {activeTab === "foodMenu" && <Dishes />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "settings" && <div>Settings page</div>}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
