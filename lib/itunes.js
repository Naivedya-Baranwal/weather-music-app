import axios from 'axios';

export const searchTracksByGenre = async (genre) => {
  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: genre,
        media: 'music',
        entity: 'musicTrack',
        limit: 10,
      },
    });

    return response.data.results.map(track => ({
      id: track.trackId,
      name: track.trackName,
      artists: [{ name: track.artistName }],
      preview_url: track.previewUrl,
      album: {
        images: [
          { url: track.artworkUrl100 || '' }
        ],
      },
    })).filter(track => track.preview_url); 
  } catch (error) {
    console.error('iTunes fetch error:', error);
    return [];
  }
};
