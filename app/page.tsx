import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";

import { EMAIL_LIST_ROUTE } from "@/utils/routes";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "300px",
          width: { xs: "300px", md: "500px" },
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Stack spacing={3}>
          <Box
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            You have 3 unread messages out of 10 total
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              href={EMAIL_LIST_ROUTE}
              sx={{
                color: "black",
                backgroundColor: "orange",
                "&:hover": {
                  color: "black",
                  backgroundColor: "orange",
                },
              }}
            >
              View Messages
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
