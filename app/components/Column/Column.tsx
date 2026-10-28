import { Fragment } from "react";
import type { ComponentType, CSSProperties, SVGProps } from "react";
import styles from "./Column.module.css";
import CodeBlock from "../CodeBlock/CodeBlock";
import CopyButton from "../CopyButton/CopyButton";
import {
  Smiley,
  Sparkle,
  Burst,
  Bolt,
  Spiral,
  Semicolon,
  Braces,
  Pointer,
  Coffee,
  Rocket,
  Goldfish,
  SleepyMoon,
  Duck,
  Snail,
  Caterpillar,
  Ladybug,
  PeekingCat,
  Mushroom,
  Ghost,
  PaperBoat,
  Cactus,
  Bee,
  Jellyfish,
  Sprout,
  Frog,
  Octopus,
  Whale,
  Penguin,
  Owl,
  Crab,
  Turtle,
  Bunny,
  Teapot,
  Cloudy,
  Donut,
  Cupcake,
} from "../../../app/ui/HandDrawn";

interface Block {
  title: string;
  code: string;
  language?: string;
}

interface ColumnData {
  number: number;
  title: string;
  blocks: Block[];
}

interface ColumnProps {
  data: ColumnData;
  onBlockClick?: (block: Block, blockIndex: number) => void;
  activeBlockIndex?: number | null;
  compact?: boolean;
  columnIndex?: number;
  fontSize?: number;
}

type Doodle = ComponentType<SVGProps<SVGSVGElement> & { draw?: boolean }>;

const HEAD: Doodle[] = [
  Smiley,
  Sparkle,
  Burst,
  Bolt,
  Spiral,
  Semicolon,
  Braces,
  Pointer,
  Coffee,
  Rocket,
  Goldfish,
  SleepyMoon,
];

const CRITTERS: Doodle[] = [
  Snail,
  Caterpillar,
  Ladybug,
  PeekingCat,
  Mushroom,
  Ghost,
  PaperBoat,
  Cactus,
  Bee,
  Jellyfish,
  Sprout,
  Frog,
  Duck,
  Octopus,
  Whale,
  Penguin,
  Owl,
  Crab,
  Turtle,
  Bunny,
  Teapot,
  Cloudy,
  Donut,
  Cupcake,
];

const FILLS = [
  "var(--h-butter)",
  "var(--h-pink)",
  "var(--paper-2)",
  "var(--h-cyan)",
];

const ALIGN = ["flex-start", "center", "flex-end"] as const;

const hash = (n: number) => {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
};

type Slot = {
  Icon: Doodle;
  align: (typeof ALIGN)[number];
  tilt: number;
  fill: string;
} | null;

const planCritters = (number: number, count: number): Slot[] => {
  const slots: Slot[] = Array.from({ length: count }, () => null);

  if (count === 0) return slots;

  const gaps = [Math.floor(hash(number * 131 + 7) * Math.min(3, count))];

  if (count >= 7) {
    const half = Math.floor(count / 2);
    const second = Math.min(
      count - 1,
      Math.max(
        gaps[0] + 2,
        half + Math.floor(hash(number * 211 + 5) * (count - half)),
      ),
    );

    if (second > gaps[0] + 1) gaps.push(second);
  }

  gaps.forEach((gap, k) => {
    slots[gap] = {
      Icon: CRITTERS[(number * 2 + k) % CRITTERS.length],
      align: ALIGN[Math.floor(hash(number * 977 + gap * 53 + 3) * 3)],
      tilt: Math.round((hash(number * 61 + gap * 29 + 11) - 0.5) * 24),
      fill: FILLS[(number + gap) % FILLS.length],
    };
  });

  return slots;
};

export default function Column({
  data,
  onBlockClick,
  activeBlockIndex,
  compact = false,
  columnIndex = 0,
  fontSize = 16,
}: ColumnProps) {
  const delay = compact ? `${columnIndex * 30}ms` : `${columnIndex * 20}ms`;

  const HeadIcon = HEAD[data.number % HEAD.length];
  const slots = planCritters(data.number, data.blocks.length);

  return (
    <div
      className={`${styles.column} ${compact ? styles.compact : ""}`}
      style={
        {
          transitionDelay: delay,
          "--c": Math.min(columnIndex, 5),
        } as CSSProperties
      }
    >
      <div className={styles.meta}>
        <div className={styles.number}>{data.number}</div>
        <div className={styles.countBadge}>{data.blocks.length}</div>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.blockCount}>Blocks: {data.blocks.length}</div>
        <HeadIcon
          className={styles.headDoodle}
          style={
            {
              "--fill": FILLS[data.number % FILLS.length],
              "--tilt": `${((data.number * 7) % 17) - 8}deg`,
            } as CSSProperties
          }
        />
      </div>

      <div className={styles.main}>
        {data.blocks.map((block, i) => {
          const slot = slots[i];

          return (
            <Fragment key={block.title}>
              <div
                className={`${styles.block} ${activeBlockIndex === i ? styles.blockActive : ""}`}
                style={{ "--i": Math.min(i, 7) } as CSSProperties}
                onClick={() => onBlockClick?.(block, i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onBlockClick?.(block, i)}
              >
                <div className={styles.blockTitle} style={{ fontSize }}>
                  {block.title}
                </div>
                <CopyButton text={block.code} />
                <CodeBlock
                  code={block.code}
                  language={block.language ?? "tsx"}
                  fontSize={fontSize}
                />
              </div>

              {slot && (
                <div
                  className={styles.critterRow}
                  style={{ justifyContent: slot.align }}
                  aria-hidden="true"
                >
                  <slot.Icon
                    className={styles.critter}
                    style={
                      {
                        "--fill": slot.fill,
                        "--fill2": "var(--h-red)",
                        rotate: `${slot.tilt}deg`,
                      } as CSSProperties
                    }
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
