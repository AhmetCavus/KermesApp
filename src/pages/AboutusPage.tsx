import { Card, CardContent, Container, Typography } from "@mui/material"
import NavigationBar from "../components/NavigationBar"

const AboutusPage: React.FC = () => {
    return (
      <>
        <NavigationBar />

        <Container maxWidth={false} sx={{ pb: "100px", maxWidth: "1200px" }}>
          <Card sx={{ mt: 4, p: 2 }}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
                Über uns
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Willkommen beim VBIM e.V. Wir sind eine gemeinnützige
                Organisation, die sich der Unterstützung und Förderung der
                muslimischen Gemeinschaft. Unser Ziel ist es, ein integratives
                Umfeld zu schaffen, das soziale, kulturelle und religiöse
                Dienste anbietet, um ein harmonisches Zusammenleben zu fördern.
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
                Soziales Engagement
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Als Verein sammeln wir Spenden und religiöse Opfergaben, um
                bedürftige Personen zu unterstützen und gemeinnützige
                Institutionen zu fördern. Unser Ziel ist es, einen positiven
                Beitrag zur Gemeinschaft zu leisten und Menschen in Not zu
                helfen.
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
                Jugendförderung und Bildung
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Wir legen besonderen Wert auf die Unterstützung und Förderung
                von Jugendlichen durch gezielten Nachhilfe- und
                Förderunterricht, der individuell auf ihre Bedürfnisse
                zugeschnitten ist. Unser Ziel ist es, ihnen die bestmöglichen
                Bildungschancen zu bieten und sie auf ihrem Weg zu unterstützen.
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
                Integration und kultureller Austausch
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Als Verein sammeln wir Spenden und religiöse Opfergaben, um
                bedürftige Personen zu unterstützen und gemeinnützige
                Institutionen zu fördern. Unser Ziel ist es, einen positiven
                Beitrag zur Gemeinschaft zu leisten und Menschen in Not zu
                helfen.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </>
    );
}

export default AboutusPage