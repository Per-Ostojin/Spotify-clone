import './App.css';
import { Box } from '@mui/material';
import Login from './pages/Login';

function App({ spotifyApi }) {
	console.log(spotifyApi);
	return (
		<Box className="App">
			<Login/>
		</Box>
	);
}

export default App;
