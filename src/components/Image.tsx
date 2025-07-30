import React from "react";

export function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      className={props.className}
      alt={props.alt}
      ref={observe}
    />
  );
}
