import { red } from "@material-ui/core/colors";
// import { fuseDark } from "@fuse/fuse-colors";

const themesConfig = {
  default: {
    palette: {
      type: "light",
      primary: {
        light: "#87EFFF",
        main: "#4DBCE9",
        dark: "#008CB7",
        contrastText: "#FFF"
      },
      secondary: {
        light: "#FFFF83",
        main: "#D1E751",
        dark: "#9DB516"
      }
    },
    error: red,
    status: {
      danger: "orange"
    }
  }
};

export default themesConfig;
