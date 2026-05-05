"use client";

import React from "react";

import Aside from "@/components/Aside";

const data = [
  {
    title: "Produtos",
    items: [
      { id: 1, label: "Criar Produto" },
      { id: 2, label: "Editar Produto" },
      { id: 3, label: "Excluir Produto" },
      { id: 4, label: "Exibir Produtos" },
    ],
  },
];

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Aside data={data}>{children}</Aside>
    </>
  );
};

export default layout;
