import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Game from './components/Game';
import { useGameContext } from '@/store/GameContext'

import simondiceimage from './assets/simondiceimage.jpg';
import { Trophy, User } from 'lucide-react';

export function App() {

  const { currentPlayer, isGameInit } = useGameContext();


  return (
    <div className="min-h-screen bg-primary-dark text-slate-100 selection:bg-blue-500 selection:text-white flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-r from-quaternary/20 via-primary/40 to-quaternary/10 border-b border-secondary/30 px-[5%] md:px-[10%] py-8 md:py-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <figure className="relative shrink-0 group">
          <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-secondary to-tertiary opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
          <img
            src={simondiceimage}
            alt="Simón Dice Juego de Memoria"
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 object-cover rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
          />
        </figure>
        <article className="flex flex-col gap-2 text-center md:text-left max-w-2xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-tertiary">
            ⚡ Desafío de Memoria y Reflejos
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
            Simón Dice
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Pon a prueba tu agilidad mental: observa atentamente la secuencia de colores brillantes, memoriza cada patrón y repítelo sin fallar para acumular la mayor puntuación.
          </p>
        </article>
      </section>
      {/* INFO GAME */}
      {
        isGameInit && (
          <section>
            <div className="flex  gap-8 bg-quaternary py-5 rounded-xl justify-center">

              <p
                className="flex items-center gap-1 font-bold text-lg text-slate-300 hover:text-white transition-colors"
              >
                <User className='w-4 h-4' />
                Turno: <span className="ml-1 text-tertiary uppercase">{currentPlayer?.player} </span>
              </p>
              {
                currentPlayer?.player != 'simon' &&
                <p
                  className="flex items-center gap-1 text-lg font-bold text-slate-300 hover:text-white transition-colors"
                >
                  <Trophy className='w-4 h-4' />
                  Puntos: <span className="ml-1 text-tertiary">{currentPlayer?.points} </span>
                </p>
              }
            </div>
          </section>

        )
      }

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <Game />
      </main>

      <Footer />
    </div>
  )
}

export default App
