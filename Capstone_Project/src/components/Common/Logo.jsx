import { GraduationCap } from 'lucide-react';

export const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="p-2 bg-brand-600 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-brand-200">
      <GraduationCap className="text-white w-6 h-6" />
    </div>
    <span className="font-black text-xl tracking-tighter text-slate-800">
      QUIZ<span className="text-brand-600">FLOW</span>
    </span>
  </div>
);