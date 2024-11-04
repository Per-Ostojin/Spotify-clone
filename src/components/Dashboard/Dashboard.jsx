import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';

const Dashboard = ({ spotifyApi }) => {
    return <Box>
        <Box>
            <Routes>
                <Route path='/playlist/:id' element={<div>Playlist</div>} />
                <Route path='/library' element={<div>Library</div>} />
                <Route path='/' element={<Home />} />
            </Routes>
        </Box>
    </Box>
};

export default Dashboard;