import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import apiClient from "@/lib/apiClient";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.id) {
      const result = await apiClient(`/users/${Number(body.id)}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });

      if (!result) {
        return NextResponse.json(
          {
            error: "Ocorreu um erro",
            statusCode: 400,
          },
          {
            status: 400,
          },
        );
      }

      return NextResponse.json(
        {
          message: "Perfil atualizado com sucesso",
          statusCode: 200,
          data: result,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Erro ao atualizar informações do usuário",
          statusCode: 500,
        },
        { status: 500 },
      );
    }
  }
}
