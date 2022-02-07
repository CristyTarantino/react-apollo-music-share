import AddSong from "./components/AddSong"
import Header from "./components/Header"
import SongList from "./components/SongList"
import SongPlayer from "./components/SongPlayer"
import Grid from "@mui/material/Grid"
import theme from "./theme"
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles';
import {Hidden, useMediaQuery} from "@mui/material";

declare module "@mui/private-theming" {
  interface DefaultTheme {
    spacing: (spacing: number) => string;
  }
}

function App() {
  const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Hidden only="xs">
          <Header/>
        </Hidden>
        <Grid container spacing={3}>
          <Grid
            style={{
              paddingTop: greaterThanSm ? 88 : 10
            }}
            item
            xs={12}
            md={7}
          >
            <AddSong/>
            <SongList/>
          </Grid>
          <Grid
            style={
              greaterThanMd
                ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 50
                }
                : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0
                }
            }
            item
            xs={12}
            md={5}
          >
            <SongPlayer/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
