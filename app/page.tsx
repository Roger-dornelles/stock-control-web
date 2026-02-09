"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.error) {
      toast.error(
        result.error ||
          result.error.erros[0].erros.map((i: string) => i).join(", "),
      );
    }
    setLoading(false);
    if (!result.error) {
      toast.success(result.message);
      setTimeout(() => {
        // router.push("");
      }, 1500);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex min-h-screen w-full items-center justify-center bg-[#050b1a] bg-gradient-to-br from-[#050b1a] via-[#0a192f] to-[#112240] p-4 lg:p-12">
        <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-16 lg:flex-row">
          <div className="w-full pr-0 lg:w-[50%] lg:pr-12">
            <div className="relative inline-block">
              <h2 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent lg:text-6xl">
                Stock Control
              </h2>
              <div className="mt-3 h-1.5 w-24 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>

            <div className="space-y-8 pt-10">
              <div className="border-l-4 border-blue-500/40 pl-6">
                <p className="text-2xl leading-relaxed font-light text-blue-50">
                  Stock Control é uma solução{" "}
                  <span className="font-semibold text-blue-400">
                    inteligente e centralizada
                  </span>{" "}
                  projetada para otimizar o controle do estoque.
                </p>
              </div>

              <p className="max-w-xl text-lg leading-relaxed font-normal text-blue-100/70">
                Ele combina{" "}
                <span className="font-medium text-white">
                  simplicidade operacional
                </span>{" "}
                com ferramentas para análise da movimentação de itens, evitando
                a falta de insumos essenciais e impedindo o desperdício de
                capital com o excesso de estoque armazenado.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[450px]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

              <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold text-white">Login</h3>
                <p className="mt-2 text-sm text-blue-300/70">
                  Insira suas credenciais para acessar o painel
                </p>
              </div>

              <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="pl-1 text-xs font-semibold tracking-widest text-blue-300 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition-all outline-none placeholder:text-blue-200/20 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50"
                    placeholder="email@yahoo.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <label className="pl-1 text-xs font-semibold tracking-widest text-blue-300 uppercase">
                      Senha
                    </label>

                    <button
                      type="button"
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Esqueceu?
                    </button>
                  </div>
                  <input
                    type="password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition-all outline-none placeholder:text-blue-200/20 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50"
                    placeholder="••••••••"
                    autoComplete="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className={`${loading ? "cursor-not-allowed bg-blue-500" : "cursor-pointer bg-blue-600 hover:bg-blue-500"} mt-4 flex w-full items-center justify-center rounded-2xl py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95`}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading && (
                    <div className="mt-1 mr-1 h-4 w-4 animate-spin rounded-full border-3 border-white border-t-transparent" />
                  )}{" "}
                  Acessar Painel
                </button>
              </form>

              <div className="flex flex-col justify-center text-center">
                <span className="mt-6 block text-sm text-blue-300">
                  Não possui uma conta?
                </span>

                <Link href="/createAccount" className="m-auto text-white">
                  Criar conta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
