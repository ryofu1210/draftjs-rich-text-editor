import React from "react";
import { getPosts } from "@/infra/repositories/post/getPosts";
import { Post } from "@/types/Post";
import Link from "next/link";

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
    <div>
      <h1>PostIndex</h1>
      <table>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>
              <Link href={`/posts/${post.id}`} >{post.id}</Link>
            </td>
            <td>{post.content}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}