import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import useResponsive from "../../hooks/useResponsive";
import AntSwitch from "../../components/AntSwitch";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebar, UpdateSidebarType } from "../../redux/slices/app";
import ScrollbarNormal from "../../components/ScrollbarNormal";
import { updateStatusNotice } from "../../redux/slices/notification";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this Contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteChatDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const dispatch = useDispatch();

  const { current_messages, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const user_email = useSelector((state) => state.auth.user_email);
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { playSound } = useSelector((state) => state.notifications);

  const handleMuteToggle = (event) => {
    const newMutedStatus = event.target.checked;
    dispatch(updateStatusNotice(!newMutedStatus));
    console.log(`Notifications are ${newMutedStatus ? "muted" : "unmuted"}`);
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const messageTypes = ["Document", "Link", "Image"];
  const filteredMessages =
    current_messages?.filter((msg) => messageTypes.includes(msg.type)) || [];
  const messageCount = filteredMessages.length;

  return (
    <Box sx={{ width: !isDesktop ? "100vw" : 320, maxHeight: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: theme.palette.background.default,
          }}
          p={2}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            alignContent={"center"}
            justifyContent="center"
            spacing={3}
          >
            <Typography variant="subtitle2" color={"text.primary"}>
              Contact Info
            </Typography>
            {/* <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton> */}
          </Stack>
          <Divider sx={{ borderWidth: 0.5, borderColor: "grey.400" }} />
        </Box>
        <ScrollbarNormal autoHeightMin={600} autoHide={false}>
          <Stack
            sx={{
              height: "100%",
              position: "relative",
              flexGrow: 1,
            }}
            p={3}
            spacing={3}
          >
            <Stack
              sx={{ justifyContent: "center", alignItems: "center" }}
              direction="column"
              spacing={2}
            >
              <Avatar
                src={current_conversation?.img}
                alt={current_conversation?.name}
                sx={{ height: 64, width: 64 }}
              />
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Typography variant="article" fontWeight={600} sx={{spacing:2}}>
                  {current_conversation?.name}
                </Typography>
                <IconButton sx={{ fontSize: 18, p: 0 }}>
                  {" "}
               
                  <BorderColorIcon fontSize="inherit" />{" "}
                  {/* Sử dụng fontSize từ IconButton */}
                </IconButton>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-evenly"}
            >

              
              {/* <Stack alignItems={"center"} spacing={1}>
                <IconButton>
                  <Phone />
                </IconButton>
                <Typography variant="overline">Voice</Typography>
              </Stack>
              <Stack alignItems={"center"} spacing={1}>
                <IconButton>
                  <VideoCamera />
                </IconButton>
                <Typography variant="overline">Video</Typography>
              </Stack> */}
            </Stack>


            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Bell size={21} />
                <Typography variant="subtitle2" color="text.primary">
                  Mute Notifications
                </Typography>
              </Stack>
              <AntSwitch checked={!playSound} onChange={handleMuteToggle} />
            </Stack>
            <Divider sx={{ borderWidth: 0.25, borderColor: "grey.300" }} />
            <Stack spacing={0.5}></Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle2" color={"text.primary"}>
                Media, Links & Docs
              </Typography>
              <Button
                onClick={() => {
                  dispatch(UpdateSidebarType("SHARED"));
                }}
                endIcon={<CaretRight />}
              >
                {messageCount || 0}
              </Button>
            </Stack>
            <Stack direction={"row"} alignItems="center" spacing={2}>
              {current_messages
                .filter((message) => message.type === "Image") // Lọc ra chỉ các tin nhắn là hình ảnh
                .slice(0, 3) // Chỉ lấy tối đa 3 tin nhắn đầu tiên
                .map((message, idx) => (
                  <Box key={idx}>
                    <img src={message.text} alt={`Image ${idx + 1}`} />
                  </Box>
                ))}
            </Stack>
            {/* <Divider /> */}
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Star size={21} />
                <Typography variant="subtitle2">Starred Messages</Typography>
              </Stack>
              <IconButton
                onClick={() => {
                  dispatch(UpdateSidebarType("STARRED"));
                }}
              >
                <CaretRight />
              </IconButton>
            </Stack> */}
            <Divider sx={{ borderWidth: 0.25, borderColor: "grey.300" }} />
            
  

            <Stack direction="row" alignItems={"center"} spacing={2}> 
              <Button
                onClick={() => {
                  setOpenBlock(true);
                }}
                fullWidth
                startIcon={<Prohibit />}
                variant="outlined"
              >
                Block
              </Button>
              <Button
                onClick={() => {
                  setOpenDelete(true);
                }}
                fullWidth
                startIcon={<Trash />}
                variant="outlined"
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </ScrollbarNormal>
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteChatDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};

export default Contact;
