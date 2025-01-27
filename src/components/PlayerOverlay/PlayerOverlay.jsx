import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayerControls from '../PlayerControls/PlayerControls';

const PlayerOverlay = ({ playerOverlayIsOpen, closeOverlay, progress, is_paused, duration, player, current_track }) => {
    return (
        <Box
            id="PlayerOverlay"
            sx={{
                width: '100%',
                height: 'calc(100vh - 75px)',
                backgroundColor: 'background.paper',
                display: { xs: 'block', md: 'none' },
                position: 'fixed',
                top: 0,
                left: 0,
                transition: 'all 0.3s',
                transform: playerOverlayIsOpen ? 'translateY(0px)' : 'translateY(100vh)',
                overflow: 'hidden',
            }}
        >
            <Container sx={{ height: '100%', background: 'linear-gradient(0deg, #121212 0%, #39d47250 100%)' }}>
                <Grid container direction={'column'} justifyContent="space-between" sx={{ height: '100%' }}>
                    {/* Close Button */}
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <IconButton onClick={closeOverlay} sx={{ paddingLeft: 0 }}>
                            <KeyboardArrowDownIcon fontSize="large" sx={{ color: 'text.primary' }} />
                        </IconButton>
                    </Grid>

                    {/* Album Artwork */}
                    <Grid
                        item
                        xs={5}
                        sx={{
                            backgroundImage: current_track?.album?.images?.[0]?.url
                                ? `url("${current_track.album.images[0].url}")`
                                : 'none',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fallback if no image
                        }}
                    ></Grid>

                    {/* Song Details */}
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                        <Typography sx={{ color: 'text.primary', fontSize: '28px' }}>
                            {current_track?.name || 'No song playing'}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '18px' }}>
                            {current_track?.artists?.map((artist) => artist.name).join(', ') || 'Unknown artist'}
                        </Typography>
                    </Grid>

                    {/* Player Controls */}
                    <Grid item xs={2}>
                        <PlayerControls
                            is_paused={is_paused}
                            duration={duration}
                            progress={progress}
                            player={player}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PlayerOverlay;