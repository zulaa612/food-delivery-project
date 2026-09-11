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
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader> 
          <TableRow>
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
