import { Box, Divider, Grid, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SongRow from '../SongRow/SongRow';

const SongTable = ({ songs = [], loading = false, spotifyApi }) => {
    console.log('SongTable props:', { songs, loading });

    // Render the list of songs
    const renderSongs = () => {
        if (loading) {
            // Render loading placeholders
            return Array.from({ length: 5 }).map((_, i) => (
                <SongRow loading={loading} key={`loading-${i}`} i={i} images={null} />
            ));
        }

        if (!songs || songs.length === 0) {
            // Render fallback message if no songs are available
            return (
                <Typography
                    sx={{
                        color: 'text.secondary',
                        textAlign: 'center',
                        marginTop: 2,
                        fontSize: 16,
                    }}
                >
                    No songs available.
                </Typography>
            );
        }

        // Safely map over the songs array
        return songs.map((song, i) => {
            const albumName = song?.album?.name || 'Unknown Album';
            const albumImages = song?.album?.images || [];
            const title = song?.name || 'Unknown Title';
            const artist = song?.artists?.map((a) => a.name).join(', ') || 'Unknown Artist';
            const duration = song?.duration_ms ? song.duration_ms / 1000 : 0;
            const position = song?.position || i;
            const contextUri = song?.contextUri || song?.uri || ''; // Fallback for playback URI

            return (
                <SongRow
                    album={albumName}
                    images={albumImages}
                    title={title}
                    artist={artist}
                    duration={duration}
                    key={song?.id || i} // Use song ID if available
                    i={i}
                    position={position}
                    contextUri={contextUri}
                    spotifyApi={spotifyApi}
                />
            );
        });
    };

    return (
        <Box
            p={{ xs: 3, md: 4 }}
            sx={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Table Header */}
            <Grid container px={2} p={1} sx={{ width: '100%', color: 'text.secondary', fontSize: 14 }}>
                <Grid sx={{ width: 35, display: 'flex', alignItems: 'center' }} item>
                    #
                </Grid>
                <Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    Title
                </Grid>
                <Grid xs={3} item sx={{ display: { xs: 'none', md: 'flex' } }}>
                    Album
                </Grid>
                <Grid xs={3} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <AccessTimeIcon sx={{ width: 20, height: 20 }} />
                </Grid>
            </Grid>

            <Box pb={2}>
                <Divider sx={{ width: '100%', height: 1 }} />
            </Box>

            {/* Song Rows */}
            {renderSongs()}
        </Box>
    );
};

export default SongTable;