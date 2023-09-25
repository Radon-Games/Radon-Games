import { JSXInternal } from "preact/src/jsx";

export function Image(props: JSXInternal.HTMLAttributes<HTMLImageElement>) {
  function observe(elm: any) {
    if (elm && elm instanceof HTMLImageElement) {
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
