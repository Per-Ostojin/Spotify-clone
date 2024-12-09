import { Box, Divider, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SongRow from '../SongRow/SongRow';

const SongTable = ({ songs, loading, spotifyApi }) => {
	console.log({ songs, loading, spotifyApi });

	const renderSongs = () => {
		if (loading) {
			return [1, 2, 3, 4, 5].map((e, i) => <SongRow loading={loading} key={i} i={i} images={null} />);
		}

		return songs.map((song, i) => (
			<SongRow
				album={song.album.name}
				images={song.album.images}
				title={song.name}
				artist={song.artists[0].name}
				duration={song.duration_ms / 1000}
				key={i}
				i={i}
			/>
		));
	};

	return (
		<Box
			p={{ xs: 3, md: 4 }}
			sx={{
				flex: 1,
				overflow: 'auto',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Grid container px={2} p={1} sx={{ width: '100%', color: 'text.secondary', fontSize: 14 }}>
				<Grid sx={{ width: 35, display: 'flex', alignItems: 'center' }} item>
					#
				</Grid>
				<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
					Title
				</Grid>
				<Grid xs={3} item sx={{ display: { sx: 'none', md: 'flex' } }}>
					Album
				</Grid>
				<Grid xs={3} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<AccessTimeIcon sx={{ width: 20, height: 20 }} />
				</Grid>
			</Grid>
			<Box pb={2}>
				<Divider sx={{ width: '100%', height: 1 }} />
			</Box>
			{renderSongs()}
		</Box>
	);
};

export default SongTable;
