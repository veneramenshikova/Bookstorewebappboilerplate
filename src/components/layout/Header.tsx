import { Bell, LogOut, User, Store } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userRole: string;
  onSwitchToStore?: () => void;
}

export function Header({ userName, userRole, onSwitchToStore }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl">Информационная система «Читай-Город»</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {onSwitchToStore && (
          <button
            onClick={onSwitchToStore}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>Витрина магазина</span>
          </button>
        )}
        
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">{userName}</div>
            <div className="text-gray-500">{userRole}</div>
          </div>
        </div>
        
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
