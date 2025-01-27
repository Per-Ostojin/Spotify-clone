import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import SideNav from '../SideNav/SideNav';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';
import Playlist from '../../pages/Playlist';
import Player from '../Player/Player';
import MobileNav from '../MobileNav/MobileNav';
import Library from '../../pages/Library';

const Dashboard = ({ spotifyApi }) => {
    const [token, setToken] = useState(getAccessTokenFromStorage());

    // Set token in Spotify API when it changes
    useEffect(() => {
        async function setApiToken() {
            if (token) {
                try {
                    await spotifyApi.setAccessToken(token);
                    console.log('Spotify API token set.');
                } catch (error) {
                    console.error('Failed to set Spotify API token:', error);
                }
            }
        }

        setApiToken();
    }, [token, spotifyApi]);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Main Layout */}
            <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
                <SideNav spotifyApi={spotifyApi} token={token} />
                <Routes>
                    <Route path="/playlist/:id" element={<Playlist spotifyApi={spotifyApi} token={token} />} />
                    <Route path="/library" element={<Library spotifyApi={spotifyApi} token={token} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Box>

            {/* Player and Mobile Navigation */}
            {token && <Player spotifyApi={spotifyApi} token={token} />}
            <MobileNav />
        </Box>
    );
};

export default Dashboard;