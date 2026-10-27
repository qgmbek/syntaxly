import type { SVGProps } from "react";

type MarkProps = SVGProps<SVGSVGElement> & { draw?: boolean };

const base = {
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const d = (draw: boolean) => (draw ? { "data-draw": "", pathLength: 1 } : {});

const filled = { style: { fill: "var(--fill, none)" } };

export function Underline({ draw = true, ...rest }: MarkProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      strokeWidth={3}
      {...base}
      {...rest}
    >
      <path
        d="M3 8 C14 3 22 12 34 6 S56 11 68 5 S92 11 104 6 S128 10 140 5 S166 10 180 6 S194 7 197 5"
        {...d(draw)}
      />
    </svg>
  );
}

export function Loop({ draw = true, ...rest }: MarkProps) {
  return (
    <svg
      viewBox="0 0 160 40"
      preserveAspectRatio="none"
      strokeWidth={2.5}
      {...base}
      {...rest}
    >
      <path
        d="M10 26 C4 10 60 3 102 5 C150 7 160 22 120 33 C80 42 14 38 8 20 C6 12 30 6 56 6"
        {...d(draw)}
      />
    </svg>
  );
}

export function Arrow({ draw = true, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 60 24" strokeWidth={2.5} {...base} {...rest}>
      <path d="M57 15 C42 4 22 4 6 12" {...d(draw)} />
      <path d="M6 12 L15 5 M6 12 L16 18" {...d(draw)} />
    </svg>
  );
}

export function Bolt({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 60 80" strokeWidth={3} {...base} {...rest}>
      <path
        d="M37 5 L9 47 L27 45 L21 76 L52 31 L33 33 Z"
        {...filled}
        {...d(draw)}
      />
    </svg>
  );
}

export function Spiral({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 80 80" strokeWidth={3} {...base} {...rest}>
      <path
        d="M40 40 C40 34 47 33 49 38 C52 46 41 53 33 49 C22 44 24 28 36 24 C52 19 62 36 57 50 C51 66 28 68 18 55 C8 42 14 22 30 14"
        {...d(draw)}
      />
    </svg>
  );
}

export function Braces({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 90 80" strokeWidth={3.5} {...base} {...rest}>
      <path
        d="M30 8 C20 8 22 20 22 30 C22 38 16 40 10 40 C16 40 22 42 22 50 C22 60 20 72 30 72 M60 8 C70 8 68 20 68 30 C68 38 74 40 80 40 C74 40 68 42 68 50 C68 60 70 72 60 72"
        {...d(draw)}
      />
    </svg>
  );
}

export function Smiley({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 80 80" strokeWidth={3} {...base} {...rest}>
      <path
        d="M40 8 C60 6 74 22 72 42 C70 62 54 74 38 72 C20 70 8 56 9 38 C10 20 24 9 41 8 Z"
        {...filled}
        {...d(draw)}
      />
      <path d="M29 32 V39 M50 31 V38 M26 50 C32 60 48 62 56 50" {...d(draw)} />
    </svg>
  );
}

export function Semicolon({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 40 80" strokeWidth={4} {...base} {...rest}>
      <path
        d="M20 12 C26 11 29 17 26 22 C23 26 16 24 15 18 C14 14 17 12 20 12 Z"
        {...filled}
        {...d(draw)}
      />
      <path
        d="M21 46 C27 46 29 53 25 57 C21 60 15 57 16 51 C17 47 19 46 21 46 Z"
        {...filled}
        {...d(draw)}
      />
      <path d="M24 58 C23 66 19 71 13 74" {...d(draw)} />
    </svg>
  );
}

export function Burst({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 80 80" strokeWidth={3.5} {...base} {...rest}>
      <path
        d="M40 4 L41 28 M40 52 L39 76 M4 41 L28 39 M52 40 L76 41 M14 14 L31 31 M49 49 L66 66 M66 13 L49 31 M31 49 L13 67"
        {...d(draw)}
      />
    </svg>
  );
}

export function Sparkle({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 60 60" strokeWidth={3} {...base} {...rest}>
      <path
        d="M30 4 C32 20 38 26 56 30 C38 34 32 40 30 56 C28 40 22 34 4 30 C22 26 28 20 30 4 Z"
        {...filled}
        {...d(draw)}
      />
    </svg>
  );
}

export function Coffee({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 80 80" strokeWidth={3} {...base} {...rest}>
      <path
        d="M14 34 H58 C58 54 52 66 36 66 C20 66 14 54 14 34 Z"
        {...filled}
        {...d(draw)}
      />
      <path d="M58 40 C70 38 72 54 56 54 M8 73 H66" {...d(draw)} />
      <path d="M26 8 C21 14 30 18 26 26 M40 6 C35 12 44 16 40 24" {...d(draw)} />
    </svg>
  );
}

