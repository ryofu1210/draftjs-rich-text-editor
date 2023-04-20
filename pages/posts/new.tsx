import React from "react";
import { RichTextEditor } from "@components/RichTextEditor";
import { NewRichTextEditor } from "@components/NewRickTextEditor";
import { Layout } from "@components/Layout";

export default function NewPostPage() {
  return (
    <Layout>
      <>
        <p>New Post Page</p>
        <NewRichTextEditor />
      </>
    </Layout>
  );
}
