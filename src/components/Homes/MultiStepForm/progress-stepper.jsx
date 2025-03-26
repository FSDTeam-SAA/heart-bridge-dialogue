import React from "react"

export default function ProgressStepper({ steps, currentStep = 1 }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    isActive ? "bg-rose-500 text-white" : "bg-rose-200 text-gray-700"
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-sm font-medium text-gray-600">{step.label}</span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && <div className="flex-1 h-[1px] mx-2 bg-rose-200" aria-hidden="true"></div>}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

