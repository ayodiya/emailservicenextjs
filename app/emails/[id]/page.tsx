import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function ReadEmail() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <Card sx={{ maxWidth: 345, backgroundColor: "secondary.main" }}>
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
                Lizard
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species...
            </Typography>
            <Box
              sx={{
                paddingTop: "30px",
              }}
            >
              fkfkffk
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
