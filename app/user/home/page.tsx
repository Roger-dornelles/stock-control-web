"use client";

import { signOut } from "next-auth/react";

const dashBoard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <button onClick={() => signOut({ callbackUrl: "/" })}>SAIR</button>
    </>
  );
};

export default dashBoard;
