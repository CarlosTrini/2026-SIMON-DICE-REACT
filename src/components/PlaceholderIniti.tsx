import { useGameContext, type Level } from '@/store/GameContext';
import { Gamepad2, User } from 'lucide-react';
import Swal from 'sweetalert2';


const PlaceholderInit = () => {

    const { playersNumber, playersInfo, setPlayersNumber, setLevel, handleAddPlayers, handleStartGame } = useGameContext();

    const saveName = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const { value } = e.target;
        handleAddPlayers(value, idx)
    }

    const handleValidateForm = () => {

        const ok = playersInfo.every(p => p.player !== '');

        if (!ok) {
            Swal.fire({
                title: "Oye, tranquilo viejo...",
                text: "Todos los jugadores deben tener un nombre",
                confirmButtonText: "vale"
            });
            return;
        }

        handleStartGame()
    }


    return (
        <>
            <section className='flex flex-col gap-3  w-90% md:w-[90%] mx-auto mt-4'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-xl text-center'>Selecciona una dificultad</label>
                    <select className='bg-primary text-light text-center p-2 rounded-xl w-[80%] md:w-[30%] mx-auto'
                        defaultValue={'normal'}
                        onChange={(e) => setLevel(e.target.value as Level)}
                    >
                        <option value="easy">Fácil</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Dificil</option>
                        <option value="crazy">Crazy</option>
                    </select>
                </div>


                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-xl text-center'>¿Cuántos jugadores participarán?</label>
                    <select className='bg-primary text-light text-center p-2 rounded-xl w-[80%] md:w-[30%] mx-auto'
                        onChange={(e) => setPlayersNumber(Number(e.target.value))}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-xl text-center'>{playersNumber > 1 ? 'Ingresen sus nombres' : 'Ingresa tu nombre'} </label>
                    <div className={`grid grid-cols-1 lg:grid-cols-${playersNumber} gap-4 mx-auto`}>
                        {
                            playersNumber > 0 && Array.from({ length: playersNumber }).map((_, idx) => (
                                <span className='mt-3 relative ' key={idx}>
                                    <User className='w-4 h-4 top-3 left-1 absolute text-tertiary' />
                                    <input type="text" value={playersInfo[idx]?.player || ''} onChange={(e) => saveName(e, idx)} placeholder={`Nombre jugador ${idx + 1}`} className='border border-secondary rounded-lg  pl-5 px-2 py-2 text-light text-center bg-primary outline-tertiary' />
                                </span>
                            ))
                        }
                    </div>

                </div>




                <div className=''>
                    <button className='group mx-auto active:scale-95 outline-none mt-5 bg-primary cursor-pointer transition-all hover:bg-tertiary/80 hover:text-primary border-2 border-tertiary font-bold py-2 px-4 flex items-center gap-2  rounded-xl' onClick={() => handleValidateForm()} > <Gamepad2 className='w-4 h-4 text-tertiary group-hover:text-primary   ' />  Jugar </button>
                </div>

            </section>
        </>);
}

export default PlaceholderInit;