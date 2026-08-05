import { codeToHtml } from "shiki";

export async function POST(req) {
  const { code, language } = await req.json();
  const html = await codeToHtml(code, {
    lang: language || "tsx",
    theme: "github-light-high-contrast",
  });
  return Response.json({ html });
}
