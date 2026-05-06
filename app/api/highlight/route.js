import { codeToHtml } from "shiki";

export async function POST(req) {
  const { code, language } = await req.json();
  const html = await codeToHtml(code, {
    lang: language || "tsx",
    theme: "aurora-x",
  });
  return Response.json({ html });
}
