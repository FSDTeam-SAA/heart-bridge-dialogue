import { formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'

const MessageBubble = ({ message, isOwnMessage }) => {
  const formattedTime = message.timestamp
    ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
    : 'just now'

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85%] p-4 rounded-lg ${
          isOwnMessage
            ? 'bg-pink-100 text-pink-900'
            : 'bg-white border border-gray-200'
        }`}
      >
        {message.isAi ? (
          <div className="markdown-container">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold mt-4 mb-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-lg font-semibold mt-3 mb-1.5"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p className="my-2 leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-5 my-2 space-y-1" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-600 hover:underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  if (inline) {
                    return (
                      <code
                        className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-pink-700"
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  }
                  return (
                    <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto my-3">
                      <code
                        className={`${className} font-mono text-sm`}
                        {...props}
                      >
                        {children}
                      </code>
                    </pre>
                  )
                },
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-3">
                    <table className="min-w-full border-collapse" {...props} />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="border px-4 py-2 text-left bg-gray-50 font-semibold"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="border px-4 py-2" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-300 pl-4 italic my-3 text-gray-600"
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => (
                  <hr className="my-4 border-gray-200" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img
                    className="my-3 rounded-md max-w-full h-auto"
                    {...props}
                  />
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm sm:text-base whitespace-pre-wrap">
            {message.text}
          </p>
        )}

        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">{formattedTime}</p>
          {!isOwnMessage && (
            <p className="text-xs text-gray-500 ml-2">Relationship AI</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
