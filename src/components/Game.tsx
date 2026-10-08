import { useState, useEffect, useRef } from 'react';
import { useGameContext, type Colors } from '@/store/GameContext';
import PlaceholderInit from './PlaceholderIniti';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';



const Game = () => {
    const { playersInfo, isGameInit, sequence, colorsByLevel, level, currentPlayer, setCurrentPlayer, createSequence, handleFinishGame, handleUpdatePointsPlayer } = useGameContext();


    const [clicksIndexPlayer, setClicksIndexPlayer] = useState<number>(0);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    const audioBtnRef = useRef<HTMLAudioElement | null>(null);

    // CONFETTI ANIMACIÓN
    const triggerConfetti = () => {
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 1 }
        });
    };
    // CONFETTI ANIMACIÓN FIN




    const handleClickButton = (btn: HTMLButtonElement) => {
        //animación en click
        btn.classList.add('active-btn');
        audioBtnRef?.current?.play();

        setTimeout(() => {
            btn.classList.remove('active-btn');
        }, 500);

        //registro de clicks de usuario
        if (currentPlayer?.player == 'simon') return

        // si es el usuario, se revisa el click actual... los clicks no se acumula, se revisan al momento
        const color = btn.id.split('-')[1] as Colors;
        checkClicksPlayer(color);

    }


    const finishGame = () => {
        // SEAN LOS JUGADORES QUE SEAN, SI UNO FALLA, SE TERMINA EL JUEGO PARA TODOS
        // aqui se equivoco en algún color

        const sortedByPoints = playersInfo.sort((a, b) => b.points - a.points).slice(0, -1); // remueve la maquina
        const allZero = sortedByPoints.every((p) => p.points === 0);
        const winner = sortedByPoints[0];
        const loser = sortedByPoints[sortedByPoints.length - 1]; // porque el último es la maquina, ya que esa no suma puntos y es cero
        const isTie = winner.points == loser.points;

        let title = '';
        let text = '';

        if (playersInfo.length == 2) { // DOS, YA QUE SI SOLO ES UN JUGADOR, PLAYERS TIENE DOS: MACHINE Y JUGADOR
            title = '¡Oops! Fallaste ' + currentPlayer?.player + ' 😪'
            text = `Lograste hacer ${currentPlayer?.points} puntos. 🎉`
        }
        else if (playersInfo.length == 3) { // DOS O MÁS JUGADORES MÁS MACHINE...
            title = isTie ?
                `Hay un empate! Ambos tienen ${winner.points} puntos 🎉🏆`
                : `${winner.player} es el ganador con ${winner.points} puntos! 🎉🏆`;

            text = isTie ? '' : `${loser.player} lo siento, será para la próxima 😅`
        }
        else if (playersInfo.length >= 4) { // TRES O MÁS JUGADORES MÁS MACHINE...
            title = allZero ? 'Nadie ganó... Todos en 0 😅' : `${winner.player} es el ganador con ${winner.points} puntos! 🎉🏆`
            text = `Lo siento, el juego terminó por culpa de ${currentPlayer?.player} 😪`
        }


        handleFinishGame();
        Swal.fire({
            title: title,
            text: text,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
        }).then((result) => {
            if (result.isConfirmed) {
                setClicksIndexPlayer(0);
            }
        })

    }

    // REVISAR CLICKS DEL USUARIO PARA COMPROBAR CON LA SECUENCIA
    const checkClicksPlayer = (color: Colors) => {
        setClicksIndexPlayer((prev) => prev + 1)

        if (sequence[clicksIndexPlayer] != color) {
            finishGame();
            return;
        }

        if (sequence.length - 1 == clicksIndexPlayer) {
            //llegó al final y acertó ... sumar puntos y cmbiar usuario
            handleUpdatePointsPlayer(currentPlayer?.id);
            setClicksIndexPlayer(0);
            changePlayer();
            triggerConfetti();
        }




    }

    // CAMBIAR DE TURNOS
    const changePlayer = () => {
        //revisar cantidad de jugadores y aumentar
        setTimeout(() => {
            if (!currentPlayer) return;

            if (playersInfo[currentPlayer.id + 1]) {
                // aún hay otro jugador... cambia
                setCurrentPlayer(playersInfo.find(p => p.id === (currentPlayer.id + 1))!);
            } else {
                // no hay más jugadores.... vuelve a la máquina
                setCurrentPlayer(playersInfo[0]);
                createSequence(); // crea nueva secuencia o la acumula
            }
        }, 1200)
    }


    const executeSequence = async (sequence: Colors[]): Promise<boolean> => {
        // se retorna como promesa para tener más 'control' del timeout y flujo
        setShowOverlay(true);
        return new Promise((resolve) => {
            sequence.forEach((c, i) => {
                const btn = document.getElementById(`btn-${c}`);
                setTimeout(() => {
                    btn?.click(); // El click dispara el listener que ya añade y remueve 'active-btn' por 900ms
                    audioBtnRef?.current?.play();

                    if (i === sequence.length - 1) {
                        setShowOverlay(false);
                        resolve(true);
                    }
                }, 1500 + ((i + 1) * 900));
            });
        });
    };

    // effect para cuando inicie el juego y en cambios de turno
    useEffect(() => {

        //solo se ejecuta cuando es turno de la maquina
        if (currentPlayer?.player !== 'simon') return

        const initExecuteSequence = async () => {
            await executeSequence(sequence); // espera a que la maquina termine para cambiar de jugador
            changePlayer();
        }

        if (isGameInit) {
            initExecuteSequence();
        }

    }, [isGameInit, currentPlayer])


    // effect para cambio de usuario
    useEffect(() => {
        if (!currentPlayer) return;

        let title = currentPlayer?.player == 'simon' ? '🤖 Simón dice!!' : `Es el turno de ${currentPlayer?.player}`
        let timer = currentPlayer?.player == 'simon' ? 1000 : 1200

        Swal.fire({
            title: title,
            timer: timer,
            showConfirmButton: false
        });

    }, [currentPlayer]);


    const createButtonColor = (color: Colors) => {

        return (
            <button key={color} id={`btn-${color}`} className={`button-simon button-simon-${color} w-20 sm:w-30 md:w-40 max-w-40 h-20 sm:h-30 md:h-40 lg:h-40`}
                onClick={(e) => {


                    handleClickButton(e.target as HTMLButtonElement)

                }}></button>
        )
    }

    return (
        <>
            <audio aria-hidden='true' src="/audio-click-1.mp3" id='audio-btn' ref={audioBtnRef}></audio>

            {
                !isGameInit && (
                    <PlaceholderInit />

                )
            }

            {
                isGameInit && (

                    <section>
                        <div className="flex flex-wrap justify-center items-center mx-auto gap-8 mt-8 ">
                            {
                                colorsByLevel[level].map((color) => (
                                    createButtonColor(color)
                                ))
                            }
                        </div>
                    </section>
                )
            }

            {
                showOverlay && <div className='w-screen h-screen bg-primary/10 fixed top-0 left-0 z-99' />
            }

        </>
    );
}

export default Game;