export function Pointer({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 70 70" strokeWidth={3} {...base} {...rest}>
      <path
        d="M16 12 L16 54 L28 44 L36 62 L44 58 L36 40 L52 38 Z"
        {...filled}
        {...d(draw)}
      />
      <path d="M8 18 L2 14 M12 8 L9 2 M22 6 L26 1" {...d(draw)} />
    </svg>
  );
}

const filled2 = { style: { fill: "var(--fill2, none)" } };
const solid = { style: { fill: "currentColor" } };
const string = { style: { stroke: "var(--h-red)" } };

export function Goldfish({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 240 160" strokeWidth={3} {...base} {...rest}>
      <path
        d="M68 82 C50 62 28 46 8 34 C16 58 14 76 18 82 C14 90 16 110 8 132 C30 118 52 102 68 82 Z"
        {...filled2}
        {...d(draw)}
      />
      <path
        d="M96 38 C100 14 130 6 152 32 C132 28 112 30 96 38 Z"
        {...filled2}
        {...d(draw)}
      />
      <path
        d="M120 130 C122 148 142 152 154 140 C144 138 134 134 120 130 Z"
        {...filled2}
        {...d(draw)}
      />
      <path
        d="M64 82 C70 44 120 24 160 40 C196 54 214 78 206 98 C198 120 156 138 118 130 C90 124 66 108 64 82 Z"
        {...filled}
        {...d(draw)}
      />
      <path
        d="M150 58 C142 72 142 92 152 106 M110 70 C116 76 122 76 126 70 M122 90 C128 96 134 96 138 90 M98 96 C104 102 110 102 114 96 M208 90 C203 92 199 90 197 86"
        {...d(draw)}
      />
      <path
        d="M182 60 C186 60 188 64 187 68 C185 72 179 72 177 67 C176 63 178 60 182 60 Z"
        {...solid}
      />
      <circle cx="224" cy="52" r="6" />
      <circle cx="232" cy="30" r="4" />
      <circle cx="224" cy="12" r="3" />
    </svg>
  );
}

export function Eye({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 240 150" strokeWidth={3} {...base} {...rest}>
      <path
        d="M8 78 C50 14 190 14 232 78 C190 138 50 138 8 78 Z"
        {...filled}
        {...d(draw)}
      />
      <path
        d="M120 36 C146 34 162 56 160 78 C158 100 140 116 118 114 C96 112 80 94 80 74 C80 52 98 38 120 36 Z"
        {...filled2}
        {...d(draw)}
      />
      <path
        d="M120 58 C130 58 136 66 134 76 C132 86 122 92 112 88 C104 84 102 70 108 63 C111 60 115 58 120 58 Z"
        {...solid}
      />
      <circle
        cx="132"
        cy="62"
        r="7"
        style={{ fill: "var(--paper-2)", stroke: "none" }}
      />
      <path
        d="M40 52 L26 30 M70 34 L60 12 M104 24 L100 6 M140 24 L146 6 M172 34 L184 12 M200 52 L214 32"
        {...d(draw)}
      />
    </svg>
  );
}

export function HandString({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 160 220" strokeWidth={3} {...base} {...rest}>
      <path
        d="M62 108 L62 34 C62 14 84 14 84 34 L84 92 C88 82 104 82 106 94 C110 86 126 88 128 100 C134 94 148 98 148 112 L148 160 C148 182 136 196 128 204 L128 216 L54 216 L54 196 C44 182 38 166 40 150 C30 148 12 130 18 118 C24 108 40 114 46 126 L62 140 Z"
        {...filled}
        {...d(draw)}
      />
      <path d="M88 100 V120 M110 104 V126" {...d(draw)} />
      <path
        d="M59 50 C69 58 79 58 87 50 M59 58 C69 66 79 66 87 58 M87 54 C100 36 120 40 114 54 C110 66 96 62 87 54 Z M59 54 C46 36 28 40 34 54 C38 66 52 62 59 54 Z M73 62 C76 78 68 90 76 100"
        strokeWidth={4}
        {...string}
        {...d(draw)}
      />
    </svg>
  );
}

export function MeltingClock({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 240 200" strokeWidth={3} {...base} {...rest}>
      <path
        d="M30 70 C26 28 80 8 124 14 C170 20 206 44 204 86 C203 104 196 114 190 128 C188 146 176 150 172 134 C170 124 166 120 160 128 C158 150 144 172 134 150 C130 140 124 136 118 144 C112 164 98 160 98 140 C96 128 88 130 80 136 C70 142 58 130 62 116 C40 112 32 94 30 70 Z"
        {...filled}
        {...d(draw)}
      />
      <path
        d="M116 26 V34 M158 44 L152 50 M76 44 L82 50 M164 70 H156 M70 70 H78 M116 66 L116 42 M116 66 L138 80"
        {...d(draw)}
      />
      <circle cx="116" cy="66" r="3.5" {...solid} />
    </svg>
  );
}