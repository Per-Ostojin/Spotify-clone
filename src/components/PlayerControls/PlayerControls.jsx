import { Stack, Typography, Slider, Box, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const PlayerControls = ({ is_paused, duration, progress, player }) => {
    const [currentProgress, setCurrentProgress] = useState(progress);
    const skipStyle = { width: 28, height: 28 };
    const playStyle = { width: 38, height: 38 };

    useEffect(() => {
        if (!player) return;

        const intervalId = setInterval(() => {
            if (!is_paused) {
                setCurrentProgress((prevState) => Math.min(prevState + 1, duration));
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [is_paused, player, duration]);

    useEffect(() => {
        setCurrentProgress(progress);
    }, [progress]);

    return (
        <Stack direction={'column'} spacing={2} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
            <Stack spacing={1} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    onClick={() => {
                        if (!player) {
                            console.error('Player is not initialized.');
                            return;
                        }
                        setCurrentProgress(0);
                        player.previousTrack().catch((e) => console.error('Previous track error:', e));
                    }}
                >
                    <SkipPrevious sx={skipStyle} />
                </IconButton>
                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    onClick={() => {
                        if (!player) {
                            console.error('Player is not initialized.');
                            return;
                        }
                        player.togglePlay().catch((e) => console.error('Toggle play error:', e));
                    }}
                >
                    {is_paused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
                </IconButton>
                <IconButton
                    size="small"
                    sx={{ color: 'text.primary' }}
                    onClick={() => {
                        if (!player) {
                            console.error('Player is not initialized.');
                            return;
                        }
                        setCurrentProgress(0);
                        player.nextTrack().catch((e) => console.error('Next track error:', e));
                    }}
                >
                    <SkipNext sx={skipStyle} />
                </IconButton>
            </Stack>
            <Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '75%' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(currentProgress)}</Typography>
                <Slider
                    max={duration}
                    value={currentProgress}
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
                        player.seek(value * 1000).catch((e) => console.error('Seek error:', e));
                    }}
                />
                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(duration)}</Typography>
            </Stack>
        </Stack>
    );
};

export default PlayerControls;