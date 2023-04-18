export async function updatePost(id: number, contentString: string) {
  const response = await fetch("/api/posts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: contentString }),
  });
  const result = await response.json();
  console.log("Content saved with ID:", result.id);
}
