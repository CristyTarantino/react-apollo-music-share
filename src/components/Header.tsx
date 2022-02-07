import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetTwoTone from '@mui/icons-material/HeadsetTwoTone';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme => ({
  text: {
    marginLeft: theme.spacing(1)
  }
}));

const Header = () => {
  const classes = useStyles()

    return (
      <AppBar color="primary" position="fixed" enableColorOnDark>
        <Toolbar>
          <HeadsetTwoTone />
          <Typography className={classes.text} variant="h6" component="h1">
            Apollo Music Share
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default Header
