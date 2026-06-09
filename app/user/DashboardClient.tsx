// app/dashboard/_components/DashboardClient.tsx
"use client";

import React, { useState } from "react";

import Home from "@/app/user/home/page";
import Aside from "@/components/Aside";
import Profile from "@/components/Profile";

export type MenuItemId =
  | "inicio"
  | "estoque"
  | "perfil"
  | "adicionar"
  | "editar"
  | "excluir"
  | "exibir";

const data: { title: string; items: { id: MenuItemId; label: string }[] }[] = [
  {
    title: "Produto",
    items: [
      { id: "adicionar", label: "Adicionar Produto" },
      { id: "editar", label: "Editar Produto" },
      { id: "excluir", label: "Excluir Produto" },
      { id: "exibir", label: "Exibir Produtos" },
    ],
  },
  {
    title: "Perfil",
    items: [{ id: "perfil", label: "Perfil" }],
  },
];

const CONTENT_MAP_COMPONENTS: Record<MenuItemId, React.ReactNode> = {
  inicio: <Home />,
  estoque: null,
  perfil: <Profile />,
  adicionar: "AdicionarProduto",
  editar: "EditarProduto",
  excluir: "ExcluirProduto",
  exibir: <Home />,
};

const DashboardClient = () => {
  const [active, setActive] = useState<MenuItemId>("exibir");

  return (
    <Aside data={data} active={active} onSelect={setActive}>
      {CONTENT_MAP_COMPONENTS[active]}
    </Aside>
  );
};

export default DashboardClient;
