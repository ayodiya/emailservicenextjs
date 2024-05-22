"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

// Define an interface for the user details
interface UserDetails {
  nameExists: {
    name: string;
    totalUnreadMessages: number;
  };
}

export default function Navbar() {
  const [data, setData] = useState<UserDetails | null>(null);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_PROD_MODE === "test"
          ? `${process.env.NEXT_PUBLIC_API_URL_TEST}/api/user/ayo`
          : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/api/user/ayo`,
      );

      setData(data);
    } catch (error) {
      Notify.failure("Failed to fetch email details");
    }
  };
  useEffect((): void => {
    getUserDetails();
  }, []);

  return (
    <Box>
      <AppBar elevation={0} position="static">
        <Toolbar>
          <Box
            sx={{
              color: "black",
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            Hello {data?.nameExists?.name.toUpperCase()}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge
                badgeContent={data?.nameExists?.totalUnreadMessages}
                color="error"
              >
                <MailIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
