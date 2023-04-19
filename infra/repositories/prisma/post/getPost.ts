export async function getPost(id: number) {
  const response = await fetch(`/api/posts/${id}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
}
