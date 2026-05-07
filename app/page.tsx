"use client";

import { useState, Fragment } from "react";
import Column from "./components/Column/Column";
import ExplanationColumn, {
  ExplanationData,
} from "./components/ExplanationColumn/ExplanationColumn";

interface Block {
  title: string;
  code: string;
  language?: string;
  explanation: ExplanationData;
}

interface ColumnData {
  number: number;
  title: string;
  blocks: Block[];
}

const COLUMNS: ColumnData[] = [
  {
    number: 1,
    title: "Fundamentals",
    blocks: [
      {
        title: "Variables",
        code: `const x: number = 42;`,
        explanation: {
          blockTitle: "Variables",
          what: "A variable is a named container that holds a value. In TypeScript you declare its type so the compiler can catch mistakes before your code runs.",
          how: "`const` creates an immutable binding - you can't reassign it. `let` allows reassignment. TypeScript infers the type from the value, but you can annotate it explicitly for clarity.",
          example: `const score = 100;\nconst name: string = "Alice";\n\nlet count: number = 0;\ncount = count + 1;\n\nconsole.log(score); // 100\nconsole.log(name);  // Alice\nconsole.log(count); // 1`,
          tip: "Prefer `const` by default. Only reach for `let` when you genuinely need to reassign.",
        },
      },
      {
        title: "While Loops",
        code: `while (x > 0) { x--; }`,
        explanation: {
          blockTitle: "While Loops",
          what: "A while loop repeats a block of code as long as its condition remains true. Useful when you don't know the iteration count in advance.",
          how: "The condition is evaluated before each iteration. If it's false from the start, the body never runs. Always make sure the condition eventually becomes false or you'll have an infinite loop.",
          example: `let remaining = 5;\n\nwhile (remaining > 0) {\n  console.log(\`\${remaining} left\`);\n  remaining--;\n}\n\n// Output:\n// 5 left\n// 4 left\n// 3 left\n// 2 left\n// 1 left`,
          tip: "If you know the iteration count upfront, a `for` loop is usually cleaner and less error-prone.",
        },
      },
      {
        title: "Functions",
        code: `function greet(name: string) {\n  return \`Hello \${name}\`;\n}`,
        explanation: {
          blockTitle: "Functions",
          what: "A function is a reusable block of logic with a name. You give it inputs (parameters) and it produces an output (return value).",
          how: "TypeScript lets you annotate parameter types and the return type. If you omit the return annotation TypeScript infers it. Arrow functions (`=>`) are a shorter alternative syntax.",
          example: `function add(a: number, b: number): number {\n  return a + b;\n}\n\nconst multiply = (a: number, b: number): number => a * b;\n\nconsole.log(add(2, 3));      // 5\nconsole.log(multiply(4, 5)); // 20`,
          tip: "Keep functions focused on one thing. If a function needs a long comment to explain what it does, it's probably doing too much.",
        },
      },
      {
        title: "If / Else",
        code: `if (x > 0) {\n  // positive\n} else {\n  // other\n}`,
        explanation: {
          blockTitle: "If / Else",
          what: "Conditional statements let your program take different paths depending on whether a condition is true or false.",
          how: "TypeScript evaluates the expression in `if (...)`. If truthy, the first block runs. If falsy, the `else` block runs. You can chain conditions with `else if`.",
          example: `const score = 72;\n\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 75) {\n  console.log("B");\n} else if (score >= 60) {\n  console.log("C");\n} else {\n  console.log("F");\n}\n// Output: C`,
          tip: "For simple true/false assignments, the ternary operator is more concise: `const label = score >= 60 ? 'pass' : 'fail'`",
        },
      },
      {
        title: "Arrays",
        code: `const nums: number[] = [1, 2, 3];`,
        explanation: {
          blockTitle: "Arrays",
          what: "An array is an ordered list of values. In TypeScript you annotate the element type with `Type[]` or `Array<Type>`.",
          how: "Arrays are zero-indexed. You access elements with bracket notation `arr[0]`. Common methods: `push`, `pop`, `map`, `filter`, `find`, `reduce`.",
          example: `const fruits: string[] = ["apple", "banana", "cherry"];\n\nconsole.log(fruits[0]);       // apple\nconsole.log(fruits.length);   // 3\n\nconst upper = fruits.map(f => f.toUpperCase());\nconsole.log(upper); // ["APPLE", "BANANA", "CHERRY"]\n\nfruits.push("date");\nconsole.log(fruits.length); // 4`,
          tip: "`map` returns a new array without mutating the original. Prefer it over `for` loops when transforming data.",
        },
      },
    ],
  },
  {
    number: 2,
    title: "Types",
    blocks: [
      {
        title: "Primitives",
        code: `let n: number = 1;\nlet s: string = "hi";\nlet b: boolean = true;`,
        language: "ts",
        explanation: {
          blockTitle: "Primitives",
          what: "TypeScript's three basic primitive types are `number`, `string`, and `boolean`. They map directly to JavaScript's runtime primitives.",
          how: "TypeScript infers the type from the assigned value, so explicit annotations are optional but useful for documentation and edge cases.",
          example: `let age: number = 30;\nlet username: string = "alice";\nlet isAdmin: boolean = false;\n\n// TypeScript infers these too:\nlet score = 99;        // number\nlet greeting = "hey";  // string\nlet active = true;     // boolean`,
          tip: "Use `number` for all numeric values — TypeScript has no separate `int` or `float` types.",
        },
      },
      {
        title: "Interfaces",
        code: `interface User {\n  name: string;\n  age: number;\n}`,
        language: "ts",
        explanation: {
          blockTitle: "Interfaces",
          what: "An interface defines the shape of an object — which properties it has and what types they are.",
          how: "Any object that has all the required properties satisfies the interface. You can mark properties optional with `?` and readonly with `readonly`.",
          example: `interface User {\n  name: string;\n  age: number;\n  email?: string;       // optional\n  readonly id: number;  // can't be changed\n}\n\nconst alice: User = {\n  name: "Alice",\n  age: 28,\n  id: 1,\n};\n\nconsole.log(alice.name); // Alice`,
          tip: "Use interfaces for object shapes. Use `type` aliases when you need unions, intersections, or primitives.",
        },
      },
      {
        title: "Union Types",
        code: `let id: string | number;`,
        language: "ts",
        explanation: {
          blockTitle: "Union Types",
          what: "A union type means a value can be one of several types. Use the `|` operator to combine them.",
          how: "TypeScript narrows the type based on runtime checks. Inside an `if (typeof x === 'string')` block, TypeScript knows `x` is a string.",
          example: `type ID = string | number;\n\nfunction printId(id: ID) {\n  if (typeof id === "string") {\n    console.log(id.toUpperCase());\n  } else {\n    console.log(id * 2);\n  }\n}\n\nprintId("abc"); // ABC\nprintId(21);    // 42`,
          tip: "Unions are great for values that can legitimately be one of a few known types. For many variants, consider discriminated unions.",
        },
      },
      {
        title: "Generics",
        code: `function identity<T>(arg: T): T {\n  return arg;\n}`,
        language: "ts",
        explanation: {
          blockTitle: "Generics",
          what: "Generics let you write reusable code that works with any type while still being type-safe. Think of `T` as a placeholder for a real type.",
          how: "When you call a generic function, TypeScript infers `T` from the argument. You can also pass it explicitly: `identity<string>('hello')`.",
          example: `function wrap<T>(value: T): { value: T } {\n  return { value };\n}\n\nconst a = wrap(42);       // { value: number }\nconst b = wrap("hello");  // { value: string }\n\n// Generic with constraint\nfunction getLength<T extends { length: number }>(arg: T): number {\n  return arg.length;\n}\n\nconsole.log(getLength("hello")); // 5\nconsole.log(getLength([1,2,3])); // 3`,
          tip: "Name generic parameters `T`, `U`, `K`, `V` for short, or descriptive names like `TItem`, `TKey` in complex code.",
        },
      },
      {
        title: "Type Aliases",
        code: `type Point = { x: number; y: number };`,
        language: "ts",
        explanation: {
          blockTitle: "Type Aliases",
          what: "A `type` alias gives a name to any type expression - objects, unions, primitives, tuples, and more.",
          how: "Unlike interfaces, type aliases can express unions and intersections directly. Use `&` to combine types (intersection) and `|` for unions.",
          example: `type Point = { x: number; y: number };\ntype Color = "red" | "green" | "blue";\ntype ID = string | number;\n\ntype ColoredPoint = Point & { color: Color };\n\nconst p: ColoredPoint = {\n  x: 10,\n  y: 20,\n  color: "red",\n};\n\nconsole.log(p); // { x: 10, y: 20, color: 'red' }`,
          tip: "Prefer `interface` for object shapes you'll extend or implement. Use `type` for everything else.",
        },
      },
    ],
  },
  {
    number: 3,
    title: "React",
    blocks: [
      {
        title: "Component",
        code: `export default function Button() {\n  return <button>Click</button>;\n}`,
        language: "tsx",
        explanation: {
          blockTitle: "Component",
          what: "A React component is a function that returns JSX — a description of what should appear on screen. Components are the building blocks of React UIs.",
          how: "The function name must start with a capital letter. It can receive data via props and return any JSX. React calls this function whenever it needs to render or re-render.",
          example: `interface ButtonProps {\n  label: string;\n  onClick: () => void;\n}\n\nexport default function Button({ label, onClick }: ButtonProps) {\n  return (\n    <button\n      onClick={onClick}\n      style={{ padding: "8px 16px", cursor: "pointer" }}\n    >\n      {label}\n    </button>\n  );\n}\n\n// Usage:\n// <Button label="Save" onClick={() => console.log("saved")} />`,
          tip: "Keep components small and focused. If JSX gets long, split it into smaller child components.",
        },
      },
      {
        title: "useState",
        code: `const [count, setCount] = useState(0);`,
        language: "tsx",
        explanation: {
          blockTitle: "useState",
          what: "`useState` is a React hook that adds local state to a component. When state changes, React re-renders the component with the new value.",
          how: "Call `useState(initialValue)` — it returns a tuple: the current value and a setter function. Always use the setter to update state, never mutate directly.",
          example: `import { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}`,
          tip: "For complex state with multiple related fields, consider `useReducer` instead of multiple `useState` calls.",
        },
      },
      {
        title: "useEffect",
        code: `useEffect(() => {\n  fetchData();\n}, [id]);`,
        language: "tsx",
        explanation: {
          blockTitle: "useEffect",
          what: "`useEffect` runs side effects in a component - things like fetching data, setting up subscriptions, or updating the document title.",
          how: "The second argument is the dependency array. The effect re-runs whenever a dependency changes. An empty array `[]` means run once on mount. Returning a function from the effect cleans up on unmount.",
          example: `import { useState, useEffect } from "react";\n\nexport default function Profile({ userId }: { userId: number }) {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    fetch(\`/api/users/\${userId}\`)\n      .then(res => res.json())\n      .then(data => setUser(data));\n  }, [userId]); // re-runs when userId changes\n\n  if (!user) return <p>Loading...</p>;\n  return <p>Hello, {user.name}</p>;\n}`,
          tip: "Every value used inside the effect that comes from the component scope should be in the dependency array. The `eslint-plugin-react-hooks` rule enforces this automatically.",
        },
      },
      {
        title: "Props",
        code: `function Card({ title }: { title: string }) {\n  return <div>{title}</div>;\n}`,
        language: "tsx",
        explanation: {
          blockTitle: "Props",
          what: "Props (short for properties) are how parent components pass data down to child components. They are read-only inside the child.",
          how: "Destructure props directly in the function signature for cleaner code. Define the shape with an interface for type safety. Default values can be set with `=` in destructuring.",
          example: `interface CardProps {\n  title: string;\n  subtitle?: string;\n  highlighted?: boolean;\n}\n\nfunction Card({ title, subtitle = "No subtitle", highlighted = false }: CardProps) {\n  return (\n    <div style={{ border: highlighted ? "2px solid gold" : "1px solid gray" }}>\n      <h2>{title}</h2>\n      <p>{subtitle}</p>\n    </div>\n  );\n}\n\n// Usage:\n// <Card title="Hello" highlighted />\n// <Card title="World" subtitle="A subtitle" />`,
          tip: "Never modify props inside a child component. If you need to transform data, derive a new value from props instead.",
        },
      },
      {
        title: "Event Handlers",
        code: `<button onClick={(e) => console.log(e)}>Click</button>`,
        explanation: {
          blockTitle: "Event Handlers",
          what: "Event handlers are functions that run in response to user actions like clicks, input changes, form submissions, and keyboard events.",
          how: "In JSX, event names are camelCase (`onClick`, `onChange`, `onSubmit`). You pass a function reference - not a call. TypeScript infers the event type from the JSX attribute.",
          example: `import { useState } from "react";\n\nexport default function Form() {\n  const [text, setText] = useState("");\n\n  function handleSubmit(e: React.FormEvent) {\n    e.preventDefault();\n    console.log("Submitted:", text);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        placeholder="Type something"\n      />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}`,
          tip: "Always call `e.preventDefault()` in form `onSubmit` handlers to stop the page from reloading.",
        },
      },
    ],
  },
];

interface Selected {
  columnIndex: number;
  blockIndex: number;
  explanation: ExplanationData;
}

export default function Home() {
  const [selected, setSelected] = useState<Selected | null>(null);

  function handleBlockClick(
    columnIndex: number,
    block: Block,
    blockIndex: number,
  ) {
    if (
      selected?.columnIndex === columnIndex &&
      selected?.blockIndex === blockIndex
    ) {
      setSelected(null);
      return;
    }
    setSelected({ columnIndex, blockIndex, explanation: block.explanation });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        height: "100vh",
      }}
    >
      {COLUMNS.map((col, colIndex) => (
        <Fragment key={col.number}>
          <Column
            data={col}
            activeBlockIndex={
              selected?.columnIndex === colIndex ? selected.blockIndex : null
            }
            onBlockClick={(block, blockIndex) =>
              handleBlockClick(colIndex, block as Block, blockIndex)
            }
          />
          <ExplanationColumn
            data={
              selected?.columnIndex === colIndex ? selected.explanation : null
            }
            onClose={() => setSelected(null)}
          />
        </Fragment>
      ))}
    </div>
  );
}
