import {createTheme} from '@mui/material/styles';
import {teal, purple} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal[700]
    },
    secondary: {
      main: purple[700]
    },
  },
})

export default theme
