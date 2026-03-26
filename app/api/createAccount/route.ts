import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiFetch } from "@/server/api";

interface CreateAccountRequest {
  userName: string;
  email: string;
  password: string;
  role: string;
}

interface CreateAccountResponse {
  token?: string;
  error?: string | object;
  message?: string;
  statusCode?: number;
  user?: CreateAccountRequest;
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const { userName, email, password, role } = await req.json();

    if (!email || !password || !userName || !role) {
      return NextResponse.json(
        { error: "Email, Senha, Nome e/ou Cargo são obrigatórios" },
        { status: 400 },
      );
    }

    const response: CreateAccountResponse = await apiFetch("/users", "POST", {
      body: { username: userName, email, password, role },
    });

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
