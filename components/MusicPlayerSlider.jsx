'use client'
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

const WallPaper = styled('div')({
  position: 'absolute',
  width: '60%',
  height: '100%',
  top: 0,
  left: '20%',
  overflow: 'hidden',
  borderRadius: 16,
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&::before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&::after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 15,
  borderRadius: 16,
  width: '60%',
  maxWidth: '100%',
  margin: 'auto',
  position:'relative',
  zIndex: 1,
  backgroundColor: 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0,0,0,0.6)',
  }),
}));

const CoverImage = styled('div')({
  width: 60,
  height: 60,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider({track, paused, setPaused, trackList, currentIndex, setCurrentIndex, setSelectedTrack }) {

  const audioRef = useRef(null);
  const [position, setPosition] = React.useState(0);
  const [duration,setDuration] = useState(30);
  const [volume,setVolume] = useState(0.3);
  
  const handleNext = () => {
    if (currentIndex < trackList.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedTrack(trackList[nextIndex]);
      setPaused(false);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedTrack(trackList[prevIndex]);
      setPaused(false);
    }
  };  

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!track?.preview_url) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(track.preview_url);
    audio.volume = volume;
    audioRef.current = audio;

    const updateTime = () => setPosition(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);

    if (!paused) {
      audio.play().catch((err) =>
        console.warn('Playback failed:', err.message)
      );
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [track]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (paused) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) =>
        console.warn('Playback failed:', err.message)
      );
    }
  }, [paused]);

 
  const handleSeek = (_,value) => {
    const audio = audioRef.current;
    audio.currentTime = value;
    setPosition(value);
  }
  
  const handleVolumeChange = (_, value) => {
    const audio = audioRef.current;
    audio.volume = value / 100;
    setVolume(value / 100);
  };

  const formatDuration=(value) => {
    const minute = Math.floor(value / 60);
    const second = Math.floor(value % 60);
    return `${minute}:${second < 10 ? `0${second}` : second}`;
  };

  return (
    <Box sx={{   position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 999,
      p: 3,
     }}>
      <Widget  sx={{
            mt: -2,
            display: 'flex' ,
            
          }}>
        <Box sx={{ display: 'flex' ,justifyContent:'center',alignItem:'center',mt:2,width:'30%', 
        '@media (max-width: 900px)': {
              display: 'none',
            }, }}>
          <CoverImage>
            <img alt={track.name} src={track.album.images[0]?.url} />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
               {track.artists[0].name}
            </Typography>
            <Typography noWrap sx={{ letterSpacing: -0.25 }}>
            {track.name} 
            </Typography>
          </Box>
        </Box>
       
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'column',
            width:'45%',
            mt: -1,
            '& svg': {
              color: '#000',
              ...theme.applyStyles('dark', {
                color: '#fff',
              }),
            },
            '@media (max-width: 900px)': {
              width:'100%',
            },
          })}
        >
        <Box>
        <IconButton 
        aria-label="rewind" 
        onClick={handlePrev}
        disabled={currentIndex===0}
        >
          <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: '3rem' }} />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} />
            )}
          </IconButton>
          <IconButton aria-label="forward" 
          disabled={currentIndex===trackList.length-1}
          onClick={handleNext} 
          >
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Box>
        <Box sx={{display:'flex',justifyContent:'space-between',width:'90%',}}>
           <TinyText>{formatDuration(position)}</TinyText>
             <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
           <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={handleSeek}
          sx={(t) => ({
            color: 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                ...t.applyStyles('dark', {
                  boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                }),
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
            ...t.applyStyles('dark', {
              color: '#fff',
            }),
          })}
        />
      
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={(theme) => ({
            mb: 1,
            px: 1,
            ml:'2%',
             width:'20%',
            '& > svg': {
              color: 'rgba(0,0,0,0.4)',
              ...theme.applyStyles('dark', {
                color: 'rgba(255,255,255,0.4)',
              }),
            },
            [theme.breakpoints.down('md')]: {
              display: 'none',
              width:'0%',
            },
          })}
          alignItems="center"
        >
          <VolumeDownRounded />
          <Slider
            aria-label="Volume"
            value={volume * 100}
            onChange={handleVolumeChange}
            sx={(t) => ({
              color: 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
                backgroundColor: '#fff',
                '&::before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
              ...t.applyStyles('dark', {
                color: '#fff',
              }),
            })}
          />
          <VolumeUpRounded />
        </Stack>
      </Widget>
      <WallPaper />
    </Box>
  );
}

