import { useState } from 'react';
// import { getChatResponse } from '../api/chat';

function Chat ()  {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false); // حالة لفتح/إغلاق الدردشة

    const handleSendMessage = async () => {
        if (!message) return;

        // إضافة الرسالة إلى قائمة الردود
        setResponses((prev) => [...prev, `أنت: ${message}`]);

        // مسح حقل الإدخال
        setMessage('');

        // محاكاة رد AI
        setTimeout(async () => {
            try {
                const response = await getChatResponse(message);
                setResponses((prev) => [...prev, `AI: ${response}`]);
            } catch (error) {
                setResponses((prev) => [...prev, 'AI: حدث خطأ أثناء الحصول على الرد.']);
            }
        }, 1000); // تأخير 1 ثانية لمحاكاة وقت الاستجابة
    };

    return (
        <div className="relative">
            {/* زر لفتح نافذة الدردشة */}
            <button 
                className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-2xl">💬</span>
            </button>

            {/* مكون الدردشة */}
            {isOpen && (
                <div className="fixed bottom-16 right-4 w-full max-w-xs h-96 p-4 border border-gray-300 rounded-lg bg-white shadow-lg transition-transform transform translate-y-0">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between border-b pb-2 mb-2">
                            <h2 className="text-lg font-semibold">اسأل الدعم | VoteBot AI</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">×</button>
                        </div>
                        <div className="flex-grow overflow-y-auto mb-4 p-2 border border-gray-300 rounded-lg bg-gray-50">
                            {responses.map((response, index) => (
                                <div key={index} className={`my-2 p-3 rounded-lg max-w-xs ${response.startsWith('أنت:') ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
                                    {response}
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="اكتب رسالتك هنا..."
                                className="p-2 border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                onClick={handleSendMessage} 
                                className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition duration-300 relative"
                            >
                                <span className="absolute text-blue-500" style={{ transform: 'rotate(0deg)' }}>➤</span> {/* شكل السهم موجه نحو نافذة الدردشة */}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;