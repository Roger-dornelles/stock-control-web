import React from "react";
import { LuUserRound } from "react-icons/lu";

type MenuItem = {
  id: number;
  label: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

interface AsideProps {
  children: React.ReactNode;
  data: MenuGroup[];
}

const Aside = ({ children, data }: AsideProps) => {
  const [isOpen, setIsOpen] = React.useState({ open: false, groupTitle: "" });

  return (
    <main className="flex">
      <aside
        className={`relative h-screen w-1/6 overflow-y-auto bg-[#050b1a] text-sm text-[#ffffff]`}
      >
        <h2 className="pt-3 pb-3 text-center text-xl">Stock Control</h2>
        {data.map((group) => (
          <div key={group.title} className="px-4">
            <h3
              className={`cursor-pointer rounded-md px-2 py-1 hover:bg-[#1a2030]`}
              onClick={() =>
                setIsOpen({
                  open:
                    group.title === isOpen.groupTitle
                      ? !isOpen.open
                      : !isOpen.open || isOpen.groupTitle !== group.title,

                  groupTitle: group.title,
                })
              }
            >
              {group.title}
            </h3>
            <ul
              className={`${isOpen.open && isOpen.groupTitle === group.title ? "block" : "hidden"} pt-2 pb-2`}
            >
              {group.items.length >= 1 &&
                group.items.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="mr-1 cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[#1a2030]"
                    >
                      {item.label}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
        <div className="absolute bottom-2 flex w-full cursor-pointer items-center rounded-md bg-[#050b1a] p-2 text-sm text-[1rem] text-[#ffffff] hover:bg-[#1a2030] lg:p-2">
          <LuUserRound /> Usuario
        </div>
      </aside>
      <div className={`p-1`}>{children}</div>
    </main>
  );
};

export default Aside;
