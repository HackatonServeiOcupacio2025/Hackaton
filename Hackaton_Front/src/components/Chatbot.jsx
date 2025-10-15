import React, { useState } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Llama a tu backend o API de IA aquí
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer TU_API_KEY`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: input }],
            }),
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        setMessages([...newMessages, { sender: 'bot', text: botMessage }]);
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <div className="h-64 overflow-y-auto mb-2 space-y-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white text-right' : 'bg-gray-200 text-black'}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-l px-2 py-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-1 rounded-r"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default Chatbot;