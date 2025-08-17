"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function PageAnimation({ children, className, delay = 0 }: PageAnimationProps) {
  return (
    <div 
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 duration-700",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "both" 
      }}
    >
      {children}
    </div>
  )
}

export function StaggeredAnimation({ 
  children, 
  className,
  staggerDelay = 100 
}: { 
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}) {
  return (
    <>
      {children.map((child, index) => (
        <PageAnimation 
          key={index}
          className={className}
          delay={index * staggerDelay}
        >
          {child}
        </PageAnimation>
      ))}
    </>
  )
}

export function SlideInFromLeft({ 
  children, 
  className, 
  delay = 0 
}: PageAnimationProps) {
  return (
    <div 
      className={cn(
        "animate-in fade-in slide-in-from-left-4 duration-700",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "both" 
      }}
    >
      {children}
    </div>
  )
}

export function SlideInFromRight({ 
  children, 
  className, 
  delay = 0 
}: PageAnimationProps) {
  return (
    <div 
      className={cn(
        "animate-in fade-in slide-in-from-right-4 duration-700",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "both" 
      }}
    >
      {children}
    </div>
  )
}

export function SlideInFromTop({ 
  children, 
  className, 
  delay = 0 
}: PageAnimationProps) {
  return (
    <div 
      className={cn(
        "animate-in fade-in slide-in-from-top-4 duration-700",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "both" 
      }}
    >
      {children}
    </div>
  )
}

export function ScaleIn({ 
  children, 
  className, 
  delay = 0 
}: PageAnimationProps) {
  return (
    <div 
      className={cn(
        "animate-in fade-in zoom-in-95 duration-700",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "both" 
      }}
    >
      {children}
    </div>
  )
}