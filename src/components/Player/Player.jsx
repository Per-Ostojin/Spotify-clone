import { Box, Grid, Typography, Avatar } from '@mui/material';

const Player = ({ spotifyApi }) => {
	return (
		<Box>
			<Grid container>
				<Grid xs={12} md={4} Items sx={{displey: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} >
					Bild, Title, Artist
				</Grid>
				<Grid
					Items
					sx={{
						displey: { xs: 'none', md: 'center' },
						justifyContent: 'center',
						alignItems: 'center'
					}}
					md={4}
				>
					Play knappen,
				</Grid>
				<Grid Items xs={6} md={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
					Volume
				</Grid>
			</Grid>
		</Box>
	);
};

export default Player;
