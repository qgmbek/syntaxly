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

export function Magnifier({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 200 220" strokeWidth={3} {...base} {...rest}>
      <path d="M138 140 L182 184" strokeWidth={22} />
      <path
        d="M138 140 L182 184"
        strokeWidth={13}
        style={{ stroke: "var(--fill2, none)" }}
      />
      <path
        d="M92 28 C128 26 158 54 156 92 C154 130 124 158 90 156 C54 154 28 126 30 90 C32 56 58 30 92 28 Z"
        {...filled}
        {...d(draw)}
      />
      <path
        d="M52 76 C62 72 72 80 84 76 S106 72 126 76 M52 112 C62 108 74 116 88 112 S104 110 112 112"
        {...d(draw)}
      />
      <path
        d="M50 94 C64 90 76 98 90 94 S116 90 134 94"
        strokeWidth={5}
        {...string}
        {...d(draw)}
      />
    </svg>
  );
}

export function Scissors({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 300 150" strokeWidth={3} {...base} {...rest}>
      <path d="M4 75 H70" strokeDasharray="7 9" />
      <path d="M82 36 L192 72 L184 84 Z" {...filled2} {...d(draw)} />
      <path d="M82 114 L192 78 L184 66 Z" {...filled2} {...d(draw)} />
      <path
        d="M188 75 L222 90 M188 75 L222 60"
        strokeWidth={7}
        {...d(draw)}
      />
      <ellipse
        cx="252"
        cy="104"
        rx="30"
        ry="19"
        transform="rotate(24 252 104)"
        {...filled}
      />
      <ellipse
        cx="252"
        cy="46"
        rx="30"
        ry="19"
        transform="rotate(-24 252 46)"
        {...filled}
      />
      <circle cx="188" cy="75" r="6" {...solid} />
    </svg>
  );
}

export function Rocket({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 120 220" strokeWidth={3} {...base} {...rest}>
      <path
        d="M32 100 C14 112 10 134 12 152 L34 130 Z M88 100 C106 112 110 134 108 152 L86 130 Z"
        {...filled2}
        {...d(draw)}
      />
      <path
        d="M46 146 C40 170 52 186 60 214 C68 186 80 170 74 146 Z"
        style={{ fill: "var(--h-butter)" }}
        {...d(draw)}
      />
      <path
        d="M60 8 C84 34 92 74 88 130 L32 130 C28 74 36 34 60 8 Z"
        {...filled}
        {...d(draw)}
      />
      <path
        d="M60 8 C70 20 77 34 81 50 L39 50 C43 34 50 20 60 8 Z"
        {...filled2}
        {...d(draw)}
      />
      <circle cx="60" cy="78" r="14" style={{ fill: "var(--h-cyan)" }} />
      <path d="M40 130 H80 L76 142 H44 Z" {...solid} />
      <path d="M60 156 C56 172 60 182 60 194 M20 170 V200 M100 170 V204" />
    </svg>
  );
}

export function SleepyMoon({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" strokeWidth={3} {...base} {...rest}>
      <path
        d="M130 20 C90 26 56 62 56 104 C56 150 94 184 140 180 C108 172 88 144 90 108 C92 72 108 40 130 20 Z"
        {...filled}
        {...d(draw)}
      />
      <path d="M64 98 C69 106 79 106 84 98 M70 130 C73 133 77 133 80 130" />
      <circle
        cx="66"
        cy="120"
        r="5"
        style={{ fill: "var(--h-pink)", stroke: "none" }}
      />
      <path d="M140 56 H160 L140 80 H162 M158 28 H170 L158 44 H172 M176 6 H184 L176 16 H186" />
      <path d="M168 124 V136 M162 130 H174" />
    </svg>
  );
}

export function Duck({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 120 100" strokeWidth={3} {...base} {...rest}>
      <path
        d="M20 62 C20 44 38 36 56 40 C60 28 70 18 84 20 C98 22 102 38 92 48 C100 52 106 60 100 72 C92 88 60 90 40 84 C26 80 20 72 20 62 Z"
        {...filled}
        {...d(draw)}
      />
      <path
        d="M96 36 C108 34 114 40 108 46 C102 50 96 46 94 42 Z"
        {...filled2}
        {...d(draw)}
      />
      <circle cx="86" cy="32" r="2.5" {...solid} />
      <path d="M44 62 C52 70 68 70 74 60 M10 94 C20 90 30 98 40 94 S60 90 70 94 S90 98 110 94" />
    </svg>
  );
}

