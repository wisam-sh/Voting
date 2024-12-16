import React, { useState } from 'react';

interface ImageUploaderProps {
    onImageUploaded: (imageUrl: string) => void;
}

export function ImageUploader({ onImageUploaded }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const IMGBB_API_KEY = 'c81c4ec85af87eab544228fc0392606e';

    const uploadImage = async (file: File) => {
        try {
            setUploading(true);
            setError(null);

            const base64 = await convertToBase64(file);
            
            const formData = new FormData();
            formData.append('image', base64.split(',')[1]);
            formData.append('key', IMGBB_API_KEY);

            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setImageUrl(data.data.url);
                onImageUploaded(data.data.url);
            } else {
                setError('فشل في رفع الصورة: ' + data.error?.message);
            }

        } catch (err) {
            setError('فشل في رفع الصورة');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('الرجاء اختيار ملف صورة صالح');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('حجم الصورة يجب أن يكون أقل من 2 ميجابايت');
            return;
        }

        await uploadImage(file);
    };

    return (
        <div className="space-y-4">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />
                <div className="space-y-2">
                    <div className="text-gray-600">
                        {uploading ? 'جاري رفع الصورة...' : 'اضغط أو اسحب الصورة هنا'}
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}

            {imageUrl && (
                <div className="mt-4">
                    <img 
                        src={imageUrl} 
                        alt="الصورة المرفوعة" 
                        className="max-w-md rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}