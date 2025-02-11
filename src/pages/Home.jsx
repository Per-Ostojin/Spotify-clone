import React from 'react';
import { Box, Button } from '@mui/material';

const Home = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 5
			}}
		>
			<img src="/perra.png" alt="Per Ostojin" style={{ maxWidth: '50%', maxHeight: '50%' }} />
			<Button
				size="large"
				variant="contained"
				target="_blank"
				rel="noopener noreferrer"
				href="https://pers-social-links.netlify.app/"
			>
				Kontakta Mig!
			</Button>
		</Box>
	);
};

export default Home;
