import { useEffect, useState } from "react";

export default function Ad({
  slot,
  id,
  width,
  height,
  minH
}: {
  slot: string;
  id?: number;
  width?: number;
  height?: number;
  minH?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!document.getElementById("adsbygoogleaftermount")) {
      const script = document.createElement("script");
      script.id = "adsbygoogleaftermount";
      script.type = "text/javascript";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8517735295733237";
      document.head.appendChild(script);
    }

    if (!mounted) {
      setMounted(true);

      // @ts-expect-error: TODO: Add types for adsense
      window.adsbygoogle = window.adsbygoogle || [];
      // @ts-expect-error: TODO: Add types for adsense
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div
      className="relative h-full w-full bg-bg-secondary shadow-md"
      style={{
        width: width || "100%",
        height: height || "100%",
        minHeight: minH || (height && "auto") || 128
      }}
    >
      <div className="absolute flex h-full w-full items-center justify-center text-center">
        Please consider turning off your Ad Blocker to support Radon Games
      </div>
      <ins
        key={`${slot}${id || ""}`}
        className="adsbygoogle"
        style={
          (width && height && { width, height, display: "inline-block" }) || {
            display: "block"
          }
        }
        data-ad-client="ca-pub-8517735295733237"
        data-ad-slot={slot}
        data-ad-format={(!width || !height) && "auto"}
        data-full-width-responsive={(!width || !height) && "true"}
      ></ins>
    </div>
  );
}
