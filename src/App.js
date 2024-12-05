import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ThemeSettings from "./components/settings";
import ThemeProvider from "./theme";
import Router from "./routes";
import { closeSnackBar } from "./redux/slices/app";
import { socket } from "./socket";

const vertical = "bottom";
const horizontal = "center";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function App() {
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);

  useEffect(() => {
    function handleBeforeUnload(e) {
      console.log('socket:', socket); // Kiểm tra giá trị của socket
      if (socket) {
        socket.emit("end", { user_id });
      } else {
        console.warn('socket is undefined');
      }
    }
  
    function handleKeyDown(e) {
      e = e || window.event;
      const isF5 = (e.which || e.keyCode) === 116;
      const isCtrlR = e.ctrlKey && (e.which || e.keyCode) === 82;
      if (isF5 || isCtrlR) {
        e.preventDefault();
        window.location.href = 'https://te-git-main-tomasdos-projects.vercel.app/';
      }
    }
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user_id]);
  

  const { severity, message, open } = useSelector((state) => state.app.snackbar);

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          <Router />
        </ThemeSettings>
      </ThemeProvider>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(closeSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              console.log("This is clicked");
              dispatch(closeSnackBar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}

export default App;
