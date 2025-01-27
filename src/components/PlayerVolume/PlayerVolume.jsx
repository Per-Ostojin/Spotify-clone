import { Stack, Slider } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const PlayerVolume = ({ player }) => {
    const [volume, setVolume] = useState(50); // Standardvolym
    const [isPlayerReady, setIsPlayerReady] = useState(false); // Spelarens status
    const [loading, setLoading] = useState(true); // Laddningsstatus

    // Kontrollera om spelaren är redo
    useEffect(() => {
        if (player && typeof player.getVolume === 'function') {
            setIsPlayerReady(true);
            setLoading(false); // Sluta visa loading när spelaren är redo
            player.getVolume()
                .then((volume) => {
                    console.log('Initial volume:', volume);
                    setVolume(volume * 100); // Omvandla volym till procent
                })
                .catch((e) => console.error('Error fetching initial volume:', e));
        } else {
            setIsPlayerReady(false);
            console.warn('Player is not ready or getVolume is not available.');
        }
    }, [player]);

    // Hantera volymändring
    const handleVolumeChange = async (value) => {
        if (!isPlayerReady || !player || typeof player.setVolume !== 'function') {
            console.error('Player is not ready or setVolume is not available.');
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

    // Fallback om spelaren inte är redo
    if (loading) {
        return (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: 150, color: 'text.secondary' }}>
                <VolumeOff />
                <Slider disabled />
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