import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import AppHeader from "./component/AppHeader";
import PlaylistTable from "./container/playlist";
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Replace with your desired font
    fontSize: 15,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppHeader />
          <Box sx={{display: "flex", justifyContent: "center", mt: 2 }}>
            <PlaylistTable />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;
