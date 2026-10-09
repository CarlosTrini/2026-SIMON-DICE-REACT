import { createContext, useContext, useEffect, useState, type ReactNode } from "react";


export type Colors = 'red' | 'green' | 'blue' | 'yellow' | 'orange' | 'pink' | 'black' | 'white' | 'gray';
export type Level = 'easy' | 'normal' | 'hard' | 'crazy';

interface Player {
    id: number;
    player: string;
    points: number;
}

interface GameContextI {
    playersNumber: number;
    currentPlayer: Player | null;
    sequence: Colors[];
    level: Level;
    playersInfo: Player[];
    timer: number;
    isGameInit: boolean;
    nextPlayer: Player | null;
    colorsByLevel: Record<Level, Colors[]>
    round: number;
    // lógica
    handleStartGame: () => void;
    handleUpdatePointsPlayer: (id: number | undefined) => void;
    handleAddPlayers: (playerName: string, idx: number) => void;
    setPlayersNumber: (playersNumber: number) => void;
    setLevel: (level: Level) => void;
    createSequence: () => void;
    setCurrentPlayer: (player: Player) => void;
    handleFinishGame: () => void;
    handleChangePlayer: () => void;


}

const GameContext = createContext<GameContextI | null>(null);

interface GameProviderI {
    children: ReactNode;
}

const colorsByLevel: Record<Level, Colors[]> = {
    'easy': ['red', 'green', 'blue', 'yellow'],
    'normal': ['red', 'green', 'blue', 'yellow', 'orange'],
    'hard': ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'black'],
    'crazy': ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'black', 'white', 'gray']
};

export const GameProvider: React.FC<GameProviderI> = ({ children }) => {


    const [sequence, setSequence] = useState<Colors[]>([]);
    const [level, setLevel] = useState<Level>('normal');
    const [playersInfo, setPlayersInfo] = useState<Player[]>([]);
    const [timer, setTimer] = useState(0);
    const [playersNumber, setPlayersNumber] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [isGameInit, setIsGameInit] = useState(false);
    const [round, setRound] = useState(0);
    const [nextPlayer, setNextPlayer] = useState<Player | null>(null);

    //Reinicia el juego
    const handleFinishGame = () => {

        if (playersNumber == 1) {
            createLengthUsers();
        } else {
            setPlayersNumber(1);
        }

        setLevel('normal');
        setTimer(0);
        setCurrentPlayer(null);
        setSequence([]);
        setRound(0);
        setIsGameInit(false);
    }

    //incia el juego
    const handleStartGame = () => {
        createSequence();
        setLevel(level);
        setPlayersInfo(prev => {
            // una vez los usuarios, se crea el 0, que es la maquina
            const newPlayers = [{ id: 0, player: 'simon', points: 0 }, ...prev.map(p => ({ ...p, id: p.id + 1 }))];
            setCurrentPlayer(newPlayers[0]);
            return newPlayers
        });
        setTimer(0);
        setIsGameInit(true);
    }

    //Actualiza puntos del jugador
    const handleUpdatePointsPlayer = (id: number | undefined) => {
        if (id == undefined) return;
        setPlayersInfo(prev => {
            const players = [...prev]
            const playerUpdate = players.map((p) => p.id == id ? ({ ...p, points: p.points + 1 }) : p)
            return playerUpdate
        })
    }

    //Agrega nombre de jugadores
    const handleAddPlayers = (playerName: string, idx: number) => {
        setPlayersInfo(prev => {
            const updatePlayers = [...prev]
            updatePlayers[idx].player = playerName
            return updatePlayers
        })
    }

    // CAMBIAR DE TURNOS
    const handleChangePlayer = () => {
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



    // FN INTERNAS

    const changeNextPlayer = () => {
        if (!currentPlayer) return;
        if (playersInfo[currentPlayer.id + 1]) {
            setNextPlayer(playersInfo.find(p => p.id === (currentPlayer.id + 1))!);
        } else {
            setNextPlayer(playersInfo[0]);
        }
    }

    const createLengthUsers = () => {
        // crea el arrar de jugadores cuando cambia el número de jugadores agregados al iniciar la pantalla
        playersNumber == 0
        setPlayersInfo(Array.from({ length: playersNumber }).map((_, idx) => ({
            id: idx,
            player: '',
            points: 0
        })))
    }

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * colorsByLevel[level].length);
    }

    const createSequence = () => {
        //crear primera secuencia en base a nivel seleccionado
        setRound(prev => prev + 1);
        const difficultySequence = {
            'easy': 2,
            'normal': 4,
            'hard': 6,
            'crazy': 8
        };

        const randomSequence: Colors[] = Array.from({ length: difficultySequence[level] }).map(() => colorsByLevel[level][generateRandomNumber()]);
        setSequence([...sequence, ...randomSequence]);
    }

    useEffect(() => {
        createLengthUsers();
    }, [playersNumber])

    useEffect(() => {
        if (!currentPlayer) return;
        changeNextPlayer();
    }, [currentPlayer])


    return (
        <GameContext.Provider value={{
            nextPlayer, round, sequence, level, playersInfo, timer, playersNumber, currentPlayer, isGameInit,
            handleFinishGame, handleStartGame, handleChangePlayer, handleUpdatePointsPlayer, handleAddPlayers, setPlayersNumber, setLevel, colorsByLevel, createSequence, setCurrentPlayer
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error('useGameContext must be used within GameProvider');
    return ctx;
};