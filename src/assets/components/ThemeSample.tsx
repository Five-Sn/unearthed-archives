// Properties
interface Props {
  displayName: string;
  thumbnailFile: string;
}

const ThemeSample = ({ displayName, thumbnailFile }: Props) => {
  return (
    <div style={{ display: "inline-block" }}>
      <img
        className="border border-3"
        src={`theme-thumbnails/${thumbnailFile}`}
        style={{ maxWidth: "160px" }}
      />
      <h5 style={{ textAlign: "center" }}>{displayName}</h5>
    </div>
  );
};

export default ThemeSample;
