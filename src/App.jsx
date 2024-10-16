import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Login from './pages/Login';

function App({ spotifyApi }) {
	console.log(spotifyApi);
	return (
		<Box className="App">
			<h1>Techover Self Made - Spotify</h1>
			<Login/>
		</Box>
	);
}

export default App;
