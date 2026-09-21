import type { ImgHTMLAttributes } from "react";
import { webpFor } from "@/assets/webp";

type PictureProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  pictureClassName?: string;
};

export function Picture({
  src,
  alt,
  className,
  pictureClassName,
  decoding = "async",
  loading,
  fetchPriority,
  ...rest
}: PictureProps) {
  const webp = webpFor(src);
  const resolvedLoading = loading ?? (fetchPriority === "high" ? "eager" : "lazy");
  const image = (
    <img
      src={src}
      alt={alt}
      className={className}
      decoding={decoding}
      loading={resolvedLoading}
      fetchPriority={fetchPriority}
      {...rest}
    />
  );

  if (!webp) return image;

  return (
    <picture className={pictureClassName}>
      <source srcSet={webp} type="image/webp" />
      {image}
    </picture>
  );
}
