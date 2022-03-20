import type { ComponentPropsWithoutRef } from "react";

interface OptimisedImageProps extends ComponentPropsWithoutRef<"img"> {
  responsive?: Array<{
    maxWidth?: number;
    size: { width: number; height?: number };
  }>;
}

export function OptimisedImage({
  alt,
  responsive,
  src,
  loading = "lazy",
  ...rest
}: OptimisedImageProps) {
  const props: ComponentPropsWithoutRef<"img"> = {
    src: src + `&width=${rest.width || ""}&height=${rest.height || ""}`,
  };

  let largestImageWidth = 0;
  let largestImageSrc: string | undefined;
  if (responsive && responsive.length) {
    let srcSet = "";
    let sizes = "";
    for (const { maxWidth, size } of responsive) {
      if (srcSet) {
        srcSet += ", ";
      }
      const srcSetUrl =
        src + `&width=${size.width}&height=${size.height || ""} ${size.width}w`;
      srcSet += srcSetUrl;

      if (maxWidth) {
        if (sizes) {
          sizes += ", ";
        }
        sizes += `(max-width: ${maxWidth}px) ${size.width}px`;
      }

      if (size.width > largestImageWidth) {
        largestImageWidth = size.width;
        largestImageSrc = srcSetUrl;
      }
    }
    props.srcSet = srcSet;
    props.sizes = sizes || "100vw";
    props.src = "";
  }

  if (largestImageSrc && (!rest.width || largestImageWidth > rest.width)) {
    props.src = largestImageSrc;
  }

  return <img {...rest} {...props} loading={loading} alt={alt} />;
}
