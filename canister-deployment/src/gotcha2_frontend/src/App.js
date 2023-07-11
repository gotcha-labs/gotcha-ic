import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import Locales from "./ui-component/Locales";
import NavigationScroll from "./layout/NavigationScroll";

// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from "./ui-component/extended/Snackbar";

// auth provider
import { AuthProvider } from "./contexts/AuthContext";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <Locales>
          <NavigationScroll>
            <AuthProvider>
              <>
                <Routes />
                <ToastContainer />
                <Snackbar />
              </>
            </AuthProvider>
          </NavigationScroll>
        </Locales>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
