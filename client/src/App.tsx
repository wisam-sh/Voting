import React, { useState } from 'react';
import { Header } from './components/user/Header';
import { VotingCard } from './components/user/VotingCard';
import { Shield } from 'lucide-react';
import { AdminDashboard } from './components/admin/AdminDashboard';
import Chat from './components/user/Chat';

const initialCandidates = [
  {
    id: 1,
    name: "أحمد محمد",
    votes: 156,
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 2,
    name: "سارة عبدالله",
    votes: 142,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 3,
    name: "محمد علي",
    votes: 98,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500"
  }
];

function App() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [votedFor, setVotedFor] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Secret admin route - normally this would be handled by proper authentication
  React.useEffect(() => {
    const checkAdmin = () => {
      const path = window.location.pathname;
      setIsAdmin(path === '/admin');
    };
    checkAdmin();
    window.addEventListener('popstate', checkAdmin);
    return () => window.removeEventListener('popstate', checkAdmin);
  }, []);

  const handleVote = (id: number) => {
    if (votedFor === null) {
      setCandidates(candidates.map(candidate =>
        candidate.id === id
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      ));
      setVotedFor(id);
    }
  };

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">نظام التصويت الآمن بتقنية البلوكتشين</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نظام تصويت إلكتروني آمن وشفاف يستخدم تقنية البلوكتشين لضمان نزاهة العملية الانتخابية
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 text-blue-700">
            <Shield className="w-5 h-5" />
            <span className="font-medium">تم تأمين هذا التصويت باستخدام تقنية البلوكتشين</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <VotingCard
              key={candidate.id}
              candidate={candidate}
              onVote={handleVote}
              hasVoted={votedFor !== null}
            />
          ))}
        </div>

        {votedFor && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-lg">
              تم تسجيل صوتك بنجاح! رقم المعاملة على البلوكتشين:
              <code className="ml-2 font-mono">0x{Math.random().toString(16).slice(2, 10)}</code>
            </div>
          </div>
        )}
        <Chat/>
      </main>
    </div>
  );
}

export default App;