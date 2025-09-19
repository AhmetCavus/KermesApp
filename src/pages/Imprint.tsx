import { Card, CardContent, Container, Typography } from "@mui/material"
import NavigationBar from "../components/NavigationBar"

const ImprintPage: React.FC = () => {
    return (
      <>
        <NavigationBar />

        <Container maxWidth={false} sx={{ pb: "100px", maxWidth: "1200px" }}>
          <Card sx={{ mt: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h4" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
                    Impressum
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    VBIM e.V. <br />
                    Hagenauer Str. 57 <br />
                    47137 Duisburg <br />
                    Deutschland
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Kontakt: <br />
                    E-Mail: vbim@vorstand-eu.de
                </Typography>
            </CardContent>
          </Card>
        </Container>
      </>
    );
}

export default ImprintPage