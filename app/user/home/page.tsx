"use client";

import { useQuery } from "@tanstack/react-query";

import Table from "@/components/Table";

export type ProductType = {
  id: number;
  productName: string;
  categoryProduct: string;
  quantityProduct: number;
  priceProduct: number;
};

const dashBoard = () => {
  const {
    data: ProductAll = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productsAll"],
    queryFn: async () => {
      const res = await fetch("/api/productAll", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return res.json();
    },
  });

  return (
    <div className={`flex flex-col p-6`}>
      <div className={`flex-col`}>
        <h1 className={`text-[1.2rem] font-bold text-[#3d3d3d]`}>
          Todos os Produtos
        </h1>
        <p className={`text-[#666]`}>Listagem de todos os produtos.</p>
      </div>

      <div className="">
        {isLoading ? (
          <p>Carregando produtos...</p>
        ) : isError ? (
          <p>Erro ao carregar produtos. Por favor, tente novamente.</p>
        ) : (
          <Table data={ProductAll} pageSize={10} />
        )}
      </div>
    </div>
  );
};

export default dashBoard;
