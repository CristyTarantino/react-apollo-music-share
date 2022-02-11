import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField} from "@mui/material";
import {AddBoxOutlined, Link} from "@mui/icons-material";
import {useState, useEffect} from "react";
import {makeStyles} from "@mui/styles";
import ReactPlayer from "react-player"

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: 'center'
  },
  thumbnail: {
    width: '90%'
  }
}));

const AddSong = () => {
  const [dialog, setDialog] = useState(false)
  const [url, setUrl] = useState('')
  const [playable, setPlayable] = useState(false)
  const [song, setSong] = useState({
    duration: 0,
    title: '',
    artist: '',
    thumbnail: '',
  })

  const classes = useStyles()

  const handleCloseDialog = () => {
    setDialog(false)
  }
  const handleChangeSong = (event: any) => {
    const {name, value} = event.target
    setSong(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleEditSong = async (player: ReactPlayer) => {
    const response = await fetch(`https://noembed.com/embed?url=${url}`)
    const {author_name, thumbnail_url, title} = await response.json()
    const duration = player.getDuration()

    setSong({
      duration,
      title,
      artist: author_name,
      thumbnail: thumbnail_url
    })
  }

  useEffect(() => {
    setPlayable(ReactPlayer.canPlay(url))
  }, [url])

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={song.thumbnail}
            alt="Song Thumbnail"
            className={classes.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth value={song.title} onChange={handleChangeSong}/>
          <TextField margin="dense" name="artist" label="Artist" fullWidth value={song.artist}
                     onChange={handleChangeSong}/>
          <TextField margin="dense" name="thumbnail" label="Thumbnail" fullWidth value={song.thumbnail}
                     onChange={handleChangeSong}/>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color="secondary">
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleCloseDialog}
              color="primary">
              Add Song
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <TextField
        onChange={event => setUrl(event.target.value)}
        className={classes.urlInput}
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        variant="standard"
        value={url}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link/>
            </InputAdornment>
          )
        }}
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined/>}>
        Add
      </Button>
      {url && <ReactPlayer url={url} hidden onReady={handleEditSong}/>}
    </div>
  )
}

export default AddSong
