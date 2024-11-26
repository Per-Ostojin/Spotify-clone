import { Box, Typography, Avatar } from "@mui/material"

const Playlist = ({ spotifyApi, token }) => {
    return <Box id="Playlist__page" sx={{backgroundColor: 'background.paper', flex: 1, overflow: 'auto', }} >
        <Box p={{ xs: 3, md: 4 }} sx={{
            width: '100%',
            background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%);',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: {xs: 'flex-start', md: "flex-end", xl: 'center'},
            gap: 3,
            boxSizing: "border-box",
            flexDirection: { xs: 'column', md: 'row' }

        }} >
            <Avatar 
            src={null} 
            variant="square" 
            alt={null} 
            sx={{ boxShadow: 15, width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235} }} />
            <Box>
                <Typography sx={{fontSize: 12, fontWeight: 'bold', color: 'text.primary'}}>Playlist</Typography>
                <Typography sx={{fontSize: { xs: 42, md: 72 }, fontWeight: 'bold', color: 'text.primary' }}>
                    Fake Playlist name
                    </Typography>
            </Box>
        </Box>
    </Box>
};

export default Playlist;