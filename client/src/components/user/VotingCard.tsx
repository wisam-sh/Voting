//import React from 'react';
import { Shield, User, CheckCircle } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  votes: number;
  imageUrl: string;
}

interface VotingCardProps {
  candidate: Candidate;
  onVote: (id: number) => void;
  hasVoted: boolean;
}

export function VotingCard({ candidate, onVote, hasVoted }: VotingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="relative">
        <img 
          src={candidate.imageUrl} 
          alt={candidate.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        {hasVoted && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{candidate.name}</h3>
      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <User className="w-4 h-4" />
        <span>{candidate.votes} votes</span>
      </div>
      <button
        onClick={() => onVote(candidate.id)}
        disabled={hasVoted}
        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
          hasVoted
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <Shield className="w-4 h-4" />
        {hasVoted ? 'Already Voted' : 'Vote Now'}
      </button>
    </div>
  );
}