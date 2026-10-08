import React from 'react'
import { Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-slate-800/80 mt-16 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="flex items-center gap-1">
          Hecho con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> REACT
        </p>
      </div>
    </footer>
  )
}
