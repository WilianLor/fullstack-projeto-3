import { createTheme } from "@mui/material";
import { colors } from "../constants/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.mainOrange,
    },
    text: {
      primary: colors.lightBlack,
    },
  },
});
