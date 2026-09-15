"use client";

import React, { useState } from "react";

import Home from "@/app/user/home/page";
import Aside from "@/components/Aside";
import CreateProduct from "@/components/CreateProduct";
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
      { id: "adicionar" as const, label: "Adicionar Produto" },
      { id: "editar" as const, label: "Editar Produto" },
      { id: "excluir" as const, label: "Excluir Produto" },
      { id: "exibir" as const, label: "Exibir Produtos" },
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
  adicionar: <CreateProduct />,
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
