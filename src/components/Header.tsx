import { Box, Typography } from "@mui/material"

const Header: React.FC = () => {
    return (
      <>
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minHeight: "100vh", // full screen
            backgroundColor: "#fefefe", // fallback color
            backgroundImage: "url(/images/header.bg.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "contain", // or "contain" / custom px
            zIndex: -1,
          }}
        />
        <Typography variant="h4" gutterBottom marginTop={2}>
          Kermes 2025 Menü
        </Typography>
      </>
    );
}

export default Header