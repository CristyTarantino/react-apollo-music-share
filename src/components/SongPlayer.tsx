import QueuedSongList from "./QueuedSongList";
import {Card, CardContent, CardMedia, IconButton, Slider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PlayArrow, SkipNext, SkipPrevious} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px'
  },
  content: {
    flex: '1 0 auto'
  },
  thumbnail: {
    width: 150,
    height: 150
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

const SongPlayer = () => {
  const classes = useStyles();

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
            <div className={classes.controls}>
              <IconButton>
                <SkipPrevious />
              </IconButton>
              <IconButton>
                <PlayArrow className={classes.playIcon}/>
              </IconButton>
              <IconButton>
                <SkipNext/>
              </IconButton>
              <Typography variant="subtitle1" component="p" color="textSecondary">
                00:00:00
              </Typography>
            </div>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={0.2}
              min={0}
              step={1}
              max={5}
            />
          </CardContent>
        </div>
        <CardMedia
          className={classes.thumbnail}
          image="https://e.snmc.io/i/600/w/f7c40163372328778f5c3edd52323106/9301798/blanco-blu-celeste-cover-art.jpg"
        />
      </Card>
      <QueuedSongList/>
    </>
  )
}

export default SongPlayer
