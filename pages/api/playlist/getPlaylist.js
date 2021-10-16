import getGist from '../getGist'

const PLAYLIST_GIST = '6d09e7d0d8696eb87460c7d5370bd079'

const getPlaylists = async (type = '') => {
  return getGist(PLAYLIST_GIST, type)
}

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

export default async (type) => {
  const playlists = await getPlaylists()
  if (type === 'list') {
    return playlists
  }
  if (type === 'random' && playlists)    {
    return randomProperty(playlists)
  }
  if (type && playlists[type]) {
    return playlists[type]
  } 
  return playlists['current']
  
}
