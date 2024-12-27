import { Stack, Typography, Slider, Box, IconButton } from "@mui/material";
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from "@mui/icons-material";
import { useState } from "react";

const PlayerControls = ({ is_paused, duration, progress, player }) => {
    return ( <Stack direction={'column'} spacing={2} justify={'center'} sx={{ width: '100%' }} >
        <Stack>Play knappar</Stack>
        <Stack>Progress || Slider</Stack>
    </Stack> );
}
 
export default PlayerControls;