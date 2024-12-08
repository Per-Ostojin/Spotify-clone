import { Box, Typography, Avatar, Skeleton } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const Playlist = ({ spotifyApi, token }) => {
	const [playlistInfo, setplaylistInfo] = useState();
	const [ songs, setSongs ] = useState();
	const [ status, setStatus ] = useState({ isLoading: true, isError: null });
	const { id } = useParams();

	const formatSongs = useCallback(
		(items) =>
			items.map((item, i) => {
				console.log({ item, i });
				const { track } = item;
				track.contextUri = `spotify:playlist:${id}`;
				track.position = i;
				return track;
			}),
		[id]
	);

	useEffect(() => {
		const getData = async () => {
			setStatus({ isLoading: true, isError: null });
			try {
				const playlistDetails = await spotifyApi.getPlaylist(id);
				setplaylistInfo({
					image: playlistDetails.body.images[0].url,
					name: playlistDetails.body.name
				});
				console.log(playlistDetails);
				const { items } = playlistDetails.body.tracks;
				const formatedSong = formatSongs(items);
				setSongs(formatedSong);
			} catch (e) {
				console.error(e);
				setStatus({ isLoading: false, isError: e });
			}
		};

		getData().finally(() => {
			setStatus({ isLoading: false, isError: null });
		});
	}, [id, formatSongs]);

	return (
		<Box id="Playlist__page" sx={{ backgroundColor: 'background.paper', flex: 1, overflow: 'auto' }}>
			<Box
				p={{ xs: 3, md: 4 }}
				sx={{
					width: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%);',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
					gap: 3,
					boxSizing: 'border-box',
					flexDirection: { xs: 'column', md: 'row' }
				}}
			>
				{status.isLoading ? (
					<Skeleton
						variant="square"
						sx={{ width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
					/>
				) : (
					<Avatar
						src={playlistInfo?.image}
						variant="square"
						alt={playlistInfo?.name}
						sx={{ boxShadow: 15, width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
					/>
				)}
				<Box>
					<Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>Playlist</Typography>
					{status.isLoading ? (
                        <Skeleton variant='text' sx={{ fontSize: { xs: 42, md: 72 }, width: 200 }} />
                    ) : (
                        <Typography sx={{ fontSize: { xs: 42, md: 72 }, fontWeight: 'bold', color: 'text.primary' }}>
						{playlistInfo?.name}
                        </Typography>
                    )}
				</Box>
			</Box>
		</Box>
	);
};

export default Playlist;
