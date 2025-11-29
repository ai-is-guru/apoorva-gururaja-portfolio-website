import React, { useState, useEffect } from 'react';

interface SpotifyPlayerProps {
  isPlaying: boolean;
  onPause: () => void;
  inline?: boolean; // If true, render inline instead of fixed position
}

// Export track info for use in other components
export const SPOTIFY_TRACK_INFO = {
  trackId: '6pWgRkpqVfxnj3WuIcJ7WP',
  trackName: 'Cornfield Chase',
  artistName: 'Hans Zimmer'
};

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ isPlaying, onPause, inline = false }) => {
  const [iframeKey, setIframeKey] = useState(0);

  // Spotify Embed Widget URL
  // Documentation: https://developer.spotify.com/documentation/widgets/generator/embed/
  // Note: Autoplay requires the iframe to be visible and in viewport
  const spotifyUrl = `https://open.spotify.com/embed/track/${SPOTIFY_TRACK_INFO.trackId}?utm_source=generator&theme=0${isPlaying ? '&autoplay=1' : ''}`;

  // Reload iframe when play state changes to trigger autoplay
  useEffect(() => {
    if (isPlaying) {
      setIframeKey(prev => prev + 1);
    }
  }, [isPlaying]);

  if (!isPlaying) {
    return null;
  }

  // Inline mode - render inside a card
  if (inline) {
    return (
      <div className="w-full flex items-center justify-center">
        <iframe
          key={`spotify-${iframeKey}`}
          src={spotifyUrl}
          width="352"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="eager"
          className="w-full max-w-[352px] h-[152px] rounded-lg"
          style={{ 
            border: 0,
            display: 'block'
          }}
          title="Spotify Player"
        />
      </div>
    );
  }

  // Fixed position mode (fallback)
  return (
    <div 
      style={{ 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '352px',
        height: '152px',
        borderRadius: '12px',
        overflow: 'hidden',
        zIndex: 1000,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        backgroundColor: '#1DB954'
      }}
    >
      <iframe
        key={`spotify-${iframeKey}`}
        src={spotifyUrl}
        width="352"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        style={{ 
          border: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        title="Spotify Player"
      />
    </div>
  );
};

export default SpotifyPlayer;

