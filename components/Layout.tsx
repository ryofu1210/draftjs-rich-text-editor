import React from "react";

type Props = {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "40px 0 0" }}
    >
      {children}
    </div>
  );
};
