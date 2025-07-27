import { JSXInternal } from "preact/src/jsx";

interface Props extends JSXInternal.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function Image(props: Props) {
  function observe(elm: HTMLImageElement | null) {
    if (elm) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            observer.unobserve(img);
          }
        });
      });

      observer.observe(elm);
    }
  }

  return (
    <img
      data-src={props.src}
      class={props.class}
      alt={props.alt}
      ref={observe}
    />
  );
}
