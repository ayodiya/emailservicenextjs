"use server";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

async function getUserDetails() {
  const res = await fetch(`${process.env.API_URL_TEST}/api/user/ayo`);

  return res.json();
}

export default async function Navbar() {
  const data = await getUserDetails();

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
