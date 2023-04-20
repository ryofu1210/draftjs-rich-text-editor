import React from "react";
import { getPosts } from "@/infra/repositories/prisma/post/getPosts";
import { Post } from "@/types/Post";
import Link from "next/link";
import { Layout } from "@components/Layout";

export default function PostIndexPage() {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <h1>PostIndex</h1>
      <Link href={`/posts/new`}>新規Post作成</Link>
      <table>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>
              <Link href={`/posts/${post.id}`}>{post.id}</Link>
            </td>
            <td>{post.content}</td>
          </tr>
        ))}
      </table>
    </Layout>
  );
}
