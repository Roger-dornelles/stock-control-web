import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Tooltip from "@/components/Tooltip";

const createProduct = () => {
  const route = useRouter();
  const [product, setProduct] = useState<{
    productName: string;
    descriptionProduct: string;
    categoryProduct: string;
    priceProduct: number;
  }>({
    productName: "",
    descriptionProduct: "",
    categoryProduct: "",
    priceProduct: 0,
  });

  const handleCreateProduct =
    (field: keyof typeof product) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProduct((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (
        product.productName &&
        product.descriptionProduct &&
        product.categoryProduct &&
        product.priceProduct
      ) {
        product.priceProduct = Number(product.priceProduct);
        const result = await fetch("/api/createNewProduct", {
          method: "POST",
          body: JSON.stringify(product),
        });

        const data = await result.json();

        return data;
      }

      toast.warning("Preencha todos os campos!");
    } catch (error) {
      console.log("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto.");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-1/2 flex-col rounded-md bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold text-[#333]">
          Adicionar novo produto
        </h2>
        <p className="text-gray-600">
          Preencha os dados a baixo para adicionar um novo produto.
        </p>

        <div>
          <form
            className="mt-4 flex w-full flex-col gap-4 text-[#333]"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2">
              Nome do produto:
              <Input
                type="text"
                value={product.productName}
                onChange={handleCreateProduct("productName")}
                className="rounded-md border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-gray-200 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2">
              Descrição do produto:
              <Input
                type="text"
                value={product.descriptionProduct}
                onChange={handleCreateProduct("descriptionProduct")}
                className="rounded-md border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-gray-200 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2">
              Categoria do produto:
              <Input
                type="text"
                value={product.categoryProduct}
                onChange={handleCreateProduct("categoryProduct")}
                className="rounded-md border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-gray-200 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2">
              <p className="flex items-center gap-1">
                Valor unitario do produto:{" "}
                <Tooltip description="O valor unitário é o preço de venda de cada unidade do produto." />
              </p>
              <Input
                type="number"
                value={Number(product.priceProduct).toFixed(2)}
                onChange={handleCreateProduct("priceProduct")}
                className="rounded-md border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-gray-200 focus:outline-none"
              />
            </label>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="reset"
                className="cursor-pointer rounded-sm bg-gray-500 p-2 text-white hover:bg-gray-600"
                onClick={() => route.push("/user/home")}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="cursor-pointer rounded-sm bg-blue-500 p-2 text-white hover:bg-blue-600"
              >
                Adicionar Produto
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default createProduct;
