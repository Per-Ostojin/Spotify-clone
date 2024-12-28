import { Stack, Slider } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const PlayerVolume = ({ player }) => {
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        if (player) {
            player.getVolume().then((volume) => {
                console.log('Initial volume:', volume);
                setVolume(volume * 100); 
            }).catch((e) => console.error('Error fetching initial volume:', e));
        }
    }, [player]);

    const handleVolumeChange = async (value) => {
        if (!player) {
            console.error('Player instance is not available for volume control.');
            return;
        }
        try {
            console.log(`Attempting to set volume to: ${value / 100}`);
            await player.setVolume(value / 100); 
            console.log('Volume successfully set.');
        } catch (e) {
            console.error('Error setting volume:', e);
        }
    };

    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ width: 150, color: 'text.secondary' }}>
            {volume === 0 ? <VolumeOff /> : volume < 50 ? <VolumeDown /> : <VolumeUp />}
            <Slider
                min={0}
                max={100}
                step={1}
                value={volume}
                onChange={(e, value) => {
                    console.log('Volume slider moved to:', value);
                    setVolume(value);
                }}
                onChangeCommitted={(e, value) => handleVolumeChange(value)}
            />
        </Stack>
    );
};

export default PlayerVolume;