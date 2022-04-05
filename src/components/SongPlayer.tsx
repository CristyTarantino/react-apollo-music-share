import QueuedSongList from "./QueuedSongList";
import {Card, CardContent, CardMedia, IconButton, Slider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Pause, PlayArrow, SkipNext, SkipPrevious} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {SongContext} from "../App";
import {useContext} from "react";

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
  // @ts-ignore
  const {state, dispatch} = useContext(SongContext);
  const classes = useStyles();

  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
            <div className={classes.controls}>
              <IconButton>
                <SkipPrevious />
              </IconButton>
              <IconButton onClick={
                // @ts-ignore
                handleTogglePlay
              }>
                {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon}/>}
              </IconButton>
              <IconButton>
                <SkipNext/>
              </IconButton>
              <Typography variant="subtitle1" component="p" color="textSecondary">
                {state.song.duration}
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
          image={state.song.thumbnail}
        />
      </Card>
      <QueuedSongList/>
    </>
  )
}

export default SongPlayer
