import Image from "next/image";

// ΜΗΝ χρησιμοποιείς ImageProps για το src εδώ.
// Ορίζουμε ρητά src: string, alt: string.
type FigureProps = Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  src: string;
  alt: string;
  caption?: string;
};

export function Figure({ src, alt, caption, priority, ...rest }: FigureProps) {
  return (
    <figure className="not-prose my-8 overflow-hidden border border-line bg-panel">
      <Image
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        loading={priority ? undefined : "lazy"}
        sizes="(max-width: 768px) 100vw, 800px"
        priority={priority}
        {...rest}
      />
      {caption ? (
        <figcaption className="border-t border-line px-4 py-3 font-mono text-xs text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const MDXImg = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // «Καθαρίζουμε» τι έρχεται από το MDX ώστε να είναι string (όχι Blob/undefined)
  const src = typeof props.src === "string" ? props.src : "";
  const alt = typeof props.alt === "string" ? props.alt : "";
  const caption = typeof props.title === "string" ? props.title : undefined;

  // Αν δεν υπάρχει έγκυρο src, μην κάνεις render Image για να αποφύγεις runtime error
  if (!src) return null;

  return (
    <Figure
      src={src}
      alt={alt}
      caption={caption}
      width={1200}
      height={800}
      priority={false}
    />
  );
};
