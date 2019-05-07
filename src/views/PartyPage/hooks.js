import { useEffect, useState } from 'react';
import {
  getPlaybackInformation,
  getRoomMembers,
  getToken,
  searchTracks
} from '../../services/ChlorineService';
import { connectPlayer } from '../../services/SpotifyPlaybackService';

function useMembersList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        const members = await getRoomMembers();
        setMembers(members);
      } catch (error) {
        console.error(error);
      }
    }

    prepare();
  }, []);

  return members;
}

function useSpotifyPlayer() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const getSpotifyToken = async function() {
      return await getToken();
    };

    async function getSpotifyPlayer(token) {
      return new Promise(resolve => {
        const playerReceiveInterval = setInterval(() => {
          let player = connectPlayer(token.access_token);
          if (player) {
            clearInterval(playerReceiveInterval);
            resolve(player);
          }
        }, 1000);
      });
    }

    async function prepare() {
      try {
        const token = await getSpotifyToken();
        const player = await getSpotifyPlayer(token);
        player.connect();
        setPlayer(player);
      } catch (error) {
        console.log(error);
      }
    }

    prepare();
  }, []);

  return player;
}

function useSongSearch() {
  const [songQuery, setSongQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(
    () => {
      async function prepare() {
        if (songQuery) {
          try {
            const songs = await searchTracks(songQuery);
            setSearchResult(songs.tracks.items);
          } catch (error) {
            console.log('Song search error');
            console.error(error);
          }
        }
      }

      prepare();
    },
    [songQuery]
  );

  return { searchResult, setSongQuery };
}

function usePlaybackInformation(player) {
  const [playbackInformation, setPlaybackInformation] = useState({});

  useEffect(() => {
    async function prepare() {
      try {
        const playback = await getPlaybackInformation();

        console.log(playback);
        const playbackInfo = {
          now: playback.progress_ms,
          duration: playback.Item ? playback.Item.duration_ms : NaN,
          artistTitle: playback.Item
            ? playback.Item.artists.map(artist => artist.name).join(', ')
            : '',
          songTitle: playback.Item ? playback.Item.name : '',
          albumCoverURL: playback.Item
            ? playback.Item.album.images.filter(
              image => image.width > 200 && image.width < 400
            )[0].url
            : ''
        };
        console.log(playbackInfo);
        setPlaybackInformation(playbackInfo);
      } catch (error) {
        console.error(error);
      }
    }

    prepare();
  }, []);

  useEffect(
    () => {
      if (player !== null) {
        player.onPlayerStateChanged(state => { /* TODO: add real-time playback update. */ });
      }
    },
    [player]
  );

  return playbackInformation;
}

export {
  useMembersList,
  useSpotifyPlayer,
  useSongSearch,
  usePlaybackInformation
};
