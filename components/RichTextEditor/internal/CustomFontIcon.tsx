type Props = {
  children: string;
};

export const CustomFontIcon = ({ children }: Props) => {
  return <span style={{ lineHeight: '1.2' }}>{children}</span>;
};
