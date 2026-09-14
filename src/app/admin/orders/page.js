"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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

export default function Orders() {
  return (
    <div className="w-full bg-slate-50 min-h-screen p-8">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
        {/*Header Section*/}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Orders</span>
            <span className="text-xs text-gray-500">... items</span>
          </div>

          <div className="flex items-center gap-3">
            <Button className="rounded-full text-sm text-gray-500 gap-2 border-gray-400">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              13 June 2023 - 14 July 2023
            </Button>
            <Button className="rounded-full text-sm bg-black text-white hover:bg-gray-300 hover:text-black cursor-pointer">
              Change delivery state
            </Button>
          </div>
        </div>

        {/*Order Table Section*/}
        <div className="rounded-lg border border-gray-100 ">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-100">
                <TableHead className="w-12 text-center">
                  <Checkbox className="rounded" />
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
              <TableRow className="border-b border-gray-50 text-xs text-gray-600">
                <TableCell className="text-center">
                  <Checkbox className="rounded border-gray-300" />
                </TableCell>
                <TableCell className="font-medium text-gray-900">...</TableCell>
                <TableCell>...</TableCell>

                {/*Food Pop Section */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                      <span>... foods</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-64 p-2 shadow-lg rounded-xl border-gray-100"
                      align="start"
                    >
                      <div className="space-y-2">
                        <div
                        
                          className="flex items-center justify-between text-xs p-1"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md bg-amber-100 overflow-hidden shrink-0"></div>
                            <span className="font-medium text-gray-800">
                              food name ...
                            </span>
                          </div>
                          <span className="text-gray-400">
                            x food count ...
                          </span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>

                <TableCell>order date ...</TableCell>
                <TableCell className="font-medium text-gray-900">
                  ....
                </TableCell>
                <TableCell className="max-w-62.5 truncate text-gray-500">
                  ...
                </TableCell>

                {/*Delivery State Status Section */}
                <TableCell className="text-right pr-4">
                  <Select>
                    <SelectTrigger className="`w-27.5 h-7 text-[11px] font-medium rounded-full ml-auto border">
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
