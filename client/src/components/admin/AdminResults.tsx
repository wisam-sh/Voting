import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

export function AdminResults() {
  const results = [
    {
      id: 1,
      name: "أحمد محمد",
      votes: 156,
      percentage: 39.4,
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 2,
      name: "سارة عبدالله",
      votes: 142,
      percentage: 35.9,
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 3,
      name: "محمد علي",
      votes: 98,
      percentage: 24.7,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500"
    }
  ];

  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">نتائج التصويت النهائية</h2>
      <div className="space-y-4">
        {results.sort((a, b) => b.votes - a.votes).map((result, index) => (
          <div
            key={result.id}
            className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {getPositionIcon(index)}
              <img
                src={result.imageUrl}
                alt={result.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{result.name}</h3>
                <p className="text-sm text-gray-600">{result.votes} صوت</p>
              </div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-blue-600">
                {result.percentage}%
              </div>
              <div className="text-sm text-gray-500">نسبة الأصوات</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}