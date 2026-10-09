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
            <section className='flex flex-col gap-3 md:gap-5  mx-auto mt-4'>

                <div className='md:flex justify-center gap-4 md:gap-8 items-center min-w-30 md:min-w-110 '>

                    <div className='flex flex-col gap-2 w-full '>
                        <label className='font-bold text-xl text-center'>Dificultad</label>
                        <select className='bg-primary border border-light focus:border-tertiary italic font-bold text-light text-center p-2 rounded-xl mx-auto w-full'
                            defaultValue={'normal'}
                            onChange={(e) => setLevel(e.target.value as Level)}
                        >
                            <option value="easy">Fácil</option>
                            <option value="normal">Normal</option>
                            <option value="hard">Dificil</option>
                            <option value="crazy">Crazy</option>
                        </select>
                    </div>


                    <div className='flex flex-col gap-2 mx-auto w-full'>
                        <label className='font-bold text-xl text-center'>Jugadores</label>
                        <select className='bg-primary border border-light focus:border-tertiary italic font-bold  text-light text-center p-2 rounded-xl w-full mx-auto'
                            onChange={(e) => setPlayersNumber(Number(e.target.value))}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-xl text-center'>{playersNumber > 1 ? 'Ingresen sus nombres' : 'Ingresa tu nombre'} </label>
                    <div className={`grid grid-cols-1 md:grid-cols-${playersNumber == 1 ? 1 : 2} gap-4 mx-auto`}>
                        {
                            playersNumber > 0 && Array.from({ length: playersNumber }).map((_, idx) => (
                                <span className='mt-3 relative ' key={idx}>
                                    <User className='w-4 h-4 top-3 left-3 absolute text-tertiary' />
                                    <input type="text" value={playersInfo[idx]?.player || ''} onChange={(e) => saveName(e, idx)} placeholder={`Nombre jugador ${idx + 1}`} className='border border-light focus:border-tertiary rounded-lg  pl-8 pr-2 py-2 text-light text-center italic bg-primary outline-none' />
                                </span>
                            ))
                        }
                    </div>

                </div>




                <div className=''>
                    <button className='group mx-auto active:scale-95 outline-none mt-5 bg-quinary/50 cursor-pointer transition-all hover:bg-tertiary/80 hover:text-primary border border-tertiary font-bold py-2 px-8 flex items-center gap-2  rounded-md' onClick={() => handleValidateForm()} > <Gamepad2 className='w-4 h-4 text-tertiary group-hover:text-primary   ' />  Jugar </button>
                </div>

            </section>
        </>);
}

export default PlaceholderInit;