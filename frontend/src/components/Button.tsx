import { ReactElement } from "react"

interface ButtonProps {
    variant : "primary" | "secondary",
    text : String,
    startIcon? : ReactElement,
    onClick? : () => void 
}
const variantClasses = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-600"
} 
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"
export default function Button({variant, text, startIcon, onClick} : ButtonProps) {
  return (
    <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles}>
        {startIcon}
        <div className="px-1"></div>
        {text}
    </button>
  )
}
