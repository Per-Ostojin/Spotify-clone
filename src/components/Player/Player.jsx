import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';

const Player = ({ spotifyApi, token }) => {
    const [local_player, setLocalPlayer] = useState();
    const [is_paused, setIsPaused] = useState(false);
    const [current_track, setCurrentTrack] = useState();
    const [device, setDevice] = useState();
    const [duration, setDuration] = useState();
    const [progress, setProgress] = useState();
    const [active, setActive] = useState();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'PO Player 44',
                getOAuthToken: (cb) => {
                    cb(token);
                },
                volume: 0.5
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID:', device_id);
                setDevice(device_id);
                setLocalPlayer(player);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.warn('Device ID is offline:', device_id);
            });

            player.addListener('player_state_changed', (state) => {
                if (!state || !state.track_window?.current_track) {
                    return;
                }
                console.log('Player state changed:', state);

                setDuration(state.track_window.current_track.duration_ms / 1000);
                setProgress(state.position / 1000);
                setIsPaused(state.paused);
                setCurrentTrack(state.track_window.current_track);

                player.getCurrentState().then((state) => {
                    setActive(!!state);
                }).catch((e) => console.error('Error getting player state:', e));
            });

            player.connect().catch((e) => console.error('Player connection error:', e));
        };
    }, [token]);

    useEffect(() => {
        if (!local_player) return;

        async function connect() {
            try {
                await local_player.connect();
            } catch (e) {
                console.error('Error connecting player:', e);
            }
        }

        connect();
        return () => {
            local_player.disconnect();
        };
    }, [local_player]);

    useEffect(() => {
        const transferMyPlayback = async () => {
            if (device) {
                try {
                    const res = await spotifyApi.getMyDevices();
                    console.log('Devices:', res.body.devices);
                    await spotifyApi.transferMyPlayback([device], false);
                } catch (e) {
                    console.error('Error transferring playback:', e);
                }
            }
        };

        transferMyPlayback();
    }, [device, spotifyApi]);

    return (
        <Box>
            <Grid
                container
                px={3}
                sx={{
                    backgroundColor: 'background.paper',
                    height: 100,
                    cursor: { xs: 'pointer', md: 'auto' },
                    width: '100%',
                    borderTop: '1px solid #292929'
                }}
            >
                <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Avatar
                        src={current_track?.album.images[0]?.url || '/placeholder-image.png'}
                        alt={current_track?.album.name || 'No album'}
                        variant="square"
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                    />
                    <Box>
                        <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
                            {current_track?.name || 'No song playing'}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
                            {current_track?.artists?.map((artist) => artist.name).join(', ') || 'Unknown artist'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    md={4}
                >
                   
                        <PlayerControls
                            progress={progress}
                            is_paused={is_paused}
                            duration={duration}
                            player={local_player}
                        />
                 
                </Grid>
                <Grid item xs={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <PlayerVolume player={local_player} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Player;