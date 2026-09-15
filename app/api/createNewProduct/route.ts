import { NextResponse } from "next/server";

import apiClient from "@/lib/apiClient";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await apiClient("/products/new", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return NextResponse.json(
      {
        message: result.message || "Produto criado com sucesso.",
        statusCode: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      {
        message: "Ocorreu um erro tente novamente mais tarde.",
        statusCode: 500,
      },
      { status: 500 },
    );
  }
}