export function Snail({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 60 38" strokeWidth={2.5} {...base} {...rest}>
      <path d="M4 34 H42 C50 34 52 28 50 22 C49 18 50 14 52 10 M50 14 L47 6 M52 12 L57 6" />
      <path
        d="M30 8 C42 6 46 16 44 24 C42 32 28 34 22 28 C16 22 20 12 30 8 Z"
        {...filled}
        {...d(draw)}
      />
      <path d="M30 14 C36 14 38 22 32 24 C28 25 26 20 30 19" />
    </svg>
  );
}

export function Caterpillar({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 68 30" strokeWidth={2.5} {...base} {...rest}>
      <circle cx="10" cy="22" r="7" {...filled} />
      <circle cx="22" cy="21" r="7.5" {...filled} />
      <circle cx="35" cy="22" r="8" {...filled} />
      <circle cx="47" cy="20" r="8" {...filled} />
      <circle cx="58" cy="16" r="9" {...filled} />
      <circle cx="55" cy="14" r="1.6" {...solid} />
      <circle cx="61" cy="14" r="1.6" {...solid} />
      <path d="M54 20 C57 23 61 23 63 20 M54 8 L52 2 M62 8 L65 2" />
    </svg>
  );
}

export function Ladybug({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 36 30" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M4 24 C4 8 32 8 32 24 Z"
        style={{ fill: "var(--h-red)" }}
      />
      <path d="M13 10 C13 3 23 3 23 10 Z" {...solid} />
      <path d="M18 10 V24 M8 26 L5 30 M18 26 V30 M28 26 L31 30 M15 4 L12 0 M21 4 L24 0" />
      <circle cx="11" cy="17" r="2" {...solid} />
      <circle cx="25" cy="17" r="2" {...solid} />
    </svg>
  );
}

export function PeekingCat({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 60 32" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M8 32 C6 20 8 12 14 9 L16 1 L24 7 C28 6 32 6 36 7 L44 1 L46 9 C52 12 54 20 52 32"
        {...filled}
      />
      <circle cx="22" cy="18" r="2.2" {...solid} />
      <circle cx="38" cy="18" r="2.2" {...solid} />
      <path d="M28 23 L32 23 L30 26 Z" style={{ fill: "var(--h-pink)" }} />
      <path d="M14 23 L4 21 M14 26 L4 28 M46 23 L56 21 M46 26 L56 28 M16 32 C16 27 22 27 22 32 M38 32 C38 27 44 27 44 32" />
    </svg>
  );
}

export function Mushroom({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 36 36" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M13 20 C12 28 12 32 14 34 H22 C24 32 24 28 23 20"
        style={{ fill: "var(--paper-2)" }}
      />
      <path d="M4 20 C4 6 32 6 32 20 Z" {...filled} />
      <circle cx="12" cy="14" r="2" style={{ fill: "var(--paper-2)", stroke: "none" }} />
      <circle cx="22" cy="12" r="2.2" style={{ fill: "var(--paper-2)", stroke: "none" }} />
      <circle cx="27" cy="17" r="1.6" style={{ fill: "var(--paper-2)", stroke: "none" }} />
    </svg>
  );
}

export function Ghost({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 32 40" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M4 36 V16 C4 4 28 4 28 16 V36 L23 31 L18 36 L14 31 L9 36 Z"
        style={{ fill: "var(--paper-2)" }}
      />
      <circle cx="12" cy="17" r="2" {...solid} />
      <circle cx="20" cy="17" r="2" {...solid} />
      <path d="M13 24 C15 27 17 27 19 24" />
    </svg>
  );
}

export function PaperBoat({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 56 34" strokeWidth={2.5} {...base} {...rest}>
      <path d="M28 4 L44 20 H28 Z M28 8 L16 20 H28 Z" style={{ fill: "var(--paper-2)" }} />
      <path d="M4 20 H52 L44 30 H12 Z" {...filled} />
      <path d="M2 33 C8 30 12 36 18 33 S30 30 36 33 S48 36 54 33" />
    </svg>
  );
}

export function Cactus({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 36 44" strokeWidth={2.5} {...base} {...rest}>
      <path d="M14 34 V10 C14 3 22 3 22 10 V34 Z" {...filled} />
      <path d="M14 22 H8 C5 22 5 14 8 14 M22 18 H28 C31 18 31 10 28 10" />
      <path d="M8 34 H28 L26 44 H10 Z" style={{ fill: "var(--h-red)" }} />
      <circle cx="18" cy="4" r="3" style={{ fill: "var(--h-pink)" }} />
    </svg>
  );
}

