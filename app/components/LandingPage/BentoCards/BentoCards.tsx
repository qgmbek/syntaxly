"use client";

import { useState, MouseEvent } from "react";
import {
  ClockCounterClockwise,
  SquaresFour,
  Lightning,
  BracketsCurly,
  Terminal,
  Cube,
  Database,
  Pulse,
  GitBranch,
  FileCode,
  Sparkle,
  Stack,
  Command,
  Cpu,
} from "@phosphor-icons/react";

import styles from "./BentoCards.module.css";

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

export default function BentoCards() {
  const [activeBlock, setActiveBlock] = useState<SyntaxKey>("useState");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePosition({ x, y });
  };

  const resetMouseMove = () => {
    setMousePosition({ x: 0, y: 0 });
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
      icon: <Lightning size={18} weight="fill" />,
    },

    useRef: {
      name: "useRef",
      lang: "React (TypeScript)",
      shortCode: "const inputRef = useRef<HTMLInputElement>(null);",
      what: "Persistent reference mutable value that won't trigger re-renders.",
      how: "Pass to an element's ref attribute or use to store mutable instance variables.",
      example: "inputRef.current?.focus();",
      tips: "Never read or write .current directly during your component's rendering cycle.",
      icon: <Pulse size={18} weight="duotone" />,
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
      icon: <GitBranch size={18} weight="duotone" />,
    },
  };

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.bgOrbOne} />
      <div className={styles.bgOrbTwo} />

      <div className={styles.headerWrapper}>
        <span className={styles.badge}>
          <Sparkle size={14} weight="fill" />
          WHAT&apos;S IN SYNTAXLY?
        </span>

        <h2 className={styles.mainHeading}>
          Everything you need to recall on the fly.
        </h2>

        <p className={styles.subHeading}>
          Ditch deep documentations when you just need the boilerplate syntax.
          Built for instant recall.
        </p>
      </div>

      <div className={styles.bentoGrid}>
        <div
          className={`${styles.bentoCard} ${styles.largeCard} ${
            hoveredCard === 1 ? styles.cardActive : ""
          }`}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => {
            setHoveredCard(null);
            resetMouseMove();
          }}
          onMouseMove={(e) => handleMouseMove(e, 1)}
        >
          <div
            className={`${styles.cardGlowEffect} ${
              hoveredCard === 1 ? styles.cardGlowVisible : ""
            }`}
          />

          <div className={styles.cardNoise} />

          <div className={styles.cardContent}>
            <div className={styles.cardTopRow}>
              <div className={styles.iconContainer}>
                <ClockCounterClockwise
                  size={30}
                  weight="duotone"
                  className={styles.icon}
                  style={{
                    transform:
                      hoveredCard === 1
                        ? `translate(${mousePosition.x * 12}px, ${
                            mousePosition.y * 12
                          }px)`
                        : "none",
                  }}
                />
              </div>

              <div className={styles.livePill}>
                <Pulse size={12} weight="fill" />
                Instant
              </div>
            </div>

            <h3 className={styles.cardTitle}>Built for Instant Recall</h3>

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

                <div className={styles.syntaxBlockBlob}>
                  <BracketsCurly size={18} weight="bold" />

                  <code className={styles.syntaxBlobCode}>
                    const [val, set] = useState(0);
                  </code>
                </div>

                <span className={styles.syntaxModeText}>
                  2 seconds reference
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.bentoCard} ${styles.smallCard} ${
            hoveredCard === 2 ? styles.cardActive : ""
          }`}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => {
            setHoveredCard(null);
            resetMouseMove();
          }}
          onMouseMove={(e) => handleMouseMove(e, 2)}
        >
          <div
            className={`${styles.cardGlowEffect} ${
              hoveredCard === 2 ? styles.cardGlowVisible : ""
            }`}
          />

          <div className={styles.cardNoise} />

          <div className={styles.cardContent}>
            <div className={styles.cardTopRow}>
              <div className={styles.iconContainer}>
                <SquaresFour
                  size={30}
                  weight="duotone"
                  className={styles.icon}
                  style={{
                    transform:
                      hoveredCard === 2
                        ? `translate(${mousePosition.x * -10}px, ${
                            mousePosition.y * -10
                          }px)`
                        : "none",
                  }}
                />
              </div>

              <div className={styles.livePill}>
                <Cube size={12} weight="fill" />
                Modular
              </div>
            </div>

            <h3 className={styles.cardTitle}>Single Page Execution</h3>

            <p className={styles.cardDescription}>
              Entire frameworks parsed into categorized modules on one
              interactive syntax canvas.
            </p>

            <div className={styles.miniCanvasView}>
              <div className={styles.miniBlockItem}>
                <Database size={14} />
                Variables
              </div>

              <div className={styles.miniBlockItem} style={{ opacity: 0.7 }}>
                <Stack size={14} />
                Hooks
              </div>

              <div className={styles.miniBlockItem} style={{ opacity: 0.5 }}>
                <Cpu size={14} />
                Async Architecture
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.bentoCard} ${styles.fullWidthCard}`}>
          <div className={styles.cardNoise} />

          <div className={styles.interactivePlaygroundHeader}>
            <div>
              <span className={styles.previewLabel}>
                <Command size={12} weight="bold" />
                Live Engine Preview
              </span>

              <h3
                className={styles.cardTitle}
                style={{ marginTop: "4px", marginBottom: 0 }}
              >
                Pure Snippet Extraction
              </h3>
            </div>

            <div className={styles.onViewIndicator}>
              <span className={styles.pulseDot} />
              Interactive Component
            </div>
          </div>

          <div className={styles.playgroundSplitBody}>
            <div className={styles.playgroundLeftPanel}>
              <p className={styles.leftPanelText}>
                Click a syntax block to expand contextual parameters instantly:
              </p>

              {Object.keys(syntaxData).map((key) => {
                const typedKey = key as SyntaxKey;
                const isSelected = activeBlock === typedKey;

                return (
                  <div
                    key={typedKey}
                    onClick={() => setActiveBlock(typedKey)}
                    className={`${styles.syntaxSelectBlock} ${
                      isSelected ? styles.syntaxSelectBlockActive : ""
                    }`}
                  >
                    <div className={styles.syntaxTop}>
                      <div className={styles.syntaxNameWrapper}>
                        <div className={styles.syntaxIcon}>
                          {syntaxData[typedKey].icon}
                        </div>

                        <span
                          className={`${styles.syntaxName} ${
                            isSelected ? styles.syntaxNameActive : ""
                          }`}
                        >
                          {syntaxData[typedKey].name}
                        </span>
                      </div>

                      <span
                        className={`${styles.syntaxLang} ${
                          isSelected ? styles.syntaxLangActive : ""
                        }`}
                      >
                        {syntaxData[typedKey].lang}
                      </span>
                    </div>

                    <code
                      className={`${styles.inlineCodePreview} ${
                        isSelected ? styles.inlineCodePreviewActive : ""
                      }`}
                    >
                      {syntaxData[typedKey].shortCode}
                    </code>
                  </div>
                );
              })}
            </div>

            <div className={styles.playgroundRightPanel}>
              <div className={styles.panelBlockHeader}>
                <span className={styles.breakdownLabel}>
                  <Lightning size={12} weight="fill" />
                  Real-time Breakdown
                </span>

                <span className={styles.fileName}>
                  <FileCode size={12} />
                  {syntaxData[activeBlock].name}.json
                </span>
              </div>

              <div className={styles.detailsGrid}>
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

                  <div
                    className={styles.detailValue}
                    style={{ color: "#fbbf24" }}
                  >
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
