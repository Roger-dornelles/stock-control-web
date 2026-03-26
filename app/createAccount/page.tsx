"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import Dropdown from "@/components/Dropdown";

const roleOptions = [
  { value: "admin", label: "Gerente" },
  { value: "user", label: "Funcionario" },
];

const schema = z.object({
  userName: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.string().min(1, "Selecione um cargo."),
});

type FormData = z.infer<typeof schema>;

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!data.userName || !data.email || !data.password || !data.role) {
      toast.warning("Preencha todos os campos...");
    }

    const result = await fetch("/api/createAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (result.ok) {
      toast.success("Conta criada com sucesso!");
      reset();
    } else {
      toast.error(response.error || "Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex min-h-screen w-full items-center justify-center bg-[#050b1a] bg-linear-to-br from-[#050b1a] via-[#0a192f] to-[#112240] p-4">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-16 lg:flex-row">
          <div className="w-full lg:w-112.5">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-blue-400 to-transparent" />

              <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold text-white">Criar Conta</h3>
                <p className="mt-2 text-sm text-blue-300/70">
                  Insira suas credenciais para criar uma conta
                </p>
              </div>

              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-2">
                  <label className="pl-1 text-xs font-semibold tracking-widest text-blue-300 uppercase">
                    Nome
                  </label>
                  <input
                    type="text"
                    {...register("userName")}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-blue-200/20 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Nome completo"
                  />
                  {errors.userName && (
                    <p className="text-xs text-red-400">
                      {errors.userName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="pl-1 text-xs font-semibold tracking-widest text-blue-300 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-blue-200/20 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50"
                    placeholder="email@yahoo.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="pl-1 text-xs font-semibold tracking-widest text-blue-300 uppercase">
                    Senha
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-blue-200/20 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="pl-1 text-xs font-semibold tracking-widest text-blue-300 uppercase">
                    Cargo
                  </label>
                  <Dropdown
                    options={roleOptions}
                    value={watch("role")}
                    onChange={(val) => setValue("role", val)}
                    placeholder="Selecione uma função"
                  />
                  {errors.role && (
                    <p className="text-xs text-red-400">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-95"
                >
                  Criar Conta
                </button>
              </form>

              <div className="flex flex-col justify-center text-center">
                <span className="mt-6 block text-sm text-blue-300">
                  Você já possui uma conta?
                </span>
                <Link href="/" className="m-auto text-white">
                  Fazer login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
