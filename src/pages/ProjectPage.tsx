import { Box, Button, Card, CardContent, CardMedia, Container, Slider, Stack, Typography } from "@mui/material"
import NavigationBar from "../components/NavigationBar";
import PayPalIcon from "@mui/icons-material/AccountBalanceWallet";
import HeroSlider from "../components/HeroSlider";

const PAYPAL_DONATE_URL = "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=ZXFAVXJMR9YZ4&source=qr&ssrt=1712499270632";

const ProjectPage: React.FC = () => {
    return (
      <>
        <NavigationBar />

        <Container maxWidth={false} sx={{ pb: "100px", maxWidth: "1200px" }}>
          <Card sx={{ mt: 4, p: 2 }}>
            <CardContent>
              <CardMedia component="img"
                         image={`${process.env.REACT_APP_DOMAIN}/kermes/images/kizkursuheader.jpg`}/>
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

              <HeroSlider
                slides={[
                  {
                    image: `${process.env.REACT_APP_DOMAIN}/kermes/images/donation/donation-01.jpeg`,
                    title: "",
                  },
                  {
                    image: `${process.env.REACT_APP_DOMAIN}/kermes/images/donation/donation-02.jpeg`,
                    title: "",
                  },
                  {
                    image: `${process.env.REACT_APP_DOMAIN}/kermes/images/donation/donation-03.jpeg`,
                    title: "",
                  },
                  {
                    image: `${process.env.REACT_APP_DOMAIN}/kermes/images/donation/donation-04.jpeg`,
                    title: "",
                  },
                      {
                    image: `${process.env.REACT_APP_DOMAIN}/kermes/images/donation/donation-05.jpeg`,
                    title: "",
                  },
                      {
                    image: `${process.env.REACT_APP_DOMAIN}/kermes/images/donation/donation-06.jpeg`,
                    title: "",
                  },
                      {
                    image: `${process.env.REACT_APP_DOMAIN}/kermes/images/donation/donation-07.jpeg`,
                    title: "",
                  },
                ]}
              />

              { /* Last Campaign */ }
              <Stack>
                <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
                  Letzte Spendenkampagne - Ein Stein für die Zukunft
                </Typography>
                <img src={`${process.env.REACT_APP_DOMAIN}/kermes/images/donation/campaign.jpeg`} alt="Letzte Spendenkampagne - Ein Stein für die Zukunft" />
              </Stack>
                     
              {
                /* Bank information */
              }

              <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
                Spendenkonto
              </Typography>
              <Typography variant="body1">
                VBIM e.V. <br />
                IBAN: DE85 3504 0038 0414 5397 00 <br />
                BIC:  COBADEFFXXX<br />
                Bank: Commerzbank <br />
                Verwendungszweck: Spende Mädchenwohnheim
              </Typography>
              
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<PayPalIcon />}
                        href={PAYPAL_DONATE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          mt: 4,
                          px: 4,
                          py: 1.5,
                          fontWeight: 700,
                          fontSize: "1rem",
                          textTransform: "none",
                        }}>
                  Jetzt mit PayPal spenden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </>
    );
}
        
export default ProjectPage;