import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import SideNav from '../SideNav/SideNav'
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';

const Dashboard = ({ spotifyApi }) => {
    const [ token, setToken ] = useState(getAccessTokenFromStorage())

    useEffect(() => {
        async function onMount() {
            await spotifyApi.setAccessToken(token)
        }

        if (token) onMount();
    }, []);

    return ( <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex'}}>
            <SideNav spotifyApi={spotifyApi} token={token} />
            <Routes>
                <Route path='/playlist/:id' element={<div>Playlist</div>} />
                <Route path='/library' element={<div>Library</div>} />
                <Route path='/' element={<Home />} />
            </Routes>
        </Box>
    </Box>
    )
};

export default Dashboard;