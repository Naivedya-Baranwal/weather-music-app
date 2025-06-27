'use client'
import React, { useState } from 'react';
import SongDisplay from '@/components/SongDisplay';
import MusicPlayerSlider from '@/components/MusicPlayerSlider';

const MusicApp = ({genre}) =>{
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [paused, setPaused] = useState(true);
    const [trackList, setTrackList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
        <SongDisplay 
        genre={genre} 
        selectedTrack={selectedTrack} 
        setSelectedTrack={setSelectedTrack}
        paused={paused}
        setPaused={setPaused}
        setTrackList={setTrackList}
        setCurrentIndex={setCurrentIndex}
        />
        { selectedTrack && (
            <MusicPlayerSlider
            track={selectedTrack}
            paused={paused}
            setPaused={setPaused}
            trackList={trackList}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setSelectedTrack={setSelectedTrack}
            />
        )
        }
        </>
    )
}

export default MusicApp;

