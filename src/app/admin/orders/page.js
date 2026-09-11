"use client";
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
    <div className="overflow-hidden rounded-md border mt-13">
      <Table className="w-full rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
        <TableHeader > 
          <TableRow >
            <TableHead>Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>

          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
