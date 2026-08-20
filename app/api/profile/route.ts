import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";

import apiClient from "@/lib/apiClient";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token) {
      const response = await apiClient(`/auth/profile`);
      if (!response) {
        return NextResponse.json({
          error: "Usuário não encontrado",
          statusCode: 404,
        });
      }

      const userData = await apiClient(`/users/${response.sub}`);

      return NextResponse.json({
        data: userData,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      message: "Usuario sem permissões",
      statusCode: 401,
    });
  } catch (error) {
    if (error) {
      return NextResponse.json({
        error: "Erro ao buscar informações do usuário",
        statusCode: 500,
      });
    }
  }
}
