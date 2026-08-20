"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import type { ProductType } from "@/app/user/home/page";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "productName",
    header: "Produto",
  },
  {
    accessorKey: "categoryProduct",
    header: "Categoria",
    cell: ({ row }) => row.original.categoryProduct,
  },
  {
    accessorKey: "quantityProduct",
    header: "Quantidade",
    cell: ({ row }) => row.original.quantityProduct,
  },
  {
    accessorKey: "priceProduct",
    header: "Preço",
    cell: ({ getValue }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(getValue() as number),
  },
];

interface TableProps {
  data: ProductType[];
  pageSize?: number; // itens por página
}

const Table = ({ data, pageSize = 10 }: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  });

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-2 flex items-center justify-end gap-2">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="rounded-md border border-white/10 bg-[#0a192f] px-2 py-1 text-white outline-none"
        >
          {[2, 5, 10, 15].map((size) => (
            <option key={size} value={size}>
              {size} por página
            </option>
          ))}
        </select>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
        <table className="h-full w-full text-sm text-white">
          <thead className="bg-[#0a192f] text-xs tracking-widest text-blue-300 uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-2 py-3 text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-white/5 hover:bg-[#f3f3f3]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 text-black">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center py-3 text-sm text-blue-300">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={`mr-2 cursor-pointer rounded-md border border-gray-200 p-1 hover:border-gray-500 disabled:opacity-99`}
        >
          <LuChevronLeft size={18} />
        </button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={`ml-2 cursor-pointer rounded-md border border-gray-200 p-1 hover:border-gray-500 disabled:opacity-99`}
        >
          <LuChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Table;
