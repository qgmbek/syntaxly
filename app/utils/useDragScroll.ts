import { useRef, useCallback } from "react";

export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    scrollLeft.current = el.scrollLeft;
    scrollTop.current = el.scrollTop;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    ref.current.scrollLeft = scrollLeft.current - dx;
    ref.current.scrollTop = scrollTop.current - dy;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (!ref.current) return;
    ref.current.style.cursor = "grab";
    ref.current.style.userSelect = "";
  }, []);

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    if (!ref.current) return;
    ref.current.style.cursor = "grab";
    ref.current.style.userSelect = "";
  }, []);

  return { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave };
}
