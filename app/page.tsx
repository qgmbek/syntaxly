import Column from "./components/Column/Column";

export default function Home() {
  return (
    <div>
      <Column
        data={{
          number: 1,
          title: "Fundamentals",
          blocks: [
            {
              title: "Variables",
              code: `const x: number = 42;`,
              language: "ts",
            },
            {
              title: "While Loops",
              code: `while (x > 0) { x--; }`,
              language: "ts",
            },
            {
              title: "Functions",
              code: `function greet(name: string) {\n  return \`Hello \${name}\`;\n}`,
              language: "ts",
            },
          ],
        }}
      />
    </div>
  );
}
