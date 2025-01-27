import { Box, Typography, Avatar, Skeleton, Alert } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SongTable from '../components/SongTable/SongTable';

const Playlist = ({ spotifyApi, token }) => {
    const [playlistInfo, setPlaylistInfo] = useState(null);
    const [songs, setSongs] = useState([]);
    const [status, setStatus] = useState({ isLoading: true, isError: null });
    const { id } = useParams();

    // Format songs for the SongTable
    const formatSongs = useCallback(
        (items) =>
            items.map((item, i) => {
                const { track } = item;
                track.contextUri = `spotify:playlist:${id}`;
                track.position = i;
                return track;
            }),
        [id]
    );

    // Fetch playlist details
    useEffect(() => {
        const getData = async () => {
            setStatus({ isLoading: true, isError: null });
            try {
                const playlistDetails = await spotifyApi.getPlaylist(id);
                const { body } = playlistDetails;
                setPlaylistInfo({
                    image: body.images?.[0]?.url || '',
                    name: body.name || 'Unknown Playlist',
                });
                const { items } = body.tracks;
                setSongs(formatSongs(items));
            } catch (error) {
                console.error('Error fetching playlist:', error);
                setStatus({ isLoading: false, isError: error });
            } finally {
                setStatus((prev) => ({ ...prev, isLoading: false }));
            }
        };

        getData();
    }, [id, formatSongs, spotifyApi]);

    // Render error state
    if (status.isError) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Alert severity="error">Kunde inte hämta spellistan. Kontrollera din anslutning eller försök igen.</Alert>
            </Box>
        );
    }

    return (
        <Box id="Playlist__page" sx={{ backgroundColor: 'background.paper', flex: 1, overflow: 'auto' }}>
            <Box
                p={{ xs: 3, md: 4 }}
                sx={{
                    width: '100%',
                    background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%);',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
                    gap: 3,
                    boxSizing: 'border-box',
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {status.isLoading ? (
                    <Skeleton
                        variant="square"
                        sx={{ width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
                    />
                ) : (
                    <Avatar
                        src={playlistInfo?.image}
                        variant="square"
                        alt={playlistInfo?.name}
                        sx={{ boxShadow: 15, width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
                    />
                )}
                <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>Playlist</Typography>
                    {status.isLoading ? (
                        <Skeleton variant="text" sx={{ fontSize: { xs: 42, md: 72 }, width: 200 }} />
                    ) : (
                        <Typography sx={{ fontSize: { xs: 42, md: 72 }, fontWeight: 'bold', color: 'text.primary' }}>
                            {playlistInfo?.name}
                        </Typography>
                    )}
                </Box>
            </Box>
            {songs.length === 0 && !status.isLoading ? (
                <Typography sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                    Den här spellistan har inga låtar.
                </Typography>
            ) : (
                <SongTable songs={songs} loading={status.isLoading} spotifyApi={spotifyApi} />
            )}
        </Box>
    );
};

export default Playlist;