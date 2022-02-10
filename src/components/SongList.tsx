import {CircularProgress} from "@mui/material";
import Song from './Song'
import {useQuery} from "@apollo/client";
import {GET_SONGS} from "../graphql/queries";



const SongList = () => {
const {data, loading, error} = useQuery(GET_SONGS);

  if (loading) {
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 50
    }}>
      <CircularProgress color="primary"/>
    </div>
  }

  if (error) {
    return <div>Error fetching songs</div>
  }

  return (
    <div>
      {/* @ts-ignore */}
      {data.songs.map(s => <Song key={s.id} song={s} />)}
    </div>
  )
}

export default SongList
