"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { ColorRing } from "react-loader-spinner";
import { useEffect, useState } from "react";

import { EMAIL_LIST_ROUTE } from "@/utils/routes";

interface IMessage {
  _id: string;
  sender: string;
  subject: string;
  content: string;
  isRead: boolean;
}

type IAllMessage = IMessage[];

async function getUserEmails() {
  const res = await fetch(
    process.env.PROD_MODE === "test"
      ? `${process.env.API_URL_TEST}/api/message/get-messages/ayo`
      : `${process.env.API_URL_LIVE}/api/message/get-messages/ayo`,
  );

  return res.json();
}

export default function Messages() {
  const [allMessages, setAllMessages] = useState<IAllMessage>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMessages = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_PROD_MODE === "test"
          ? `${process.env.NEXT_PUBLIC_API_URL_TEST}/api/message/get-messages/ayo`
          : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/api/message/get-messages/ayo`,
      );

      setAllMessages(data.allMessages);
    } catch (error) {
      Notify.failure("Failed to fetch email details");
    }
    setLoading(false);
  };
  useEffect((): void => {
    getMessages();
  }, []);

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
        <Stack spacing={2}>
          {allMessages.map(
            ({ _id, sender, subject, content, isRead }: IMessage) => (
              <Card
                key={_id}
                component={Link}
                href={`${EMAIL_LIST_ROUTE}/${_id}`}
                sx={{
                  maxWidth: 345,
                  backgroundColor: isRead ? "primary.main" : "secondary.main",
                }}
              >
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
                        {subject}
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {content.slice(0, 50) + "..."}
                    </Typography>
                    <Box
                      sx={{
                        paddingTop: "30px",
                      }}
                    >
                      {sender}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ),
          )}
        </Stack>
      )}
    </Box>
  );
}
