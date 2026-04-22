import { IoPerson } from "react-icons/io5";

export default function Icon({ icon, className = "w-5 h-5" }) {
  if (!icon) return null;

  // Simple string aliases (e.g. "user") -> map to a react icon
  if (typeof icon === "string") {
    const map = {
      user: IoPerson,
      person: IoPerson,
    };
    const Component = map[icon];
    if (Component) return <Component className={className} />;
    return null;
  }

  // If a raw React component was passed directly
  if (typeof icon === "function") {
    const Component = icon;
    return <Component className={className} />;
  }

  // React icon descriptor
  if (icon.type === "react") {
    const Component = icon.value;
    return <Component className={className} />;
  }

  // File icons (public/res)
  if (icon.type === "file") {
    return (
      <img
        src={`res/${icon.value}`}
        alt=""
        className={`${className} object-contain`}
      />
    );
  }

  return null;
}