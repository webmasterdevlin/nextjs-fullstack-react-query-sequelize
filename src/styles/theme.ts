import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB6",
    },
    secondary: {
      main: "#FFD73F",
    },
    error: {
      main: "#F44335",
    },
    background: {
      default: "#FAFAFA",
    },
  },
});

export default theme;
