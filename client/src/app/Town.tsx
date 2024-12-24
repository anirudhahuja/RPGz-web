import { Parallax } from 'react-parallax';
import backgroundImage from '../assets/village.gif';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';

export function Town() {
  return (
    <Parallax bgImage={backgroundImage} strength={0}>
      <Container id="town">
        {/* Menu containing character info, quest log, etc. */}
          <Card className="character-menu parchment-panel">
            <Tabs
              defaultActiveKey="char-info"
              id="uncontrolled-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="char-info" title="Character Info">
                <Card.Title>
                  <h2 style={{ textAlign: 'center' }}>Character Info</h2>
                </Card.Title>
                <Card.Body>
                  <h5> Name: Placeholder (Lv 1) </h5>
                  <h5> Class: Novice </h5>
                  <h5> XP: (0/100)</h5>
                  <h5> Health: 100 </h5>
                  <h5> Stamina: 50 </h5>
                  <h5> Strength: 10 &nbsp;&nbsp;(100 to next level) </h5>
                  <h5> Agility: 10 &nbsp;&nbsp;(100 to next level) </h5>
                  <h5> Intelligence: 10 &nbsp;&nbsp;(100 to next level) </h5>
                  <h5> Wisdom: 10 &nbsp;&nbsp;(100 to next level) </h5>
                  <h5> Willpower: 1 &nbsp;&nbsp;(1000 to next level) </h5>
                </Card.Body>
              </Tab>
              <Tab eventKey="quest-log" title="Quest Log">
                <Card.Title>
                  <h2 style={{ textAlign: 'center' }}>Quest Log</h2>
                </Card.Title>
                <Card.Body>
                  <h5> Push-ups (0/20) </h5>
                  <h5> Squats (0/20) </h5>
                  <h5> Lunges (0/20) </h5>
                  <h5> Plank (0/3) </h5>
                  <h5> Sit-ups (0/20) </h5>
                  <h5> Wall sits (0/15) </h5>
                  <h5> Step-ups (0/10) </h5>
                  <h5> Glute bridges (0/20) </h5>
                  <h5> Side planks (0/3) </h5>
                  <h5> Tricep dips (0/10) </h5>
                </Card.Body>
              </Tab>
            </Tabs>
            
          </Card>
      </Container>
    </Parallax>
  );
}

export default Town;
