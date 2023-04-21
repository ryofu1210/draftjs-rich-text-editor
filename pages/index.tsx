import React from "react";
import { getPosts } from "@/infra/repositories/prisma/post/getPosts";
import Link from "next/link";
import { Layout } from "@components/Layout";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    renderCell: (params: GridRenderCellParams<any, any>) => (
      <Link href={`/posts/${params.id}`}>{params.id}</Link>
    ),
  },
  { field: "content", headerName: "Content", width: 1000 },
];

export default function Home() {
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setRows(
        posts.map((post: any) => ({
          id: post.id,
          content: post.content,
        }))
      );
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <h1>Post一覧ページ</h1>
      <div style={{ marginBottom: "20px" }}>
        <Link href={`/posts/new`}>Post新規作成</Link>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Layout>
  );
}
