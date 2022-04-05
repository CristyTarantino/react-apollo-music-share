import {makeStyles} from "@mui/styles";
import {Card, CardActions, CardContent, CardMedia, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Pause, PlayArrow, Save} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import {SongContext} from "../App";

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3)
  },
  songInfoContainer: {
    display: "flex",
    alignItems: 'center'
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  thumbnail: {
    objectFit: 'cover',
    width: 140,
    height: 140
  }
}));

const Song = ({song}: any) => {
  const {thumbnail, title, artist, id} = song
  const classes = useStyles()
  // @ts-ignore
  const {state, dispatch} = useContext(SongContext)
  const [currentSongPlaying, setCurrentSongPlaying] = useState(false)

  useEffect(() => {
    setCurrentSongPlaying(state.isPlaying && id === state.song.id)
  }, [id, state.isPlaying, state.song.id])

  const handleTogglePlay = () => {
    dispatch({type: "SET_SONG", payload: { song }})
    dispatch(state.isPlaying ? {type: "PAUSE_SONG"} : {type: "PLAY_SONG"});
  }

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail}/>
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleTogglePlay} size="small" color="primary">
              {currentSongPlaying ? <Pause /> : <PlayArrow/> }
            </IconButton>
            <IconButton size="small" color="secondary">
              <Save/>
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  )
}

export default Song
