import type { AppProps } from "next/app";
import CSR from "@components/CSR/CSR";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CSR>
      <Component {...pageProps} />
    </CSR>
  );
}
