import {Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PlayArrow, Save} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";

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
  const {thumbnail, title, artist} = song
  const classes = useStyles()

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
              <IconButton size="small" color="primary">
                <PlayArrow/>
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


const SongList = () => {
  let loading = false

  const song = {
    title: 'Brividi',
    artist: 'Mahmood, BLANCO',
    thumbnail: 'https://i1.sndcdn.com/artworks-3p2IR8oJyDR9-0-t500x500.jpg'
  }

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

  return (
    <div>
      {/* @ts-ignore */}
      {Array.from({length: 10}, () => song).map((s, i) => <Song key={i} song={s} />)}
    </div>
  )
}

export default SongList
