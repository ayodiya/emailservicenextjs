"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { ColorRing } from "react-loader-spinner";

interface Message {
  subject: string;
  content: string;
  sender: string;
}

export default function ReadEmail() {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getMessage = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_PROD_MODE === "test"
          ? `${process.env.NEXT_PUBLIC_API_URL_TEST}/api/message/message-read/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/api/message/message-read/${id}`,
      );

      setMessage(data?.messageExists);
    } catch (error) {
      Notify.failure("Failed to fetch email details");
    }
    setLoading(false);
  }, [id]);

  useEffect((): void => {
    getMessage();
  }, [id, getMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
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
        <Card sx={{ maxWidth: 345, backgroundColor: "primary.main" }}>
          <CardActionArea>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    color: "black",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  {message?.subject}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {message?.content}
              </Typography>
              <Box
                sx={{
                  paddingTop: "30px",
                }}
              >
                {message?.sender}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </Box>
  );
}
