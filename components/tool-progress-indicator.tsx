"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface ToolProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export function ToolProgressIndicator({
  currentStep,
  totalSteps,
  labels = ["Upload", "Configure", "Process", "Download"],
}: ToolProgressIndicatorProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const percentage = (currentStep / totalSteps) * 100
    setProgress(percentage)
  }, [currentStep, totalSteps])

  return (
    <div className="w-full space-y-2 mb-8">
      <Progress value={progress} className="h-2 bg-gray-100" />
      <div className="flex justify-between">
        {labels.slice(0, totalSteps).map((label, index) => (
          <div
            key={index}
            className={`text-xs font-medium flex flex-col items-center ${
              index < currentStep ? "text-[#6366F1]" : index === currentStep ? "text-[#6366F1]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full mb-1 ${
                index < currentStep
                  ? "bg-[#6366F1]"
                  : index === currentStep
                    ? "bg-gradient-to-r from-[#6366F1] to-[#EC4899]"
                    : "bg-gray-200"
              }`}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
