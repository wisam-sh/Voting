import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface AdminCandidateFormProps {
  onClose: () => void;
  onSubmit: (candidate: { name: string; imageUrl: string }) => void;
}

export function AdminCandidateForm({ onClose, onSubmit }: AdminCandidateFormProps) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) return;
    onSubmit({ name, imageUrl });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">إضافة مرشح جديد</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              اسم المرشح
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              صورة المرشح
            </label>
            <ImageUploader onImageUploaded={(url) => {
                console.log('تم رفع الصورة:', url);
                // التعامل مع رابط الصورة هنا
            }} />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={!name || !imageUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              إضافة المرشح
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}