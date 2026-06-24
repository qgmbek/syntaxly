"use client";

import { Fragment } from "react/jsx-runtime";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ["Ctrl", "K"], desc: "Open Search / Command Palette" },
    { keys: ["Ctrl", "U"], desc: "Toggle TypeScript / Unique Syntax view" },
    { keys: ["+"], desc: "Increase application font size" },
    { keys: ["-"], desc: "Decrease application font size" },
    { keys: ["↑", "↓"], desc: "Navigate blocks up and down" },
    { keys: ["←", "→"], desc: "Navigate columns left and right" },
    { keys: ["Esc"], desc: "Close overlays, menus, or clear selections" },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#1e1e1e",
          color: "#f5f5f5",
          borderRadius: "12px",
          width: "480px",
          maxWidth: "90vw",
          padding: "24px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
          border: "1px solid #333",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.5px",
            }}
          >
            Keyboard Shortcuts
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {shortcuts.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "10px",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              <span style={{ fontSize: "14px", color: "#b3b3b3" }}>
                {item.desc}
              </span>
              <div
                style={{ display: "flex", gap: "4px", alignItems: "center" }}
              >
                {item.keys.map((key, kIdx) => (
                  <Fragment key={kIdx}>
                    <kbd
                      style={{
                        backgroundColor: "#2d2d2d",
                        border: "1px solid #444",
                        borderRadius: "4px",
                        padding: "3px 6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        fontFamily: "monospace",
                        color: "#fff",
                        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                      }}
                    >
                      {key}
                    </kbd>
                    {kIdx < item.keys.length - 1 && (
                      <span style={{ fontSize: "11px", color: "#666" }}>+</span>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "24px",
            width: "100%",
            backgroundColor: "#860088",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333")}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
