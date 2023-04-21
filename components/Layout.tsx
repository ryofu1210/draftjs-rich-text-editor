import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return <div style={{ width: "1000px", margin: "0 auto" }}>{children}</div>;
};
