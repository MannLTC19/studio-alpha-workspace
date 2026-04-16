import React from 'react';
import { Mail, Send } from 'lucide-react';

export default function Help() {
  const faqs = [
    { q: "How do I create a new forum post?", a: "Navigate to the Forums page from the sidebar and click the 'New Post' button at the top right of the category header." },
    { q: "How do I sync my Microsoft Teams?", a: "Meetings are automatically synced if your email is linked to your Microsoft 365 organization account." },
    { q: "Can I mention specific users in a chat?", a: "Yes, typing '@' followed by their name will send them a direct desktop and email notification based on their preferences." }
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto pb-24">
        <div className="mb-8">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Support</span>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Help Center
          </h1>
          <p className="mt-2 text-slate-600 text-sm md:text-base">
            Find answers to common questions or reach out to our IT support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="font-bold text-slate-800 text-sm mb-2">{faq.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-blue-600"/> Contact IT Support</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Issue Topic</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                    <option>Account Access</option>
                    <option>Meeting Sync Issue</option>
                    <option>Bug Report</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Description</label>
                  <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none" placeholder="Describe the problem..."></textarea>
                </div>
                <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4"/> Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
