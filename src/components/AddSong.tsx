import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField} from "@mui/material";
import {AddBoxOutlined, Link} from "@mui/icons-material";
import {useState, useEffect, useCallback} from "react";
import {makeStyles} from "@mui/styles";
import ReactPlayer from "react-player"
import {useMutation} from "@apollo/client";
import {ADD_SONG} from "../graphql/mutations";

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

const DEFAULT_SONG = {
  duration: 0,
  title: '',
  artist: '',
  thumbnail: '',
  url: ''
}

const AddSong = () => {
  const [addSong, {error}] = useMutation(ADD_SONG)
  const [dialog, setDialog] = useState(false)
  const [url, setUrl] = useState('')
  const [playable, setPlayable] = useState(false)
  const [song, setSong] = useState(DEFAULT_SONG)

  const classes = useStyles()

  const handleAddDialog = async () => {
    const {url, thumbnail, duration, title, artist} = song
    try {
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        }
      })
      handleCloseDialog()
      setSong(DEFAULT_SONG)
      setUrl('')
    } catch (err) {
      console.error("Error adding song", err)
    }
  }

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

  const getInfo = useCallback(async () => {
    if (url) {
      const response = await fetch(`https://noembed.com/embed?url=${url}`)
      const {author_name, thumbnail_url, title} = await response.json()

      setSong(prevState => ({
        ...prevState,
        title,
        artist: author_name,
        thumbnail: thumbnail_url,
        url,
      }))
    }
  }, [url])

  const handleEditSong = (player: ReactPlayer) => {
    setSong(prevState => ({
      ...prevState,
      duration: player.getDuration()
    }))
  }

  useEffect(() => {
    setPlayable(ReactPlayer.canPlay(url))
    getInfo()
  }, [getInfo, url])

  const handleInputError = (field: any) => {
    // @ts-ignore
    return error?.graphQLErrors[0]?.extensions?.path?.includes(field)
  }

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
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={song.title}
            onChange={handleChangeSong}
            error={handleInputError('title')}
            helperText={handleInputError('title') && 'Fill out field'}
          />
          <TextField
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            value={song.artist}
            onChange={handleChangeSong}
            error={handleInputError('artist')}
            helperText={handleInputError('artist') && 'Fill out field'}
          />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            value={song.thumbnail}
            onChange={handleChangeSong}
            error={handleInputError('thumbnail')}
            helperText={handleInputError('thumbnail') && 'Fill out field'}
          />
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color="secondary">
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleAddDialog}
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
      {url && <ReactPlayer hidden url={url} onReady={handleEditSong}/>}
    </div>
  )
}

export default AddSong
