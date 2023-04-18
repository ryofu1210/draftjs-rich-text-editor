export async function savePostToDatabase(
  id: number | null,
  contentString: string
) {
  if (!id) {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: contentString }),
    });
    const result = await response.json();
    console.log("Content saved with ID:", result.id);
  } else {
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
}
