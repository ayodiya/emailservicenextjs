"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { ColorRing } from "react-loader-spinner";
import { useEffect, useState } from "react";

import { EMAIL_LIST_ROUTE } from "@/utils/routes";

interface UserDetails {
  nameExists: {
    totalMessages: string;
    totalUnreadMessages: number;
  };
}

export default function Home() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_PROD_MODE === "test"
          ? `${process.env.NEXT_PUBLIC_API_URL_TEST}/api/user/ayo`
          : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/api/user/ayo`,
      );

      setUserDetails(data);
    } catch (error) {
      Notify.failure("Failed to fetch email details");
    }
    setLoading(false);
  };
  useEffect((): void => {
    getUserDetails();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      {!loading && (
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
              You have {userDetails?.nameExists?.totalUnreadMessages} unread
              messages out of {userDetails?.nameExists?.totalMessages} total
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
      )}
    </Box>
  );
}
