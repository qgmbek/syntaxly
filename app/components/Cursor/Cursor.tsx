"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState("idle");
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        "[data-cursor], button, a, code, pre, input, textarea",
      );

      if (!target) {
        setCursorState("idle");
        setLabelText("");
        return;
      }

      const attr = target.getAttribute("data-cursor");
      const customText = target.getAttribute("data-cursor-text");

      if (customText) {
        setLabelText(customText);
      } else {
        setLabelText("");
      }

      if (attr === "copy") {
        setCursorState("copy");
      } else if (
        attr === "code" ||
        target.tagName === "CODE" ||
        target.tagName === "PRE"
      ) {
        setCursorState("code");
      } else if (
        attr === "hover" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      ) {
        setCursorState("hover");
      }
    };

    const handleClick = (e) => {
      const copyTarget = e.target.closest('[data-cursor="copy"]');
      if (copyTarget) {
        setCursorState("copied");
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => {
          setCursorState("idle");
        }, 1300);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      const ease = 0.18;
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      vel.current.x = dx * ease;
      vel.current.y = dy * ease;

      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      const stretch = Math.min(speed * 0.012, 0.35);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.6;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0px) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0px) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  if (!isVisible) return null;

  const getCursorStyles = () => {
    switch (cursorState) {
      case "hover":
        return {
          width: "54px",
          height: "54px",
          backgroundColor: "rgba(59, 130, 246, 0.12)",
          borderColor: "rgba(96, 165, 250, 0.8)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
        };
      case "code":
        return {
          width: "64px",
          height: "44px",
          borderRadius: "8px",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          borderColor: "#06B6D4",
          boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
        };
      case "copy":
        return {
          width: "48px",
          height: "48px",
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "#10B981",
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.35)",
        };
      case "copied":
        return {
          width: "100px",
          height: "36px",
          borderRadius: "20px",
          backgroundColor: "#10B981",
          borderColor: "#34D399",
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.6)",
        };
      default:
        return {
          width: "36px",
          height: "36px",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderColor: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 0 0px rgba(0,0,0,0)",
        };
    }
  };

  const currentStyle = getCursorStyles();

  return (
    <>
      <style>{`
        body, button, a, code, pre, input, textarea {
          cursor: none !important;
        }
        
        @keyframes cursorPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.25); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes copyPop {
          0% { transform: translate(-50%, -50%) scale(0.8); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          borderRadius:
            cursorState === "code"
              ? "8px"
              : cursorState === "copied"
                ? "20px"
                : "50%",
          borderWidth: "1px",
          borderStyle: "solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, border-radius 0.25s ease",
          backdropFilter: "blur(2px)",
          transformOrigin: "center center",
          willChange: "transform, width, height",
          scale: isMouseDown ? "0.85" : "1",
          animation:
            cursorState === "copied"
              ? "copyPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              : "none",
          ...currentStyle,
        }}
      >
        {cursorState === "code" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "0 8px",
              fontFamily: "monospace",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#06B6D4",
              userSelect: "none",
            }}
          >
            <span>&#123;</span>
            <div
              style={{
                width: "2px",
                height: "12px",
                backgroundColor: "#06B6D4",
                animation: "cursorPulse 0.8s infinite ease-in-out",
              }}
            />
            <span>&#125;</span>
          </div>
        )}

        {cursorState === "copied" && (
          <span
            style={{
              color: "#000000",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            COPIED!
          </span>
        )}

        {labelText && cursorState !== "copied" && cursorState !== "code" && (
          <span
            style={{
              color: "#60A5FA",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "9px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {labelText}
          </span>
        )}
      </div>

      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 100000,
          width:
            cursorState === "hover"
              ? "8px"
              : cursorState === "code"
                ? "0px"
                : cursorState === "copied"
                  ? "0px"
                  : "5px",
          height:
            cursorState === "hover"
              ? "8px"
              : cursorState === "code"
                ? "0px"
                : cursorState === "copied"
                  ? "0px"
                  : "5px",
          borderRadius: "50%",
          backgroundColor:
            cursorState === "copy"
              ? "#10B981"
              : cursorState === "hover"
                ? "#60A5FA"
                : "#FFFFFF",
          boxShadow:
            cursorState === "hover"
              ? "0 0 8px #60A5FA"
              : "0 0 6px rgba(255, 255, 255, 0.8)",
          transition:
            "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
          opacity: cursorState === "code" || cursorState === "copied" ? 0 : 1,
          willChange: "transform",
        }}
      />
    </>
  );
}
