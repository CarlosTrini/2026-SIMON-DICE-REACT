import React from 'react'
import { Gamepad2 } from 'lucide-react'


export const Navbar: React.FC = () => {




  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-primary/80 border-b border-secondary/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center gap-4">
        <Gamepad2 className="w-10 h-10 text-tertiary" />
        <span className="font-bold text-lg text-light tracking-tight">React dice... juguemos</span>
      </div>
    </header>
  )
}
