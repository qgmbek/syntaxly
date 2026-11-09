import Script from "next/script";

export default function ThemeScript() {
  return (
    <Script id="syntaxly-theme" strategy="beforeInteractive">
      {`
        (() => {
          try {
            const saved = localStorage.getItem("syntaxly-theme");
            const allowed = ["default", "monochrome", "satisfying-fun"];
            const theme = allowed.includes(saved) ? saved : "default";
            document.documentElement.dataset.theme = theme;
          } catch {
            document.documentElement.dataset.theme = "default";
          }
        })();
      `}
    </Script>
  );
}
