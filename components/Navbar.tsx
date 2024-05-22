"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { AddBoxOutlined } from "@mui/icons-material";

export default function Navbar() {
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
            Hello Name
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
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
