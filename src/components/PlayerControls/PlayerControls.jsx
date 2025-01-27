import { Stack, Typography, Slider, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const PlayerControls = ({ is_paused, duration = 0, progress = 0, player }) => {
    const [currentProgress, setCurrentProgress] = useState(progress);
    const [isPlayerReady, setIsPlayerReady] = useState(false); // Ny state för att indikera player-status
    const skipStyle = { width: 28, height: 28 };
    const playStyle = { width: 38, height: 38 };

    // Kontrollera om player är redo
    useEffect(() => {
        if (player && typeof player.getCurrentState === 'function') {
            setIsPlayerReady(true);
        } else {
            console.warn('Player is not ready or getCurrentState is not available.');
            setIsPlayerReady(false);
        }
    }, [player]);

    // Synkronisera progress med spelaren
    useEffect(() => {
        if (!isPlayerReady) return;

        const syncProgress = () => {
            player.getCurrentState()
                .then((state) => {
                    if (state && !is_paused) {
                        setCurrentProgress(state.position / 1000);
                    }
                })
                .catch((err) => console.error('Failed to sync progress:', err));
        };

        const intervalId = setInterval(syncProgress, 1000);
        return () => clearInterval(intervalId);
    }, [player, is_paused, isPlayerReady]);

    // Uppdatera progress vid inkommande förändringar
    useEffect(() => {
        setCurrentProgress(progress);
    }, [progress]);

    // Hantera användarens åtgärder (Play, Pause, Next, Previous)
    const handlePlayerAction = async (action, label) => {
        if (!isPlayerReady) {
            console.warn(`Player is not ready for action: ${label}`);
            return;
        }
        try {
            await action();
            console.log(`${label} executed successfully.`);
            if (player) {
                const state = await player.getCurrentState();
                console.log(`Player state after ${label}:`, state);
            }
        } catch (error) {
            console.error(`${label} action error:`, error);
        }
    };

    if (!isPlayerReady) {
        return (
            <Typography sx={{ color: 'error.main', textAlign: 'center' }}>
                Spelaren är inte tillgänglig. Kontrollera att spelaren är korrekt initialiserad.
            </Typography>
        );
    }

    return (
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
            {/* Kontroller */}
            <Stack spacing={1} direction="row" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    disabled={!isPlayerReady}
                    onClick={() => handlePlayerAction(() => player.previousTrack(), 'Föregående låt')}
                >
                    <SkipPrevious sx={skipStyle} />
                </IconButton>

                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    disabled={!isPlayerReady}
                    onClick={() => handlePlayerAction(() => player.togglePlay(), 'Play/Pause')}
                >
                    {is_paused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
                </IconButton>

                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    disabled={!isPlayerReady}
                    onClick={() => handlePlayerAction(() => player.nextTrack(), 'Nästa låt')}
                >
                    <SkipNext sx={skipStyle} />
                </IconButton>
            </Stack>

            {/* Progress-bar */}
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ width: '75%' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
                    {duration > 0 ? formatTime(currentProgress) : '--:--'}
                </Typography>
                <Slider
                    max={duration}
                    value={currentProgress}
                    min={0}
                    size="medium"
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatTime}
                    onChange={(event, value) => setCurrentProgress(value)}
                    onChangeCommitted={async (event, value) => {
                        if (!isPlayerReady) {
                            console.warn('Player is not ready for seeking.');
                            return;
                        }
                        try {
                            await player.seek(value * 1000);
                            console.log('Seek action successful:', value);
                        } catch (error) {
                            console.error('Seek action error:', error);
                        }
                    }}
                />
                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
                    {duration > 0 ? formatTime(duration) : '--:--'}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default PlayerControls;