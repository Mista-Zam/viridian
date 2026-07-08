import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { chatMessages } from '../../data/ai';
import type { ChatMessage } from '../../types';
import { generateId } from '../../lib/utils';

const autoReplies = [
  'Based on current weather, it\'s a great time to plant tomatoes. Make sure the soil temperature is above 18°C.',
  'For pest control, consider using neem oil spray. It\'s organic and effective against most common pests.',
  'Rice blast can be prevented by using resistant varieties and proper water management.',
  'The market price for tomatoes is currently ₱45/kg with high demand. Good time to harvest and sell.',
  'Apply fertilizers early in the morning or late afternoon to avoid nutrient loss from evaporation.',
  'Drip irrigation is recommended for your tomato crop. It saves water and reduces weed growth.',
  'Crop rotation is important. Avoid planting the same crop family in the same area for at least 2 seasons.',
  'Consider intercropping with legumes to naturally fix nitrogen in your soil.',
];

export default function ChatAssistantTab() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: generateId(),
        sender: 'ai',
        text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="max-w-3xl mx-auto overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 text-sm">Viridian AI Assistant</h2>
          <p className="text-xs text-green-600">Online</p>
        </div>
      </div>

      <div className="max-h-[60vh] min-h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'ai' ? 'bg-emerald-100' : 'bg-blue-100'
              }`}>
                {msg.sender === 'ai' ? (
                  <Bot size={16} className="text-emerald-600" />
                ) : (
                  <User size={16} className="text-blue-600" />
                )}
              </div>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary-50 text-gray-800 rounded-tr-sm'
                  : 'bg-gray-100 text-gray-700 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-emerald-600" />
              </div>
              <div className="px-4 py-3 bg-white border border-border rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-4 py-3 border-t border-border bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about farming, weather, pests..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Button onClick={handleSend} disabled={!input.trim()} icon={<Send size={18} />} />
        </div>
      </div>
    </Card>
  );
}
