"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isClickable)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <>
      <div
        className={cn(
          "fixed pointer-events-none z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out",
          isPointer ? "scale-150 bg-primary/20" : "bg-primary/10",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backdropFilter: "blur(8px)",
        }}
      />
      <div
        className={cn(
          "fixed pointer-events-none z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}
