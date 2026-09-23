"use client";

import React, { useState } from "react";

import type { MenuItemId, userMenuData } from "./layout";

import Aside from "@/components/Aside";

const DashboardClient = ({
  data,
  components,
  pageActive,
}: {
  pageActive: MenuItemId;
  data: userMenuData;
  components: Record<MenuItemId, React.ReactNode>;
}) => {
  const [currentActive, setCurrentActive] = useState<MenuItemId>(pageActive);

  return (
    <Aside data={data} active={currentActive} onSelect={setCurrentActive}>
      {components[currentActive]}
    </Aside>
  );
};

export default DashboardClient;
