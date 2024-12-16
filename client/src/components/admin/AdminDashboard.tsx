import React, { useState } from 'react';
import { PlusCircle, PlayCircle, StopCircle, Users, BarChart3, Settings, Vote } from 'lucide-react';
import { AdminCandidateForm } from './AdminCandidateForm';
import { AdminCandidateList } from './AdminCandidateList';
import { AdminResults } from './AdminResults';
import { AdminVotingForm } from './AdminVotingForm';

interface Candidate {
  id: number;
  name: string;
  votes: number;
  imageUrl: string;
}

interface VotingSession {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'ended';
}

export function AdminDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showVotingForm, setShowVotingForm] = useState(false);
  const [votingActive, setVotingActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'voting' | 'candidates' | 'results' | 'settings'>('voting');

  const handleStartVoting = () => {
    setVotingActive(true);
  };

  const handleStopVoting = () => {
    setVotingActive(false);
  };

  const stats = [
    { label: 'إجمالي المصوتين', value: '396', icon: Users },
    { label: 'نسبة المشاركة', value: '78.5%', icon: BarChart3 },
    { label: 'حالة التصويت', value: votingActive ? 'جارٍ' : 'متوقف', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            {!votingActive ? (
              <button
                onClick={handleStartVoting}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                <span>بدء التصويت</span>
              </button>
            ) : (
              <button
                onClick={handleStopVoting}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <StopCircle className="w-5 h-5" />
                <span>إيقاف التصويت</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="bg-blue-50 rounded-full p-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Tabs */}
          <div className="border-b border-gray-100">
            <div className="flex space-x-8 rtl:space-x-reverse px-6">
              <button
                onClick={() => setActiveTab('voting')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'voting'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                التصويتات
              </button>
              <button
                onClick={() => setActiveTab('candidates')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'candidates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                المرشحون
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'results'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                النتائج
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                الإعدادات
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'voting' && (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">التصويتات الحالية</h2>
                  <button
                    onClick={() => setShowVotingForm(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>إنشاء تصويت جديد</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {/* قائمة التصويتات */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Vote className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-lg">انتخابات مجلس الإدارة 2024</h3>
                          <p className="text-gray-600 text-sm">يبدأ في: 2024/03/15 - ينتهي في: 2024/03/20</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">نشط</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'candidates' && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>إضافة مرشح جديد</span>
                  </button>
                </div>
                <AdminCandidateList />
              </div>
            )}
            {activeTab === 'results' && <AdminResults />}
            {activeTab === 'settings' && (
              <div className="text-center py-12 text-gray-500">
                <Settings className="w-12 h-12 mx-auto mb-4" />
                <p>إعدادات النظام قيد التطوير</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <AdminCandidateForm
          onClose={() => setShowAddForm(false)}
          onSubmit={(candidate) => {
            console.log('New candidate:', candidate);
            setShowAddForm(false);
          }}
        />
      )}

      {showVotingForm && (
        <AdminVotingForm
          onClose={() => setShowVotingForm(false)}
          onSubmit={(votingData) => {
            console.log('New voting session:', votingData);
            setShowVotingForm(false);
          }}
        />
      )}
    </div>
  );
}