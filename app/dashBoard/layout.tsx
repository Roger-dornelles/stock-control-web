import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <aside>
        layout admin
        <ul>
          <li>admin 1</li>
          <li>admin 2</li>
        </ul>
      </aside>
      <>{children}</>
    </main>
  );
};

export default layout;