export function Bee({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 44 32" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M16 10 C14 2 22 0 24 8 M24 8 C28 0 36 4 30 10"
        style={{ fill: "var(--paper-2)" }}
      />
      <path d="M10 18 C10 8 32 8 32 18 C32 28 10 28 10 18 Z" {...filled} />
      <path d="M17 10 V26 M24 10 V26 M32 18 L38 18" />
      <circle cx="14" cy="16" r="1.5" {...solid} />
    </svg>
  );
}

export function Jellyfish({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 36 44" strokeWidth={2.5} {...base} {...rest}>
      <path d="M4 22 C4 4 32 4 32 22 Z" {...filled} />
      <path d="M9 22 C6 30 12 32 9 40 M16 22 C13 30 19 32 16 42 M23 22 C20 30 26 32 23 40 M29 22 C26 30 32 32 29 38" />
      <circle cx="13" cy="14" r="1.6" {...solid} />
      <circle cx="23" cy="14" r="1.6" {...solid} />
    </svg>
  );
}

export function Sprout({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 30 40" strokeWidth={2.5} {...base} {...rest}>
      <path d="M15 38 V20 M6 38 H24" />
      <path d="M15 24 C6 24 4 14 4 14 C14 12 15 20 15 24 Z" {...filled} />
      <path d="M15 20 C24 20 26 10 26 10 C16 8 15 16 15 20 Z" {...filled} />
    </svg>
  );
}

export function Frog({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 48 34" strokeWidth={2.5} {...base} {...rest}>
      <path d="M6 32 C4 20 12 14 24 14 C36 14 44 20 42 32 Z" {...filled} />
      <path d="M10 16 C8 8 18 6 18 14 M30 14 C30 6 40 8 38 16" style={{ fill: "var(--paper-2)" }} />
      <circle cx="14" cy="11" r="1.6" {...solid} />
      <circle cx="34" cy="11" r="1.6" {...solid} />
      <path d="M16 24 C22 28 30 28 34 24" />
    </svg>
  );
}

export function Octopus({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 44 40" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M8 20 C8 4 36 4 36 20 C36 24 34 26 30 26 H14 C10 26 8 24 8 20 Z"
        {...filled}
      />
      <path d="M12 26 C8 32 12 36 8 38 M18 26 C16 32 20 36 17 39 M26 26 C28 32 24 36 27 39 M32 26 C36 32 32 36 36 38 M19 21 C21 23 23 23 25 21" />
      <circle cx="17" cy="16" r="2" {...solid} />
      <circle cx="27" cy="16" r="2" {...solid} />
    </svg>
  );
}

export function Whale({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 60 36" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M4 26 C4 10 24 6 38 10 C50 13 56 20 56 24 C56 30 50 32 44 30 C40 32 30 34 20 32 C10 32 4 30 4 26 Z"
        {...filled}
      />
      <path d="M6 24 C2 22 1 16 3 12 C7 14 9 18 10 22 M30 8 V2 M30 4 C26 2 24 6 26 8 M30 4 C34 2 36 6 34 8 M14 28 C26 31 38 29 46 27" />
      <circle cx="46" cy="20" r="1.8" {...solid} />
    </svg>
  );
}

export function Penguin({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 32 44" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M16 4 C26 4 28 18 28 30 C28 40 22 42 16 42 C10 42 4 40 4 30 C4 18 6 4 16 4 Z"
        {...filled}
      />
      <path
        d="M16 16 C22 16 24 28 22 36 C20 40 12 40 10 36 C8 28 10 16 16 16 Z"
        style={{ fill: "var(--paper-2)" }}
      />
      <path d="M14 15 L18 15 L16 18 Z" style={{ fill: "var(--h-butter)" }} />
      <path d="M10 42 L8 44 M22 42 L24 44 M4 24 L1 30 M28 24 L31 30" />
      <circle cx="12" cy="11" r="1.6" {...solid} />
      <circle cx="20" cy="11" r="1.6" {...solid} />
    </svg>
  );
}

