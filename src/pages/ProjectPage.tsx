import { Card, CardContent, Container, Typography } from "@mui/material"
import NavigationBar from "../components/NavigationBar";

const ProjectPage: React.FC = () => {
    return (
      <>
        <NavigationBar />

        <Container maxWidth={false} sx={{ pb: "100px", maxWidth: "1200px" }}>
          <Card sx={{ mt: 4, p: 2 }}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
                Unser Neubauprojekt - Das Mädchen-Schülerwohnheim
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Wir laden Sie herzlich ein, die Entstehung des Mädchen-Schülerwohnheims in Duisburg-Meiderich zu unterstützen und gemeinsam in die Zukunft unserer Kinder zu investieren.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Unser Ziel ist es, jungen Mädchen aus verschiedenen Regionen eine sichere und förderliche Umgebung zu bieten, in der sie neben ihrer schulischen Ausbildung auch eine werteorientierte religiöse Bildung erhalten. 
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Mit Ihrer großzügigen Spende ermöglichen Sie nicht nur ein sicheres Zuhause, sondern fördern zugleich die persönliche, geistige und akademische Entwicklung dieser Mädchen.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </>
    );
}
        
export default ProjectPage;