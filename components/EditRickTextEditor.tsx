import React, { useState, useEffect } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { updatePost } from "@/infra/repositories/prisma/post/updatePost";
import { getPost } from "@/infra/repositories/prisma/post/getPost";
import { useRouter } from "next/router";
import { Post } from "@/types/Post";

export const EditRichTextEditor = () => {
  const router = useRouter();
  const postId = Number(router.query.id);

  const [post, setPost] = useState<Post>();
  const onSaveClick = async (rawContentString: any) => {
    const post = await updatePost(postId, rawContentString);
    console.log(post);
  };

  React.useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const post: Post = await getPost(postId);
        setPost(post);
      };
      fetchPost();
    }
  }, [postId]);

  return post ? (
    <RichTextEditor onSaveClick={onSaveClick} rawContentString={post.content} />
  ) : (
    <p>...is loading</p>
  );
};
