type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const Separator: React.FC<Props> = ({ width, height, color }: Props) => (
  <div
    style={{
      width: width || "100%",
      height: height || "2px",
      backgroundColor: color || "black",
    }}
  />
);
