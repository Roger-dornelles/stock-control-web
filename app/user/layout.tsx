import DashboardClient from "./DashboardClient";

import Home from "@/app/user/home/page";
import Profile from "@/components/Profile";

export type MenuItemId =
  | "inicio"
  | "estoque"
  | "perfil"
  | "adicionar"
  | "editar"
  | "excluir"
  | "exibir";

export type userMenuData = {
  title: string;
  items: { id: MenuItemId; label: string }[];
}[];

const data: userMenuData = [
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

const pageActive: MenuItemId = "exibir";
const Layout = () => (
  <DashboardClient
    components={CONTENT_MAP_COMPONENTS}
    data={data}
    pageActive={pageActive}
  />
);

export default Layout;
