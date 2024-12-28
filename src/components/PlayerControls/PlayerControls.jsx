import { Stack, Typography, Slider, Box, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const PlayerControls = ({ is_paused, duration, progress, player }) => {
    const [currentProgress, setCurrentProgress] = useState(progress);
    const skipStyle = { width: 28, height: 28 };
    const playStyle = { width: 38, height: 38 };

    // Update currentProgress periodically when playing
    useEffect(() => {
        if (!player) return;

        const intervalId = setInterval(() => {
            if (!is_paused && currentProgress < duration) {
                setCurrentProgress((prevState) => Math.min(prevState + 1, duration));
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [is_paused, player, duration, currentProgress]);

    // Sync currentProgress with incoming progress updates
    useEffect(() => {
        setCurrentProgress(progress);
    }, [progress]);

    // Helper function for logging errors
    const handlePlayerError = (methodName, error) => {
        console.error(`${methodName} error:`, error);
    };

    return (
        <Stack direction={'column'} spacing={2} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
            <Stack spacing={1} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
                {/* Previous Track Button */}
                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    onClick={() => {
                        if (!player) {
                            console.error('Player is not initialized.');
                            return;
                        }
                        setCurrentProgress(0);
                        player.previousTrack().catch((e) => handlePlayerError('Previous track', e));
                    }}
                >
                    <SkipPrevious sx={skipStyle} />
                </IconButton>

                {/* Play/Pause Button */}
                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    onClick={() => {
                        if (!player) {
                            console.error('Player is not initialized.');
                            return;
                        }
                        player.togglePlay().catch((e) => handlePlayerError('Toggle play', e));
                    }}
                >
                    {is_paused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
                </IconButton>

                {/* Next Track Button */}
                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    onClick={() => {
                        if (!player) {
                            console.error('Player is not initialized.');
                            return;
                        }
                        setCurrentProgress(0);
                        player.nextTrack().catch((e) => handlePlayerError('Next track', e));
                    }}
                >
                    <SkipNext sx={skipStyle} />
                </IconButton>
            </Stack>

            {/* Slider for Track Progress */}
            <Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '75%' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(currentProgress)}</Typography>
                <Slider
                    max={duration || 0} // Ensure duration is not undefined
                    value={currentProgress || 0} // Fallback to 0 if currentProgress is undefined
                    min={0}
                    size="medium"
                    onChange={(event, value) => {
                        if (typeof value === 'number') {
                            setCurrentProgress(value);
                        } else {
                            console.error('Invalid slider value:', value);
                        }
                    }}
                    onChangeCommitted={(event, value) => {
                        if (!player) {
                            console.error('Player is not initialized.');
                            return;
                        }
                        player.seek(value * 1000).catch((e) => handlePlayerError('Seek', e));
                    }}
                />
                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(duration)}</Typography>
            </Stack>
        </Stack>
    );
};

export default PlayerControls;