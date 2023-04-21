import { RichTextEditor } from "./RichTextEditor";
import { getPost } from "@/infra/repositories/prisma/post/getPost";
import { createPost } from "@/infra/repositories/prisma/post/createPost";
import { useRouter } from "next/router";

export const NewRichTextEditor = () => {
  const router = useRouter();
  const onSaveClick = async (rawContentString: any) => {
    const post = await createPost(rawContentString);
    console.log(post);
    router.push(`/posts/${post.id}`);
  };
  return <RichTextEditor onSaveClick={onSaveClick} />;
};
