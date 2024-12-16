//import React from 'react';

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-center py-4">
            <div className="max-w-7xl mx-auto px-10">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} VoteBot. جميع الحقوق محفوظة.
                </p>
            </div>
        </footer>
    );
} 