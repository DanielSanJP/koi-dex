"use client";

import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

type ButtonProps = {
  text: string;
  onPressed?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: ButtonVariant;
  textColor?: string;
  backgroundColor?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  compact?: boolean;
  enabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
};

const APP_BACKGROUND = "var(--background, #F7F6F9)";
const APP_TEXT = "var(--text, #313131)";
const DISABLED_BG = "#D5D5D5";
const DISABLED_FG = "#AAAAAA";
const DEFAULT_FONT_SIZE = "clamp(15px, 3.8vw, 20px)";
const COMPACT_FONT_SIZE = "clamp(13px, 3vw, 15px)";

function getShadowColor(variant: ButtonVariant): string | null {
  switch (variant) {
    case "primary":
      return "#49AD6D";
    case "secondary":
      return "#5F5F5F";
    case "outline":
      return "#C1C1C1";
    case "ghost":
      return null;
    case "destructive":
      return "#AD4949";
    default:
      return null;
  }
}

function getBorder(variant: ButtonVariant): string {
  return variant === "outline" ? "2px solid #C1C1C1" : "none";
}

export default function Button({
  text,
  onPressed,
  href,
  target,
  rel,
  variant = "primary",
  textColor,
  backgroundColor,
  leading,
  trailing,
  compact = false,
  enabled = true,
  fullWidth = false,
  className,
  style,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isEnabled = enabled;

  const resolvedBackground = useMemo(() => {
    if (variant === "ghost") {
      const base = backgroundColor ?? APP_BACKGROUND;
      return isPressed ? "#E0E0E0" : base;
    }

    if (backgroundColor) {
      return backgroundColor;
    }

    switch (variant) {
      case "primary":
        return "#66DD93";
      case "secondary":
        return "#AEAEAE";
      case "outline":
        return "#FFFFFF";
      case "destructive":
        return "#DD6666";
      default:
        return "#66DD93";
    }
  }, [backgroundColor, isPressed, variant]);

  const resolvedTextColor = useMemo(() => {
    if (textColor) {
      return textColor;
    }

    switch (variant) {
      case "outline":
      case "ghost":
        return APP_TEXT;
      default:
        return "#FFFFFF";
    }
  }, [textColor, variant]);

  const shadowColor = getShadowColor(variant);
  const yOffset = compact ? 2 : 4;
  const iconAndTextColor = isEnabled ? resolvedTextColor : DISABLED_FG;

  const sharedStyle: CSSProperties = {
    display: "inline-flex",
    width: fullWidth ? "100%" : "fit-content",
    maxWidth: "100%",
    height: compact ? 36 : 56,
    padding: compact ? "0 14px" : "0 clamp(16px, 4vw, 24px)",
    alignItems: "center",
    justifyContent: "center",
    border: getBorder(variant),
    borderRadius: compact ? 8 : 12,
    backgroundColor: isEnabled ? resolvedBackground : DISABLED_BG,
    boxShadow:
      isPressed || shadowColor === null
        ? "none"
        : `0 ${yOffset}px 0 0 ${isEnabled ? shadowColor : DISABLED_FG}`,
    transform:
      variant === "ghost"
        ? undefined
        : `translateY(${isPressed ? yOffset : 0}px)`,
    transitionDuration: "50ms",
    transitionProperty: "all",
    transitionTimingFunction: "linear",
    cursor: isEnabled ? "pointer" : "not-allowed",
    userSelect: "none",
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    ...style,
  };

  const content = (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {leading ? (
        <>
          <span
            style={{ display: "inline-flex", color: iconAndTextColor, lineHeight: 0 }}
          >
            {leading}
          </span>
          <span style={{ width: 6 }} />
        </>
      ) : null}
      <span
        style={{
          fontSize: compact ? COMPACT_FONT_SIZE : DEFAULT_FONT_SIZE,
          fontWeight: 700,
          color: iconAndTextColor,
          lineHeight: 1.1,
          textAlign: "center",
        }}
      >
        {text}
      </span>
      {trailing ? (
        <>
          <span style={{ width: 6 }} />
          <span
            style={{ display: "inline-flex", color: iconAndTextColor, lineHeight: 0 }}
          >
            {trailing}
          </span>
        </>
      ) : null}
    </span>
  );

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!isEnabled) {
      event.preventDefault();
      return;
    }
    setIsPressed(true);
  };

  const handlePointerUp = () => setIsPressed(false);
  const handlePointerCancel = () => setIsPressed(false);
  const handlePointerLeave = () => setIsPressed(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isEnabled) {
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      setIsPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === " " || event.key === "Enter") {
      setIsPressed(false);
    }
  };

  if (href && href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={className}
        style={sharedStyle}
        aria-disabled={!isEnabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={(event) => {
          if (!isEnabled) {
            event.preventDefault();
            return;
          }
          onPressed?.();
        }}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={sharedStyle}
        aria-disabled={!isEnabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={(event) => {
          if (!isEnabled) {
            event.preventDefault();
            return;
          }
          onPressed?.();
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={sharedStyle}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onClick={() => {
        if (isEnabled) {
          onPressed?.();
        }
      }}
      disabled={!isEnabled}
    >
      {content}
    </button>
  );
}
