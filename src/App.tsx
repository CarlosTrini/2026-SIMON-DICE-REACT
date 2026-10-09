import Game from './components/Game';
import { useGameContext } from '@/store/GameContext'

import simondiceimage from './assets/simondiceimage.jpg';
import { Trophy, User } from 'lucide-react';

export function App() {

  const { currentPlayer, isGameInit } = useGameContext();


  return (
    <>



      <main className="lg:min-h-screen min-w-screen  grid lg:grid-cols-8 bg-primary-dark text-slate-100">

        {/* HERO */}
        <section className="lg:col-span-2 xl:col-span-2 lg:max-w-lg relative overflow-hidden bg-linear-to-r from-quaternary/20 via-primary/40 to-quaternary/10 border-b border-secondary/30 px-[5%] md:px-[10%] py-8 flex flex-col items-center gap-6 md:gap-10">
          <section className='sm:flex gap-4 items-center lg:flex-col'>
            <figure className="relative group flex justify-center">
              <div className="absolute w-30 h-30 sm:w-45 sm:h-45 md:w-40 inset-0 rounded-2xl bg-linear-to-r from-secondary to-tertiary opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
              <img
                src={simondiceimage}
                alt="Simón Dice Juego de Memoria"
                className="relative w-30 h-30 sm:w-45 sm:h-45 md:w-90 md:h-40 lg:w-50 rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
              />
            </figure>
            <article className="flex flex-col mt-4 gap-2 text-center md:text-left ">
              <p className="text-xs  font-bold uppercase tracking-widest text-tertiary">
                ⚡ Desafío de Memoria y Reflejos
              </p>
              <h1 className="text-3xl sm:text-4xl  font-black tracking-tight text-white drop-shadow-sm">
                Simón Dice
              </h1>
              <p className="hidden md:block text-sm sm:text-base text-slate-300 leading-relaxed">
                Pon a prueba tu agilidad mental: observa atentamente la secuencia de colores brillantes, memoriza cada patrón y repítelo sin fallar para acumular la mayor puntuación.
              </p>
            </article>
          </section>
          {/* INFO GAME */}
          {
            isGameInit && (
              <section>
                <div className="flex lg:flex-col xl:flex-row gap-8 bg-quinary  justify-center border-b border-tertiary/50">

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
        </section>

        <section className="h-full lg:col-span-6 xl:col-span-6 mx-autow-full flex items-center justify-center ">

          <Game />
        </section>

      </main>


    </>
  )
}

export default App
