import { Container, Col, Row, Form, Button } from "react-bootstrap";

// context
import { useAuctionApi } from "../AuctionApi";
// components
import AddAuction from "../components/AddAuction";
export default function Create() {
  const { createAuction } = useAuctionApi();
  return (
    <Container className="p-4">
      <Row>
        <Col className="m-4">
          <h1 className="text-center">Skapa Ny Annons</h1>
          <p>
            Välkommen till vår plattform för auktionsförsäljning! Här kan du
            enkelt skapa en annons för att sälja dina prylar på auktion med
            lätthet och professionalism.{" "}
          </p>
          <p>
            När du skapar din annons, kommer den att starta automatiskt samma
            dag och tid som du skapar den, vilket ger dig omedelbar synlighet på
            vår plattform. För att ge dig flexibilitet och kontroll över din
            försäljning, har varje auktion en maximal längd på 12 dagar,
            exklusive den aktuella dagen. Detta ger både säljare och köpare en
            tydlig tidsram för transaktionen.
          </p>
          <p>
            Vi förstår att det kan uppstå behov att ta bort en annons under
            vissa omständigheter. Därför erbjuder vi möjligheten att ta bort en
            auktion så länge inga bud har lagts. För att säkerställa rättvisa
            och korrekta transaktioner, krävs verifiering genom{" "}
            <strong>"CreatedBy"</strong> -värdet när du tar bort auktionen.
          </p>
          <p>
            Med dessa funktioner och riktlinjer kan du enkelt och säkert skapa
            en framgångsrik auktion för att sälja dina prylar på vår plattform.
          </p>
          <p>
            Genom att skapa en annons, så godkänner du alla villkor. Lycka till.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="m-4 d-flex justify-content-center">
          <AddAuction onCreateAuction={createAuction} />
        </Col>
      </Row>
    </Container>
  );
}
