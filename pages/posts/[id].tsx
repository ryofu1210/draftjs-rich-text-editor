import React from "react";
import { useRouter } from "next/router";
import { getPost } from "@/infra/repositories/post/getPost";
import { Post } from "@/types/Post";
import Link from "next/link";

export default function PostShowPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [post, setPost] = React.useState<Post>();

  React.useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const post: Post = await getPost(Number(id));
        console.log(post);
        setPost(post);
      };
      fetchPost();
    }
  }, [id]);

  // idを取得
  return (
    <div>
      <p>PostShow</p>
      <p>{id}</p>
      <p>{post?.content}</p>
    </div>
  );
}
