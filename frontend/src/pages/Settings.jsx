import React from 'react';
import { User, Bell, Shield } from 'lucide-react';
import { CURRENT_USER_NAME } from '../utils/data';

export default function Settings() {
  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto pb-24">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Settings
          </h1>
          <p className="mt-2 text-slate-600 text-sm md:text-base">
            Manage your account preferences, notifications, and privacy settings.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><User className="w-5 h-5 text-blue-600"/> Profile Information</h3>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Full Name</label>
                <input type="text" defaultValue={CURRENT_USER_NAME} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Email Address</label>
                <input type="email" defaultValue="alex.rivera@studioalpha.com" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
              </div>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-200 transition-colors">Update Profile</button>
            </div>
          </div>

          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Bell className="w-5 h-5 text-emerald-600"/> Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <p className="font-bold text-slate-700 text-sm group-hover:text-slate-900">Email Notifications</p>
                    <p className="text-xs text-slate-500">Receive daily summaries and important mentions.</p>
                  </div>
                  <div className="w-10 h-6 bg-blue-600 rounded-full relative transition-colors shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <p className="font-bold text-slate-700 text-sm group-hover:text-slate-900">Desktop Push</p>
                    <p className="text-xs text-slate-500">Show native browser notifications for direct messages.</p>
                  </div>
                  <div className="w-10 h-6 bg-blue-600 rounded-full relative transition-colors shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Shield className="w-5 h-5 text-rose-600"/> Security & Privacy</h3>
              <p className="text-sm text-slate-600">Ensure your account uses a strong password and multi-factor authentication.</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-slate-300 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors">Change Password</button>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors">Enable 2FA</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
