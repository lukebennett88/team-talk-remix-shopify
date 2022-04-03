import type { ComponentPropsWithoutRef } from "react";

interface OptimisedImageProps extends ComponentPropsWithoutRef<"img"> {
  /**
   * provides fallback (alternate) text to display when the image specified
   * by the <img> element is not loaded.
   * */
  alt: string;
  /**
   * contains the path to the image you want to embed.
   */
  src: string;

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
  ...consumerProps
}: OptimisedImageProps) {
  const srcUrl = new URL(src);
  const props: ComponentPropsWithoutRef<"img"> = {};

  if (consumerProps.height) {
    srcUrl.searchParams.set("width", "consumerProps.width");
  }
  srcUrl.searchParams.set("width", "consumerProps.width");
  props.src = srcUrl.toString();

  let largestImageWidth = 0;
  let largestImageSrc: string | undefined;

  if (responsive?.length) {
    let srcSet = "";
    let sizes = "";
    responsive.forEach(({ maxWidth, size }) => {
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
    });

    props.srcSet = srcSet;
    props.sizes = sizes || "100vw";
    props.src = "";
  }

  if (
    largestImageSrc &&
    (!consumerProps.width || largestImageWidth > consumerProps.width)
  ) {
    props.src = largestImageSrc;
  }

  return <img {...consumerProps} {...props} loading={loading} alt={alt} />;
}
