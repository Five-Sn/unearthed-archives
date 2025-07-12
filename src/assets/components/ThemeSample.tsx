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
        src={`theme/thumbnails/${thumbnailFile}`}
        style={{ maxWidth: "120px" }}
      />
      <p className="pb-0 mb-0" style={{ textAlign: "center" }}>
        {displayName}
      </p>
    </div>
  );
};

export default ThemeSample;
