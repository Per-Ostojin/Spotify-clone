import { Stack, Slider } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const PlayerVolume = ({ player }) => {
    const [volume, setVolume] = useState(50);
    const [isPlayerReady, setIsPlayerReady] = useState(false); // Ny state för att kontrollera spelarens status

    useEffect(() => {
        if (player && typeof player.getVolume === 'function') {
            setIsPlayerReady(true); // Markera att spelaren är redo
            player.getVolume()
                .then((volume) => {
                    console.log('Initial volume:', volume);
                    setVolume(volume * 100); // Spotify SDK använder en skala från 0 till 1
                })
                .catch((e) => console.error('Error fetching initial volume:', e));
        } else {
            console.warn('Player is not ready or getVolume is not available.');
            setIsPlayerReady(false);
        }
    }, [player]);

    const handleVolumeChange = async (value) => {
        if (!isPlayerReady || !player || typeof player.setVolume !== 'function') {
            console.error('Player instance is not available for volume control.');
            return;
        }
        try {
            console.log(`Attempting to set volume to: ${value / 100}`);
            await player.setVolume(value / 100); // Omvandla till en skala mellan 0 och 1
            console.log('Volume successfully set.');
        } catch (e) {
            console.error('Error setting volume:', e);
        }
    };

    if (!isPlayerReady) {
        return (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: 150, color: 'error.main' }}>
                <VolumeOff />
                <Slider
                    disabled
                    min={0}
                    max={100}
                    value={volume}
                    sx={{ opacity: 0.5 }}
                />
            </Stack>
        );
    }

    return (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: 150, color: 'text.secondary' }}>
            {volume === 0 ? <VolumeOff /> : volume < 50 ? <VolumeDown /> : <VolumeUp />}
            <Slider
                min={0}
                max={100}
                step={1}
                value={volume}
                onChange={(e, value) => {
                    console.log('Volume slider moved to:', value);
                    setVolume(value); // Uppdatera lokalt state
                }}
                onChangeCommitted={(e, value) => handleVolumeChange(value)} // Bekräfta ändringen
            />
        </Stack>
    );
};

export default PlayerVolume;