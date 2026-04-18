export default function Icon({ icon }) {
  if (!icon) return null;

  // React icons (Si*, Tb*, etc.)
  if (icon.type === "react") {
    const Component = icon.value;
    return <Component className="w-5 h-5" />;
  }

  // File icons (public/res)
  if (icon.type === "file") {
    return (
      <img
        src={`res/${icon.value}`}
        alt=""
        className="w-5 h-5 object-contain"
      />
    );
  }

  return null;
}