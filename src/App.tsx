import Game from './components/Game';
import { useGameContext } from '@/store/GameContext'

import simondiceimage from './assets/simondiceimage.jpg';
import { Trophy, User } from 'lucide-react';

export function App() {

  const { currentPlayer, isGameInit, round, playersNumber, nextPlayer, playersInfo } = useGameContext();

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
                className="relative w-18 h-18 sm:w-30 sm:h-30 md:w-90 md:h-40 lg:w-50 rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
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


          {
            //  INFO GAME 
            isGameInit && (
              <section className='w-full'>


                {/* CANTIDAD JUGADORES */}
                <p className='text-xl font-bold italic underline underline-offset-5 mb-3 lg:mb-4'>Jugadores: <span className='text-tertiary'>{playersNumber == 1 ? 'Solo tú' : playersNumber}</span></p>


                {/* PUNTAJE */}
                <div className='p-1 md:p-3 border-4 border-dotted border-tertiary mb-3'>
                  <p className='text-lg font-bold italic underline mb-2 md:mb-4 text-center'>Puntaje:</p>
                  <div className='flex gap-2 flex-wrap justify-around'>
                    {
                      playersInfo.filter((player) => player.player !== 'simon').map((player, idx) => (
                        <p key={idx} className='flex items-center gap-1 text-lg font-bold text-slate-300 hover:text-white transition-colors'>
                          <Trophy className='w-4 h-4' />
                          {player.player}: <span className='text-tertiary'>{player.points}</span>
                        </p>
                      ))
                    }
                  </div>
                </div>


                {/* JUGADOR SIGUIENTE */}
                <div className='lg:mt-4'>
                  <p
                    className="flex items-center gap-1 font-bold text-lg text-slate-300 hover:text-white transition-colors"
                  >
                    <User className='w-4 h-4' />
                    Siguiente: <span className="ml-1 text-tertiary uppercase">{nextPlayer?.player} </span>
                  </p>
                </div>




              </section>


            )
          }
        </section>

        <section className="h-full lg:col-span-6 xl:col-span-6 mx-autow-full flex flex-col items-center justify-center relative ">
          {
            isGameInit && (
              <>

                {/* JUGADOR ACTUAL / TURNO - PUNTOS  */}
                <section className="lg:absolute top-0 flex flex-col md:flex-row items-center  justify-center py-2 md:py-4 w-full gap-2 md:gap-8 bg-secondary/50 ">

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
                </section>

                <p className='text-xl font-bold italic underline underline-offset-5 m-2 md:m-4 uppercase'>Ronda: &nbsp; <span className='text-tertiary'>{round}</span></p>
              </>
            )
          }

          <Game />
        </section>

      </main>


    </>
  )
}

export default App
