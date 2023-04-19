type Props = {
  contentString: string;
};
export const createPost = ({ contentString }: Props) => {
  localStorage.setItem(
    `post`,
    JSON.stringify({ content: contentString }, null, 2)
  );
};
