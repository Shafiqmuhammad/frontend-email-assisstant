// 'use client'
// // src/components/EmailForm.tsx
// import { useState } from 'react';
// import { EmailAnalysis } from '../types/email';

// export default function EmailForm() {
//     const [context, setContext] = useState('');
//     const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/example-drafts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'ngrok-skip-browser-warning': 'true',
//                 },
//                 body: JSON.stringify({ context }),
//             });

//             const data = await response.json();
//             setAnalysis(data);
//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="context" className="block text-sm font-medium text-gray-700">
//                         Email Context
//                     </label>
//                     <textarea
//                         id="context"
//                         value={context}
//                         onChange={(e) => setContext(e.target.value)}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                         rows={4}
//                         placeholder="Enter the context for your email..."
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                     {loading ? 'Generating...' : 'Generate Email Draft'}
//                 </button>
//             </form>

//             {analysis && (
//                 <div className="mt-8 space-y-6">
//                     <div>
//                         <h3 className="text-lg font-medium text-gray-900">Generated Draft</h3>
//                         <div className="mt-2 whitespace-pre-wrap rounded-md bg-gray-50 p-4">
//                             {analysis?.draft_content}
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="text-lg font-medium text-gray-900">Research Insights</h3>
//                         <ul className="mt-2 space-y-2">
//                             {/* examples[0].analysis.research_insights */}
//                             {analysis?.research_insights?.map((insight, index) => (
//                                 <li key={index} className="rounded-md bg-gray-50 p-4">
//                                     <a href={insight.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">
//                                         {insight.title}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

'use client'

import { useState } from 'react';

const EmailForm = () => {
    const [context, setContext] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!context.trim()) {
            setError('Please enter an email context');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/example-drafts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({ context }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate email draft');
            }

            const data = await response.json();
            setAnalysis(data);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Email Assistant</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="context" className="block text-sm font-medium text-gray-700">
                            Email Context
                        </label>
                        <textarea
                            id="context"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[120px]"
                            placeholder="Example: Write a follow-up email after a job interview"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Generating...
                            </>
                        ) : (
                            'Generate Email Draft'
                        )}
                    </button>
                </form>
            </div>

            {analysis && (
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Generated Draft</h3>
                        <div className="whitespace-pre-wrap rounded-md bg-gray-50 p-4 border border-gray-200">
                            {analysis.examples[0].analysis?.draft_content}
                        </div>
                    </div>

                    {analysis.examples[0].analysis?.research_insights?.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Helpful Resources</h3>
                            <ul className="space-y-2">
                                {analysis.examples[0].analysis.research_insights.map((insight, index) => (
                                    <li key={index} className="rounded-md bg-gray-50 p-4 border border-gray-200">
                                        <a
                                            href={insight.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-500 flex justify-between items-center"
                                        >
                                            <span>{insight.title}</span>
                                            <span className="text-sm text-gray-500">
                                                Relevance: {(insight.relevance_score * 100).toFixed(0)}%
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EmailForm;