import React from 'react';
import { Trash2, User } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  votes: number;
  imageUrl: string;
}

export function AdminCandidateList() {
  const candidates = [
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

  const handleDelete = (id: number) => {
    console.log('Delete candidate:', id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              المرشح
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              عدد الأصوات
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              إجراءات
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={candidate.imageUrl}
                    alt={candidate.name}
                  />
                  <div className="mr-4">
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 ml-2" />
                  {candidate.votes}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(candidate.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}