export function Owl({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 36 40" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M18 3 C30 3 32 16 32 26 C32 36 24 38 18 38 C12 38 4 36 4 26 C4 16 6 3 18 3 Z"
        {...filled}
      />
      <circle cx="12" cy="16" r="6" style={{ fill: "var(--paper-2)" }} />
      <circle cx="24" cy="16" r="6" style={{ fill: "var(--paper-2)" }} />
      <circle cx="12" cy="16" r="2" {...solid} />
      <circle cx="24" cy="16" r="2" {...solid} />
      <path d="M16 22 L20 22 L18 26 Z" style={{ fill: "var(--h-butter)" }} />
      <path d="M8 8 L6 2 L13 5 M28 8 L30 2 L23 5 M12 30 C14 33 16 33 18 30 M18 30 C20 33 22 33 24 30 M12 38 V40 M24 38 V40" />
    </svg>
  );
}

export function Crab({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 52 34" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M10 20 C10 8 42 8 42 20 C42 28 34 30 26 30 C18 30 10 28 10 20 Z"
        {...filled}
      />
      <path d="M8 18 C2 16 0 8 6 6 C8 10 12 10 12 14 M44 18 C50 16 52 8 46 6 C44 10 40 10 40 14 M20 10 V5 M32 10 V5 M12 28 L6 32 M16 30 L12 34 M40 28 L46 32 M36 30 L40 34 M22 21 C24 24 28 24 30 21" />
      <circle cx="20" cy="4" r="2" {...solid} />
      <circle cx="32" cy="4" r="2" {...solid} />
    </svg>
  );
}

export function Turtle({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 56 34" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M40 22 C44 14 52 16 52 22 C52 26 46 28 42 26 Z"
        style={{ fill: "var(--paper-2)" }}
      />
      <path d="M8 26 C8 6 40 6 40 26 Z" {...filled} />
      <path d="M24 8 V26 M14 14 L18 26 M34 14 L30 26 M12 26 V32 H18 V26 M30 26 V32 H36 V26 M8 24 L2 26" />
      <circle cx="48" cy="20" r="1.4" {...solid} />
    </svg>
  );
}

export function Bunny({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 44 36" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M8 36 C6 22 10 14 22 14 C34 14 38 22 36 36"
        {...filled}
      />
      <path d="M14 16 C10 4 14 0 18 2 C20 6 20 12 20 15 M30 16 C34 4 30 0 26 2 C24 6 24 12 24 15 M14 36 C14 32 20 32 20 36 M24 36 C24 32 30 32 30 36" />
      <path d="M20 30 L24 30 L22 32 Z" style={{ fill: "var(--h-pink)" }} />
      <circle cx="17" cy="26" r="2" {...solid} />
      <circle cx="27" cy="26" r="2" {...solid} />
    </svg>
  );
}

export function Teapot({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 52 38" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M8 22 C8 8 32 8 32 22 C32 32 28 36 20 36 C12 36 8 32 8 22 Z"
        {...filled}
      />
      <path d="M14 10 C14 6 26 6 26 10 M20 6 V3 M32 18 C38 18 40 12 44 10 C44 16 42 24 32 26 M8 16 C0 14 0 28 8 28" />
    </svg>
  );
}

export function Cloudy({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 52 38" strokeWidth={2.5} {...base} {...rest}>
      <path
        d="M12 24 C4 24 2 14 10 12 C10 4 24 0 30 8 C36 4 48 8 44 18 C50 20 48 26 42 26 Z"
        {...filled}
      />
      <path d="M21 20 C24 23 28 23 31 20 M14 31 V35 M24 30 V36 M34 31 V35" />
      <circle cx="20" cy="16" r="1.5" {...solid} />
      <circle cx="30" cy="16" r="1.5" {...solid} />
    </svg>
  );
}

export function Donut({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 40 36" strokeWidth={2.5} {...base} {...rest}>
      <path d="M4 18 C4 6 36 6 36 18 C36 30 4 30 4 18 Z" {...filled} />
      <path d="M15 18 C15 14 25 14 25 18 C25 22 15 22 15 18 Z" />
      <path d="M10 14 L13 12 M27 12 L30 14 M10 23 L13 25 M28 24 L31 22 M20 9 L20 11" />
    </svg>
  );
}

export function Cupcake({ draw = false, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 36 40" strokeWidth={2.5} {...base} {...rest}>
      <path d="M6 22 H30 L27 38 H9 Z" style={{ fill: "var(--paper-2)" }} />
      <path d="M13 22 L12 38 M18 22 V38 M23 22 L24 38" />
      <path
        d="M4 22 C2 12 12 12 12 6 C16 0 22 4 22 8 C30 8 34 14 32 22 Z"
        {...filled}
      />
      <circle cx="18" cy="3" r="3" style={{ fill: "var(--h-red)" }} />
    </svg>
  );
}