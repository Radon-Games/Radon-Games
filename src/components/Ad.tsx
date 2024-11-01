import { useEffect, useState } from "react";

export default function Ad({ slot }: { slot: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!document.getElementById("adsbygoogleaftermount")) {
      var script = document.createElement("script");
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

      // @ts-ignore
      window.adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins
      key={slot}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8517735295733237"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
