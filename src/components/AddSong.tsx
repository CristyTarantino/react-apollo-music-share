import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField} from "@mui/material";
import {AddBoxOutlined, Link} from "@mui/icons-material";
import {useState} from "react";
import {makeStyles} from "@mui/styles";

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

  const classes = useStyles()

  const handleCloseDialog = () => {
    setDialog(false)
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
            src='https://e.snmc.io/i/600/w/f7c40163372328778f5c3edd52323106/9301798/blanco-blu-celeste-cover-art.jpg'
            alt="Song Thumbnail"
            className={classes.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth/>
          <TextField margin="dense" name="artist" label="Artist" fullWidth/>
          <TextField margin="dense" name="thumbnail" label="Thumbnail" fullWidth/>
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
        className={classes.urlInput}
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link/>
            </InputAdornment>
          )
        }}
      />
      <Button
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined/>}>
        Add
      </Button>
    </div>
  )
}

export default AddSong
