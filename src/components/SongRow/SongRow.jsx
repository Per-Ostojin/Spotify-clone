import { Avatar, Box, Grid, Typography } from '@mui/material';

const SongRow = ({ images, title, artist, album, duration, i, loading }) => {
	const image = images?.length > 0 ? images[0].url : null;
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
				{i + 1}
			</Grid>
			<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
				<Avatar src={image} alt={null} variant="square" />
				<Box>
					<Typography sx={{ fontSize: 16, color: 'text.primary' }}>{title}</Typography>
					<Typography sx={{ fontSize: 12, color: 'text.primary' }}>{artist}</Typography>
				</Box>
			</Grid>
			<Grid xs={3} item sx={{ display: { sx: 'none', md: 'flex', alignItems: 'center' } }}>
				{album}
			</Grid>
			<Grid xs={3} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
				{duration}
			</Grid>
		</Grid>
	);
};

export default SongRow;
