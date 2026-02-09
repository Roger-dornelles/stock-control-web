import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiFetch } from "@/server/api";

interface SignInResponse {
  token?: string;
  error?: string | object;
  message?: string;
  statusCode?: number;
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e/ou senha são obrigatórios" },
        { status: 400 },
      );
    }

    const response: SignInResponse = await apiFetch("/auth/login", "POST", {
      body: { email, password },
    });

    if (response.error) {
      return NextResponse.json(
        {
          error:
            response.message ||
            response.error.erros[0].erros.map((i: string) => i).join(", "),
        },
        { status: response.statusCode },
      );
    }
    const { accessToken } = response as { accessToken: string };

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: Error | unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao processar a solicitação",
      },
      { status: 401 },
    );
  }
}
