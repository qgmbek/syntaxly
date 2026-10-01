const THEME_INIT_SCRIPT = `(function(){try{var raw=localStorage.getItem("syntaxly-theme");if(!raw)return;var data=JSON.parse(raw);if(!data||typeof data.expiresAt!=="number"||Date.now()>data.expiresAt){localStorage.removeItem("syntaxly-theme");return;}if(data.theme==="default"||data.theme==="monochrome"||data.theme==="satisfying-fun"){document.documentElement.dataset.theme=data.theme;}}catch(e){}})();`;

export default function ThemeScript() {
  return (
    <script
      id="syntaxly-theme-init"
      // Server emits a normal (executable) script. On the client the type
      // becomes non-executable, which silences React 19's warning.
      type={typeof window === "undefined" ? undefined : "application/json"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  );
}