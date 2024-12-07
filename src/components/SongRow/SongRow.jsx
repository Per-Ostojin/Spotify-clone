import { Avatar, Box, Grid, Typography } from '@mui/material';

const SongRow = ({}) => {
	return (
		<Grid
			container
			px={2}
			p={1}
			sx={{
				width: '100%',
				color: 'text.secondary',
				fontSize: 14,
				cursor: 'pointer',
				'&:hover': { backgroundColor: '#ffffff10' }
			}}
		>
			<Grid sx={{ width: 35, display: 'flex', alignItems: 'center', fontSize: 16 }} item>
				1
			</Grid>
			<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2  }}>
				
                <Avatar src={null} alt={null} variant='square' />
                <Box>
                    <Typography sx={{fontSize: 16, color: 'text.primary'}} >Rich Flex</Typography>
                    <Typography sx={{fontSize: 12, color: 'text.primary'}} >Drake, 21 Savage</Typography>
                </Box>
			</Grid>
			<Grid xs={3} item sx={{ display: { sx: 'none', md: 'flex' } }}>
				Her Loss
			</Grid>
			<Grid xs={3} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
				3:32
			</Grid>
		</Grid>
	);
};

export default SongRow;
