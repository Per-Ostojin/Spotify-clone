import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';

const Player = ({ spotifyApi, token }) => {
    const [localPlayer, setLocalPlayer] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [device, setDevice] = useState(null);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState(false);
    const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);
    const [error, setError] = useState(null);

    const logPlayerState = async () => {
        if (!localPlayer || typeof localPlayer.getCurrentState !== 'function') {
            console.warn('Player or getCurrentState is not available.');
            return;
        }
        try {
            const state = await localPlayer.getCurrentState();
            console.log('Player state:', state);
        } catch (error) {
            console.error('Error fetching player state:', error);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'P.O Player',
                getOAuthToken: (cb) => cb(token),
                volume: 0.5,
                robust: 'robustness-level-1',
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('Player is ready with Device ID:', device_id);
                setDevice(device_id);
                setLocalPlayer(player);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.warn('Device ID is offline:', device_id);
            });

            player.addListener('player_state_changed', (state) => {
                if (!state) {
                    console.warn('Player state is null.');
                    setError('Player state is inactive.');
                    setActive(false);
                    return;
                }

                const track = state.track_window?.current_track;
                if (!track) {
                    console.warn('No current track.');
                    setError('No track available.');
                    setActive(false);
                    return;
                }

                setError(null);
                setDuration(track.duration_ms / 1000);
                setProgress(state.position / 1000);
                setIsPaused(state.paused);
                setCurrentTrack(track);

                if (localPlayer && typeof localPlayer.getCurrentState === 'function') {
                    localPlayer
                        .getCurrentState()
                        .then((state) => setActive(!!state))
                        .catch((e) => console.error('Error getting player state:', e));
                } else {
                    console.warn('Player is not available or getCurrentState is not a function.');
                    setActive(false);
                }
            });

            player.connect().catch((e) => console.error('Player connection error:', e));
        };

        return () => {
            console.log('Removing Spotify Web Playback SDK.');
            document.body.removeChild(script);
        };
    }, [token]);

    useEffect(() => {
        if (!localPlayer) return;

        async function connectPlayer() {
            try {
                const success = await localPlayer.connect();
                if (!success) {
                    console.error('Player connection failed.');
                } else {
                    console.log('Player connected successfully.');
                }
            } catch (e) {
                console.error('Error connecting player:', e);
            }
        }

        connectPlayer();

        return () => {
            localPlayer.disconnect();
        };
    }, [localPlayer]);

    useEffect(() => {
        const transferPlayback = async () => {
            if (!device) return;

            try {
                await spotifyApi.transferMyPlayback([device], false);
                console.log('Playback transferred successfully.');
                if (localPlayer) {
                    await localPlayer.resume();
                    console.log('Playback resumed on Web Player.');
                }
            } catch (e) {
                console.error('Error transferring playback:', e);
                setError('Failed to transfer playback. Try again.');
            }
        };

        transferPlayback();
    }, [device, spotifyApi]);

    return (
        <Box>
            {error && <Typography sx={{ color: 'error.main', textAlign: 'center' }}>{error}</Typography>}
            <Grid
                onClick={() => setPlayerOverlayIsOpen((prev) => !prev)}
                container
                px={3}
                sx={{
                    backgroundColor: 'background.paper',
                    height: 100,
                    cursor: { xs: 'pointer', md: 'auto' },
                    width: '100%',
                    borderTop: '1px solid #292929',
                }}
            >
                <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Avatar
                        src={currentTrack?.album.images[0]?.url || 'https://via.placeholder.com/56'}
                        alt={currentTrack?.album.name || 'No album'}
                        variant="square"
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                    />
                    <Box>
                        <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
                            {currentTrack?.name || 'No song playing'}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
                            {currentTrack?.artists?.map((artist) => artist.name).join(', ') || 'Unknown artist'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    md={4}
                >
                    <PlayerControls
                        progress={progress}
                        is_paused={isPaused}
                        duration={duration}
                        player={localPlayer}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <PlayerVolume player={localPlayer} />
                </Grid>
            </Grid>
            <PlayerOverlay
                playerOverlayIsOpen={playerOverlayIsOpen}
                closeOverlay={() => setPlayerOverlayIsOpen(false)}
                progress={progress}
                is_paused={isPaused}
                duration={duration}
                player={localPlayer}
                current_track={currentTrack}
            />
        </Box>
    );
};

export default Player;