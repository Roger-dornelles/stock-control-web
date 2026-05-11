"use client";

import { signOut } from "next-auth/react";

const dashBoard = () => {
  return (
    <div className={`flex flex-col`}>
      <div className={`w-full flex-col py-5 pl-5`}>
        <h1 className={`text-[1.2rem] font-bold`}>Todos os Produtos</h1>
        <p className={`text-[#666]`}>Listagem de todos os produtos.</p>
      </div>

      <button onClick={() => signOut({ callbackUrl: "/" })}>SAIR</button>
    </div>
  );
};

export default dashBoard;
