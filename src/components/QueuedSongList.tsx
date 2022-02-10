import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from "@mui/material/Typography";
import QueuedSong from './QueuedSong'


const QueuedSongList = () => {
  const theme = useTheme();
  const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const song = {
    title: "LÜNE",
    artist: "MÖÖN",
    thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg",
    id: new Date().getDate()
  }

  return (
    greaterThanMd ? (
      <div style={{margin: "10px 0"}}>
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({length: 5}, () => song).map(s => (
          <QueuedSong key={s.id} song={s}/>
        ))}
      </div>
    ) : null
  )
}

export default QueuedSongList
