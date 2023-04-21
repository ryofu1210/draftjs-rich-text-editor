import React from "react";
import Link from "next/link";
import { EditRichTextEditor } from "@components/EditRickTextEditor";
import { Layout } from "@components/Layout";

export default function PostShowPage() {
  return (
    <Layout>
      <h1>Post詳細ページ</h1>
      <div style={{ marginBottom: "20px" }}>
        <Link href={`/`}>Post一覧ページへ</Link>
      </div>
      <EditRichTextEditor />
    </Layout>
  );
}
