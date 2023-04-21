export type StyleButtonProps = {
  onToggle: (style: string) => void;
  style: string;
  active: boolean;
  label: React.ReactNode;
};

export const StyleButton = (props: StyleButtonProps) => {
  const handleMouseDown = (e: any) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = "RichEditor-styleButton";
  if (props.active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={handleMouseDown}>
      {props.label}
    </span>
  );
};
