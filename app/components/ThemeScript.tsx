export default function ThemeScript() {
  // React hoists and executes async external scripts on server and client renders.
  // Block the first paint until the saved theme has been restored.
  return (
    <script
      id="syntaxly-theme-init"
      src="/theme-init.js"
      async
      blocking="render"
    />
  );
}
