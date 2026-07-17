import type { CSSProperties } from "react"

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

// Base pulsing placeholder block — size/shape is driven entirely by the
// className passed in (e.g. "h-4 w-32 rounded-md", "w-12 h-12 rounded-full").
const Skeleton = ({ className = "", style }: SkeletonProps) => {
  return <div className={`animate-pulse bg-white/10 rounded-md ${className}`} style={style} />
}

export default Skeleton
