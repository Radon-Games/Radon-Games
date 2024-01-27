declare global {
  interface Window {
    gtag: (
      option: string,
      gaTrackingId: string,
      options: Record<string, unknown>
    ) => void;
  }
}

export const pageview = (url: string) => {
  if (!window.gtag) {
    console.warn(
      "window.gtag is not defined. This could mean your google analytics script has not loaded on the page yet."
    );
    return;
  }

  window.gtag("config", "G-0GR0HN1RFL", {
    page_path: url
  });
};
