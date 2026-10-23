"use client";

import { useState, useRef, useEffect, MouseEvent, CSSProperties } from "react";
import {
  ClockCounterClockwise,
  SquaresFour,
  Lightning,
  BracketsCurly,
  Terminal,
  Database,
  Pulse,
  GitBranch,
  Stack,
  Cpu,
  ArrowLeft,
  CubeTransparentIcon,
} from "@phosphor-icons/react";

import styles from "./BentoCards.module.css";
import useReveal from "../../../hooks/useReveal";

type SyntaxKey = "useState" | "useRef" | "useEffect";

type SyntaxItem = {
  name: string;
  lang: string;
  shortCode: string;
  what: string;
  how: string;
  example: string;
  tips: string;
  icon: React.ReactNode;
};

const HEADING = "Everything you need to recall on the fly.";

const at = (seconds: number, distance?: number) =>
  ({
    "--delay": `${seconds}s`,
    ...(distance ? { "--dist": `${distance}px` } : {}),
  }) as CSSProperties;

export default function BentoCards() {
  const sectionRef = useReveal<HTMLElement>(0.15);
  const snippetRef = useRef<HTMLDivElement>(null);
  const [snippetIn, setSnippetIn] = useState(false);
  const [activeBlock, setActiveBlock] = useState<SyntaxKey>("useState");
  const [swapCount, setSwapCount] = useState(0);
  const [swapDir, setSwapDir] = useState<"up" | "down">("up");

  useEffect(() => {
    const node = snippetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSnippetIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  const trackPointer = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", (x / rect.width - 0.5).toFixed(3));
    card.style.setProperty("--ry", (y / rect.height - 0.5).toFixed(3));
  };

  const resetPointer = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0");
    e.currentTarget.style.setProperty("--ry", "0");
  };

  const syntaxData: Record<SyntaxKey, SyntaxItem> = {
    useState: {
      name: "useState",
      lang: "React (TypeScript)",
      shortCode: "const [num, setNum] = useState<number>(0);",
      what: "State hook that forces a re-render when state mutates.",
      how: "Call at the top level of your component to declare reactive state variables.",
      example: "const increment = () => setNum(prev => prev + 1);",
      tips: "State updates are asynchronous. Use functional updates if relying on previous state values.",
      icon: <Lightning size={18} weight="regular" />,
    },

    useRef: {
      name: "useRef",
      lang: "React (TypeScript)",
      shortCode: "const inputRef = useRef<HTMLInputElement>(null);",
      what: "Persistent reference mutable value that won't trigger re-renders.",
      how: "Pass to an element's ref attribute or use to store mutable instance variables.",
      example: "inputRef.current?.focus();",
      tips: "Never read or write .current directly during your component's rendering cycle.",
      icon: <Pulse size={18} weight="regular" />,
    },

    useEffect: {
      name: "useEffect",
      lang: "React",
      shortCode: "useEffect(() => { ... return () => {} }, [dep]);",
      what: "Declares synchronization lifecycles with systems outside of React.",
      how: "Runs code after render based on dependency shifts. Returns clean-up.",
      example:
        "const id = setInterval(tick, 1000); return () => clearInterval(id);",
      tips: "Omit dependencies to run every render. Empty array runs exactly once on mount.",
      icon: <GitBranch size={18} weight="regular" />,
    },
  };

  const order = Object.keys(syntaxData) as SyntaxKey[];
  const snippetAttr = snippetIn ? { "data-in": "" } : {};

  const selectBlock = (key: SyntaxKey) => {
    if (key === activeBlock) return;
    setSwapDir(order.indexOf(key) > order.indexOf(activeBlock) ? "up" : "down");
    setActiveBlock(key);
    setSwapCount((c) => c + 1);
  };

  return (
    <section ref={sectionRef} className={styles.sectionContainer}>
      <div className={styles.bgOrbOne} />
      <div className={styles.bgOrbTwo} />

      <span className={`${styles.decor} ${styles.d1}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d2}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d3}`} aria-hidden="true" />

      <div className={styles.headerWrapper}>
        <span
          className={`${styles.badge} ${styles.reveal} ${styles.wipe} ${styles.right}`}
          style={at(0)}
          data-reveal
        >
          <CubeTransparentIcon size={32} />
          WHAT IS IN SYNTAXLY?
        </span>

        <h2 className={styles.mainHeading} data-reveal>
          {HEADING.split(" ").map((word, i) => (
            <span key={i}>
              <span className={styles.mask}>
                <span
                  className={styles.maskIn}
                  style={{ "--w": i } as CSSProperties}
                >
                  {word}
                </span>
              </span>{" "}
            </span>
          ))}
        </h2>

        <p
          className={`${styles.subHeading} ${styles.reveal} ${styles.fade} ${styles.up}`}
          style={at(0.7)}
          data-reveal
        >
          Ditch deep documentations when you just need the boilerplate syntax.
          Built for instant recall.
        </p>
      </div>

      <div className={styles.bentoGrid}>
        <div
          className={`${styles.bentoCard} ${styles.largeCard} ${styles.reveal} ${styles.slide} ${styles.right}`}
          style={at(0.35)}
          data-reveal
          onMouseMove={trackPointer}
          onMouseLeave={resetPointer}
        >
          <div className={styles.cardGlowEffect} />

          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>
              <div className={styles.iconContainer}>
                <ClockCounterClockwise
                  size={30}
                  weight="regular"
                  className={styles.icon}
                  style={{ "--k": 12 } as CSSProperties}
                />
              </div>
              Built for Instant Recall
            </h3>

            <p className={styles.cardDescription}>
              You haven&apos;t touched React or Go for months, and your mind
              blanks on specific structures. Syntaxly removes documentation
              friction and gives only what your muscle memory needs.
            </p>

            <div className={styles.comparisonTrack}>
              <div className={styles.comparisonCol}>
                <span className={styles.comparisonLabel}>Traditional Docs</span>

                <div className={styles.docBlockBlob}>
                  <div className={styles.blobLine} />
                  <div className={styles.blobLine} style={{ width: "95%" }} />
                  <div className={styles.blobLine} style={{ width: "40%" }} />
                  <div className={styles.blobLine} style={{ width: "75%" }} />
                </div>

                <div className={styles.timer}>
                  <span className={`${styles.timerFill} ${styles.fillSlow}`} />
                </div>

                <span className={styles.bottomText}>
                  15 minute generic reading
                </span>
              </div>

              <div className={styles.comparisonCol}>
                <span
                  className={styles.comparisonLabel}
                  style={{ color: "#171717" }}
                >
                  Syntaxly Mode
                </span>

                <div
                  className={`${styles.syntaxBlockBlob} ${styles.reveal} ${styles.wipe} ${styles.right}`}
                  style={at(1)}
                  data-reveal
                >
                  <BracketsCurly size={18} weight="regular" />

                  <code className={styles.syntaxBlobCode}>
                    const [val, set] = useState(0);
                  </code>
                </div>

                <div className={styles.timer}>
                  <span className={`${styles.timerFill} ${styles.fillFast}`} />
                </div>

                <span className={styles.syntaxModeText}>
                  2 seconds reference
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.bentoCard} ${styles.smallCard} ${styles.reveal} ${styles.slide} ${styles.left}`}
          style={at(0.5)}
          data-reveal
          onMouseMove={trackPointer}
          onMouseLeave={resetPointer}
        >
          <div className={styles.cardGlowEffect} />

          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>
              Single Page Execution
              <div className={styles.iconContainer}>
                <SquaresFour
                  size={30}
                  weight="regular"
                  className={styles.icon}
                  style={{ "--k": -10 } as CSSProperties}
                />
              </div>
            </h3>

            <p className={styles.cardDescription}>
              Entire frameworks parsed into categorized modules on one
              interactive syntax canvas.
            </p>

            <div className={styles.miniCanvasView}>
              <div
                className={styles.miniBlockItem}
                style={{ "--i": 0 } as CSSProperties}
              >
                <Database size={14} />
                Variables
              </div>

              <div
                className={styles.miniBlockItem}
                style={{ "--i": 1 } as CSSProperties}
              >
                <Stack size={14} />
                Hooks
              </div>

              <div
                className={styles.miniBlockItem}
                style={{ "--i": 2 } as CSSProperties}
              >
                <Cpu size={14} />
                Async Architecture
              </div>
            </div>
          </div>
        </div>

        <div
          ref={snippetRef}
          className={`${styles.bentoCard} ${styles.fullWidthCard} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          style={at(0)}
          onMouseMove={trackPointer}
          onMouseLeave={resetPointer}
          {...snippetAttr}
        >
          <div className={styles.cardGlowEffect} />

          <div className={styles.interactivePlaygroundHeader} {...snippetAttr}>
            <div>
              <h3
                className={`${styles.cardTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
                style={{ marginTop: "4px", marginBottom: 0, ...at(0.35) }}
                {...snippetAttr}
              >
                Pure Snippet Extraction
              </h3>
            </div>
          </div>

          <div className={styles.playgroundSplitBody}>
            <div className={styles.playgroundLeftPanel}>
              <p
                className={`${styles.leftPanelText} ${styles.reveal} ${styles.fade} ${styles.right}`}
                style={at(0.5)}
                {...snippetAttr}
              >
                Click a syntax block to expand contextual parameters instantly:
              </p>

              {order.map((key, index) => {
                const isSelected = activeBlock === key;

                return (
                  <div
                    key={key}
                    onClick={() => selectBlock(key)}
                    className={`${styles.syntaxSelectBlock} ${styles.reveal} ${styles.slide} ${styles.right} ${
                      isSelected ? styles.syntaxSelectBlockActive : ""
                    } ${isSelected && swapCount > 0 ? styles.sheen : ""}`}
                    style={at(0.6 + index * 0.1, 36)}
                    {...snippetAttr}
                  >
                    <div className={styles.syntaxTop}>
                      <div className={styles.syntaxNameWrapper}>
                        <div className={styles.syntaxIcon}>
                          {syntaxData[key].icon}
                        </div>

                        <span className={styles.syntaxName}>
                          {syntaxData[key].name}
                        </span>
                      </div>

                      <span className={styles.syntaxLang}>
                        {syntaxData[key].lang}
                      </span>
                    </div>

                    <code className={styles.inlineCodePreview}>
                      {syntaxData[key].shortCode}
                    </code>
                  </div>
                );
              })}
            </div>

            <div
              className={`${styles.playgroundRightPanel} ${styles.reveal} ${styles.wipe} ${styles.left}`}
              style={at(0.7)}
              {...snippetAttr}
            >
              <div className={styles.panelBlockHeader}>
                <span className={styles.breakdownLabel}>
                  <Lightning
                    key={swapCount}
                    size={12}
                    weight="fill"
                    className={swapCount > 0 ? styles.bolt : undefined}
                  />
                  Real-time Breakdown
                </span>

                <span
                  className={`${styles.hint} ${
                    snippetIn && swapCount === 0 ? styles.hintOn : ""
                  }`}
                  aria-hidden="true"
                >
                  <ArrowLeft
                    size={12}
                    weight="bold"
                    className={styles.hintArrow}
                  />
                  click a block
                </span>
              </div>

              <div
                key={swapCount}
                className={`${styles.detailsGrid} ${
                  snippetIn ? styles.detailsSwap : ""
                } ${swapDir === "up" ? styles.swapUp : styles.swapDown}`}
                style={
                  {
                    "--base": swapCount === 0 ? "1.05s" : "0s",
                  } as CSSProperties
                }
              >
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>WHAT IT IS</div>

                  <div className={styles.detailValue}>
                    {syntaxData[activeBlock].what}
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>HOW IT IS USED</div>

                  <div className={styles.detailValue}>
                    {syntaxData[activeBlock].how}
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>CODE EXAMPLE</div>

                  <div className={styles.codeOutputContainer}>
                    <Terminal size={14} weight="bold" />

                    <code className={styles.codeExample}>
                      {syntaxData[activeBlock].example}
                    </code>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>PRO TIPS</div>

                  <div className={styles.detailValue}>
                    {syntaxData[activeBlock].tips}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}