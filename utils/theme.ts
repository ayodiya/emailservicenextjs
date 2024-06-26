"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#FBF7EC",
    },
    secondary: {
      main: "#F69220",
    },
  },
  typography: {
    fontFamily: [roboto.style.fontFamily].join(","),
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: "#FFFFFF",
      },
    },
  },
});

export default theme;
