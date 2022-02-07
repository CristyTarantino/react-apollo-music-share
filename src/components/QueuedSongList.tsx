import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from "@mui/material/Typography";
import {Avatar, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
});

const QueuedSong = ({song}:any) => {
  const classes = useStyles();
  const {
  thumbnail, artist, title
} = song;

return (
  <div className={classes.container}>
    <Avatar src={thumbnail} alt="Song thumbnail" className={classes.avatar}/>
    <div className={classes.songInfoContainer}>
      <Typography variant="subtitle2" className={classes.text}>
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body2"
        className={classes.text}
      >
        {artist}
      </Typography>
    </div>
    <IconButton>
      <Delete color="error"/>
    </IconButton>
  </div>
);
}

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
