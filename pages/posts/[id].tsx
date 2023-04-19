import React from "react";
import { useRouter } from "next/router";
import { getPost } from "@/infra/repositories/prisma/post/getPost";
import { Post } from "@/types/Post";
import Link from "next/link";
import { RichTextEditor } from "@components/RichTextEditor";
import { EditRichTextEditor } from "@components/EditRickTextEditor";

export default function PostShowPage() {
  return (
    <div>
      <p>PostShow</p>
      <Link href={`/posts`}>Post一覧へ</Link>
      <EditRichTextEditor />
    </div>
  );
}
