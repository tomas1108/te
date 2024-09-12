import {
  Avatar,
  Container,
  Stack,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import avatar from "../../assets/Images/favicon.ico";
import { useScreenDetector } from "../../hooks/useScreenDectector";
import { useTheme } from "@mui/material/styles";

const MainLayout = () => {
  const theme = useTheme();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isMobile, isTablet, isDesktop } = useScreenDetector();

  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      maxWidth="lg"
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: isMobile ? 4 : 0,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 2,
            }}
            src={avatar}
          />
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            GENZ Chat
          </Typography>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "50%",
            alignSelf: "center",
            borderWidth: 0.5,
            borderColor: "grey.500",
          }}
        />

        <Box sx={{ flex: 1, ml: 10 }}>
          <Outlet />
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          py: 2,

          mt: "auto",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://www.facebook.com/Doo2002/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "none" }}
          >
            Tomas Do
          </a>
          . All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default MainLayout;
