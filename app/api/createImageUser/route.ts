import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import apiClient from "@/lib/apiClient";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const result = await apiClient(`/upload`, {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      NextResponse.json({
        error: "Ocorreu um erro ao atualizar Imagem do usuario...",
        statusCode: 400,
      });
    }

    return NextResponse.json(
      {
        fileUrl: result.fileUrl,
        statusCode: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Ocorreu um erro, tente mais tarde",
          statusCode: 500,
        },
        {
          status: 500,
        },
      );
    }
  }
}
