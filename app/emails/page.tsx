import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import { EMAIL_LIST_ROUTE } from "@/utils/routes";

interface IAllMessage {
  _id: string;
  sender: string;
  subject: string;
  content: string;
  isRead: boolean;
}

async function getUserEmails() {
  const res = await fetch(
    `${process.env.API_URL_TEST}/api/message/get-messages/ayo`,
  );

  return res.json();
}

export default async function Messages() {
  const data = await getUserEmails();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <Stack spacing={2}>
        {data?.allMessages.map(
          ({ _id, sender, subject, content, isRead }: IAllMessage) => (
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
    </Box>
  );
}
