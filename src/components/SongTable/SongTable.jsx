import { Box, Divider, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SongRow from '../SongRow/SongRow';

const SongTable = ({}) => {
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
				<Grid sx={{ width: 35, display: 'flex', alignItems: 'center'}} item>
					#
				</Grid>
				<Grid item sx={{flex: 1, display:'flex', alignItems: 'center'}} >
					Title
				</Grid>
				<Grid xs={3} item sx={{display: { sx: 'none', md: 'flex' } }} >
					Album
				</Grid>
				<Grid xs={3} item sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}} >
                <AccessTimeIcon sx={{width: 20, height: 20}} />
				</Grid>
			</Grid>
            <Box pb={2} >
                <Divider sx={{width: '100%', height: 1 }} />
            </Box>
            <SongRow />
            <SongRow />
            <SongRow />
		</Box>
	);
};

export default SongTable;
