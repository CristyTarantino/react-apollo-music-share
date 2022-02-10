import {makeStyles} from "@mui/styles";
import {Avatar, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Delete} from "@mui/icons-material";

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

const QueuedSong = ({song}: any) => {
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

export default QueuedSong
