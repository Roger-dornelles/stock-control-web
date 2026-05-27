import { NextResponse } from "next/server";

import apiClient from "@/lib/apiClient";

interface CreateAccountRequest {
  productName: string;
  descriptionProduct: string;
  quantityProduct: string;
  categoryProduct: string;
  priceProduct: string;
}

interface GetProductsAll {
  error?: string | object;
  message?: string;
  statusCode?: number;
  product?: CreateAccountRequest;
}

export async function GET() {
  try {
    const response: GetProductsAll = await apiClient("/products");

    if (response.error) {
      return NextResponse.json(
        {
          error:
            typeof response.error === "object" && response.error !== null
              ? (response.error as any).message ||
                (response.error as any).erros[0].erros
                  .map((i: string) => i)
                  .join(", ")
              : response.error,
        },
        { status: response.statusCode },
      );
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: Error | unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao listar os produtos. Por favor, tente novamente mais tarde.",
      },
      { status: 401 },
    );
  }
}
