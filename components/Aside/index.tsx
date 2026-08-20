"use client";

import { signOut } from "next-auth/react";
import React from "react";

import type { MenuItemId } from "@/app/user/DashboardClient";

type MenuItem = {
  id: MenuItemId;
  label: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

interface AsideProps {
  children: React.ReactNode;
  data: MenuGroup[];
  active: MenuItemId;
  onSelect: (id: MenuItemId) => void;
}

const Aside = ({ children, data, active, onSelect }: AsideProps) => {
  return (
    <main className="flex h-screen">
      <aside className="flex h-screen w-56 flex-col gap-6 border-r border-white/10 bg-[#050b1a] p-6">
        <h2 className="text-lg font-bold text-blue-400">Stock Control</h2>

        <nav className="flex flex-col gap-6">
          {data.map((group) => (
            <div key={group.title}>
              <span className="mb-2 block text-xs font-semibold tracking-widest text-blue-300/50 uppercase">
                {group.title}
              </span>

              <ul className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onSelect(item.id)}
                        className={`flex w-full items-center gap-2 rounded-md p-2 text-sm transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-blue-100 hover:bg-[#1a2030]"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div>
            <button
              onClick={() => {
                signOut({
                  callbackUrl: "/",
                });
              }}
              className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-blue-100 transition-colors hover:bg-[#1a2030]"
            >
              Sair
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 overflow-auto text-white">{children}</div>
    </main>
  );
};

export default Aside;
