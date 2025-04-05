import React from 'react'
 
const SuggestedQuestions = ({ onSelectQuestion, disabled = false }) => {
  const questions = [
    'How can we improve our communication?',
    'What are our relationship strengths?',
    'How to handle conflicts better?',
    'Tips for our attachment styles',
    'How to express love better?',
    'Ways to build trust',
  ]

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Try asking:</h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelectQuestion(question)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            disabled={disabled}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestedQuestions
