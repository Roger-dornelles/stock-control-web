"use client";
import { signOut } from "next-auth/react";

const admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <button onClick={() => signOut({ callbackUrl: "/" })}>SAIR</button>
    </>
  );
};

export default admin;
