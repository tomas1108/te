import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ArchiveBox,
  Bell,
  CircleDashed,
  MagnifyingGlass,
  UserPlus,
  Users,
} from "phosphor-react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import BottomNav from "../../layouts/dashboard/BottomNav";
import ChatElement from "../../components/ChatElement";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import Friends from "../../sections/Dashboard/Friends";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";

import ScrollbarNormal from "../../components/ScrollbarNormal";
import NotificationBell from "../../components/NotificationBell";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { GroupAdd, PersonAdd, PersonAddAlt, PersonAddAlt1 } from "@mui/icons-material";
import CreateGroup from "../../sections/main/CreateGroup";

const user_id = window.localStorage.getItem("user_id");

// Hàm chuyển đổi từ định dạng "dd/MM/yyyy HH:mm:ss" thành "yyyy-MM-ddTHH:mm:ss"
const convertToISODate = (dateString) => {
  const [day, month, year, hour, minute, second] = dateString.split(/[/\s:]/);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};


const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();

  

  // Lấy danh sách cuộc trò chuyện từ Redux
  const { conversations } = useSelector((state) => state.conversation.direct_chat);
  const { current_conversation } = useSelector((state) => state.conversation.direct_chat  );
   
  


  // State cho search query
  const [searchQuery, setSearchQuery] = useState("");

  // Sử dụng useEffect để fetch danh sách cuộc trò chuyện khi component mount
  useEffect(() => {
    const user_id = window.localStorage.getItem("user_id"); // Lấy user_id từ local storage
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      console.log("Get direct conversations", data);
      // Dispatch action để lưu danh sách cuộc trò chuyện vào Redux
      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, [dispatch]);

  // State và hàm xử lý cho dialog Add friend
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // State và hàm xử lý cho dialog Create group
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const handleOpenCreateGroup = () => {
    setOpenNewGroup(true);
  };
  const handleCloseCreateGroup = () => {
    setOpenNewGroup(false);
  };

  // Hàm xử lý thay đổi search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Lọc conversations dựa trên search query
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const sortedConversations = filteredConversations
    .slice() // Tạo bản sao của mảng
    .sort((a, b) => new Date(convertToISODate(b.time)) - new Date(convertToISODate(a.time)));

  // Kiểm tra đầu ra đã được sắp xếp
  console.log("sorted conversations", sortedConversations);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: isDesktop ? 320 : "100vw",
          backgroundColor:
            theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {!isDesktop && <BottomNav />}

        <Stack p={3} spacing={2} sx={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Stack alignItems="center" justifyContent="space-between" direction="row">
            <Typography variant="h5">Chats</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Tooltip title="Add friend">
                <IconButton onClick={handleOpenDialog} sx={{ width: "max-content" }}>
                  <PersonAddAlt1 />
                </IconButton>
              </Tooltip>
              <Tooltip title="Create group">
                <IconButton onClick={handleOpenCreateGroup}>
                  <GroupAdd />
                </IconButton>
              </Tooltip>
              <NotificationBell /> {/* Thêm component NotificationBell */}
            </Stack>
          </Stack>

          {/* Search Box */}
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Search>
          </Stack>

          <Divider />

          {/* Danh sách các cuộc trò chuyện */}
          <Stack sx={{ flexGrow: 1 }}>
            <ScrollbarNormal autoHeightMin="75vh">
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  All Chats
                </Typography>
                {/* Dùng conversations đã được sắp xếp mới nhất đầu */}
                {sortedConversations.map((conversation, idx) => (
                  <ChatElement key={idx} {...conversation} />
                ))}

              </Stack>
            </ScrollbarNormal>
          </Stack>
        </Stack>
      </Box>

      {/* Dialog Add friend */}
      {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />}

      {/* Dialog Create group */}
      {openNewGroup && <CreateGroup open={openNewGroup} handleClose={handleCloseCreateGroup} />}
    </>
  );
};

export default Chats;
