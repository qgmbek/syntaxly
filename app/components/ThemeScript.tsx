import Script from "next/script";

const THEME_INIT_SCRIPT = `(function(){try{var raw=localStorage.getItem("syntaxly-theme");if(!raw)return;var data=JSON.parse(raw);if(!data||typeof data.expiresAt!=="number"||Date.now()>data.expiresAt){localStorage.removeItem("syntaxly-theme");return;}if(data.theme==="default"||data.theme==="monochrome"){document.documentElement.dataset.theme=data.theme;}}catch(e){}})();`;

export default function ThemeScript() {
  return (
    <Script id="syntaxly-theme-init" strategy="beforeInteractive">
      {THEME_INIT_SCRIPT}
    </Script>
  );
}
