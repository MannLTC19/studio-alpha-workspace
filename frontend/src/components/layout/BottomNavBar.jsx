import React from 'react';
import { LayoutDashboard, Hash, MessageSquare as MessageSquareIcon, Calendar } from 'lucide-react';
import clsx from '../../utils/clsx';
import { useNavigation } from '../../context/NavigationContext';

export default function BottomNavBar() {
  const { path, navigate } = useNavigation();
  const navItems = [
    { name: 'Dash', path: '/', icon: LayoutDashboard },
    { name: 'Forum', path: '/forums', icon: Hash },
    { name: 'Chat', path: '/messaging', icon: MessageSquareIcon },
    { name: 'Meetings', path: '/workspace', icon: Calendar },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex items-center justify-around z-50">
      {navItems.map((item) => {
        const isActive = path === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={clsx(
              "flex flex-col items-center justify-center transition-colors w-full h-full",
              isActive ? "text-blue-700 font-bold" : "text-slate-500 hover:text-blue-600"
            )}
          >
            <Icon className={clsx("w-5 h-5 mb-1", isActive && "fill-blue-100")} />
            <span className="text-[10px]">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
