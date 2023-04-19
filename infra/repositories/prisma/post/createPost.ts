export async function createPost(contentString: any) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: contentString }),
  });
  const result = await response.json();
  console.log("Content saved with ID:", result.id);
  return result
}
