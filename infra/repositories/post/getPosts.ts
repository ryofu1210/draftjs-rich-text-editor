export async function getPosts() {
  const response = await fetch("/api/posts", {
    method: "GET",
  });
  const result = await response.json();
  return result
}
