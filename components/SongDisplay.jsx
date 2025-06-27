'use client'
import React, { useEffect, useState } from 'react';
import { searchTracksByGenre } from '@/lib/itunes';
import {
  Box, Card, CardContent, CardMedia, IconButton, Typography,
} from '@mui/material';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';


const SongDisplay = ({ genre, selectedTrack, setSelectedTrack, paused, setPaused,setTrackList,setCurrentIndex }) => {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    async function fetchSongs() {
      const data = await searchTracksByGenre(genre);
      setTracks(data);
      setTrackList(data);
    }
    fetchSongs();
  }, [genre]);

  const handlePlayPause = (track,idx) => {
    if (selectedTrack?.id === track.id) {
      setPaused(!paused);
    } else {
      setCurrentIndex(idx);
      setSelectedTrack(track);
      setPaused(false);
    }
  }

  return (

    <div style={{display: 'flex',flexDirection: 'column',alignItems:'center',marginBottom:"180px"}}>
      {
        tracks.map((track,idx)=>(
          <Card key={track.id}  sx={(theme) => ({
            display: 'flex',
            width: '40%',
            justifyContent: 'space-between',
            my: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(255,105,180,0.3), rgba(30,144,255,0.3))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            transformStyle: 'preserve-3d',
            '&:hover': {
              transform: 'scale(1.02) perspective(1000px) translateZ(20px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
            },
            [theme.breakpoints.down('md')]: {
              width: '75%',
            },
          })}
         >
          <Box sx={{ display: 'flex', justifyContent: 'space-around' ,alignItems:'center',flex:'auto'}}>

          <IconButton
            sx={{width:'50px' ,height:'50px'}}

            onClick={()=>handlePlayPause(track,idx)}
          >
            {selectedTrack?.id===track.id && !paused ? (
              <PauseRounded sx={{ fontSize: '3rem' }} />
            ) : (
              <PlayArrowRounded sx={{ fontSize: '4rem' }} />
            )}
          </IconButton>
            <CardContent sx={{flexWrap:'wrap',width:'75%' }}>
              <Typography  component="div" variant="subtitie1">
              {track.name}
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ color: 'text.secondary' }}
              >
               Artist: {track.artists[0].name}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151  }}
            image={track.album.images[0]?.url}
            alt={track.name}
          />
        </Card>
        ))
      }
    </div>
  )
}

export default SongDisplay
