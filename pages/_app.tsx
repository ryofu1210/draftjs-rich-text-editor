import type { AppProps } from "next/app";
import CSR from "@components/CSR/CSR";
import "@/components/RichTextEditor/internal/blockStyle.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CSR>
      <Component {...pageProps} />
    </CSR>
  );
}
