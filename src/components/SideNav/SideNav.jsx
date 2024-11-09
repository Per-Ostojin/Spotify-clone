import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';

const SideNav = ({ SpotifyApi, token }) => {
	return (
		<Box sx={{
            backgroundColor: 'background.default',
            width: 230,
            height: '100%',
            flexDirection: 'column',
        }}
        >
			<Box p={3}>
				<img src="/Spotify_Logo.png" alt="Spotify logo" width={'75%'} />
			</Box>
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflow: 'auto', flex: 1 }}>
                {/*Playlists */}
                Pop
            </Box>
		</Box>
	);
};
export default SideNav;
