"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { server } from "@/app/_api/api";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await server.get("/food-order/get");
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Orders татахад алдаа гарлаа:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrder();
  }, []);

  const handleUpdateOrder = async () => {
    try {
      await server.put("/food-order/put", {
        ids: selectedOrders,
        status: "Delivered",
      });
      setSelectedOrders([]);
      await fetchOrder();
    } catch (err) {
      console.error("error", err);
    }
  };

  const allSelected =
    orders.length > 0 && selectedOrders.length === orders.length;

  const toggleAll = (checked) => {
    setSelectedOrders(checked ? orders.map((o) => o._id) : []);
  };

  const toggleOne = (id, checked) => {
    setSelectedOrders((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
  };

  const changeStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        Уншиж байна...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-8">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Orders</span>
            <span className="text-xs text-gray-500">
              {Array.isArray(orders) ? orders.length : 0} items
            </span>
          </div>

          <div className="flex gap-3">
            <Popover>
              <PopoverTrigger
                id="date"
                className="cursor-pointer w-72 h-9 rounded-full border border-solid border-gray-300 bg-white flex items-center justify-start px-4 font-normal text-black hover:bg-gray-50 transition-colors"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span className="text-gray-500">Pick a date</span>
                )}
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleUpdateOrder}
              disabled={selectedOrders.length === 0}
              className="w-44 h-9 rounded-full bg-black flex justify-center items-center font-medium text-[14px] text-white cursor-pointer hover:bg-white hover:border-gray-400 hover:text-black transition-colors"
            >
              Change delivery state
            </Button>
          </div>
        </div>

        {/* Order Table Section */}
        <div className="rounded-lg border border-gray-100">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-100">
                <TableHead className="w-12 text-center">
                  <Checkbox
                    className="rounded"
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="w-12 text-xs font-semibold text-gray-500">
                  №
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">
                  Customer
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">
                  Food
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Date <ChevronsUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">
                  Total
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">
                  Delivery Address
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 text-right pr-6">
                  <div className="flex items-center justify-end gap-1 cursor-pointer">
                    Delivery state <ChevronsUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!Array.isArray(orders) || orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-xs text-gray-500 py-8"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className="border-gray-50 text-xs text-gray-600 border-b"
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        className="rounded border-gray-300"
                        checked={selectedOrders.includes(order._id)}
                        onCheckedChange={(checked) =>
                          toggleOne(order._id, Boolean(checked))
                        }
                      />
                    </TableCell>
                    <TableCell className="text-black">{index + 1}</TableCell>
                    <TableCell>{order.customer?.email ?? "-"}</TableCell>

                    {/* Food Popover Section */}
                    <TableCell>
                      <Popover>
                        <PopoverTrigger className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                          <span>{order.dishes?.length ?? 0} foods</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-64 p-2 shadow-lg rounded-xl border-gray-100"
                          align="start"
                        >
                          <div className="space-y-2">
                            {order.dishes?.map((item, idx) => (
                              <div
                                key={item._id || idx}
                                className="flex items-center justify-between text-xs p-1"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-md bg-amber-100 shrink-0" />
                                  <span className="font-medium text-gray-800">
                                    {item.dishes?.name || item.name || "Food"}
                                  </span>
                                </div>
                                <span className="text-gray-400">
                                  x {item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>

                    <TableCell>
                      {order.createdAt
                        ? format(new Date(order.createdAt), "LLL dd y")
                        : "-"}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {order.totalPrice}
                    </TableCell>
                    <TableCell className="max-w-62.5 truncate text-gray-500">
                      {order.address}
                    </TableCell>

                    {/* Delivery State Status Section */}
                    <TableCell className="text-right pr-4">
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          changeStatus(order._id, value)
                        }
                      >
                        <SelectTrigger className="w-28 h-7 text-[11px] font-medium rounded-full ml-auto border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
