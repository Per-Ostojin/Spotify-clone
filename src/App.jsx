import './App.css';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';

function App({ spotifyApi }) {
	console.log(spotifyApi);
	return (
		<Box className="App">
			<Dashboard spotifyApi={spotifyApi} />
		</Box>
	);
}

export default App;
