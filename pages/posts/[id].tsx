import React from "react";
import { useRouter } from "next/router";
import { getPost } from "@/infra/repositories/prisma/post/getPost";
import { Post } from "@/types/Post";
import Link from "next/link";
import { RichTextEditor } from "@components/RichTextEditor";
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
