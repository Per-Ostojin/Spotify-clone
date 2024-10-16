import { Box, Button } from '@mui/material';
import { accessUrl } from '../config/config';

const Login = () => {
	return (
		<Box>
			<img
				src="/Spotify_Logo.png"
				alt="spotify logo"
				style={{ marginBottom: 300, width: '70%', maxWidth: '500px' }}
			/>
            <Button color='primary' size='large' variant='contained' href={accessUrl} >
                Login to Spotify
            </Button>
		</Box>
	);
};

export default Login