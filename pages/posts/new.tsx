import React from "react";
import { RichTextEditor } from "@components/RichTextEditor";
import { NewRichTextEditor } from "@components/NewRickTextEditor";
import { Layout } from "@components/Layout";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <Layout>
      <>
        <h1>Post新規作成ページ</h1>
        <div style={{ marginBottom: "20px" }}>
          <Link href={`/`}>Post一覧ページへ</Link>
        </div>
        <NewRichTextEditor />
      </>
    </Layout>
  );
}
