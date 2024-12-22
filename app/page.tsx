// src/pages/index.tsx
import EmailForm from '../components/EmailForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-green-300 py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
        <div className=" overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-green-200 border-b border-gray-200">
            <h1 className="text-5xl font-bold bg-green-900 text-white text-center mb-8">Email Assistant Chatbot</h1>
            <EmailForm />
          </div>
        </div>
      </div>
    </div>
  );
}

