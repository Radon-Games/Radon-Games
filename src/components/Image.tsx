export function Image(props: { src: string; className: string; alt: string }) {
  function observe(elm: HTMLImageElement | null) {
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
