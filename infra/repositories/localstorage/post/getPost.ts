export const getPost = (): string | null => {
  const post = localStorage.getItem(`post`);
  if (post) {
    const parsedPost = JSON.parse(post);
    return parsedPost.content;
  }
  return null;
};
