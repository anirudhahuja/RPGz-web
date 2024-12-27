import React, { useState } from "react";
import { Parallax } from 'react-parallax';
import backgroundImage from '../assets/village.gif';
import playerGif from "../assets/player.gif"
import logo from "../assets/logo.png"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PlayerInfoMenu from './player-info';
import QuestLogMenu from './quest-log';


export function Town() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [playerInfoOpen, setPlayerInfoOpen] = useState(false);
    const [questLogOpen, setQuestLogOpen] = useState(false);

    const toggleMenu = () => {
        if (menuOpen) {
            setMenuOpen(false);
            setTimeout(() => {
                setPlayerInfoOpen(false);
                setQuestLogOpen(false);
            }, 300);
        } else {
            setMenuOpen(true);
        }
    };

    return (
        <Parallax bgImage={backgroundImage} strength={0}>
            <Container id="town">
                <img src={logo} alt="Logo" className="logo" />
                <Button
                    onClick={toggleMenu}
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer"
                    }}
                >
                    <img src={playerGif} alt="Character Idle Animation" className="player" />
                </Button>

                {menuOpen && (
                    <Container className={`player-menu ${menuOpen ? 'town-open' : 'town-close'}`}>
                        <Row>
                            <Col className="col-12 mb-3">
                                <Button
                                    className="player-menu-button w-100"
                                    onClick={() => {
                                        setPlayerInfoOpen(true);
                                        setMenuOpen(false);
                                    }}>
                                    Player Info
                                </Button>
                            </Col>
                            <Col className="col-12 mb-3">
                                <Button
                                    className="player-menu-button w-100"
                                    onClick={() => {
                                        setQuestLogOpen(true);
                                        setMenuOpen(false);
                                    }}>
                                    Quest Log
                                </Button>
                            </Col>
                            <Col className="col-12 mb-3">
                                <Button
                                    className="player-menu-button w-100"
                                    onClick={() => setMenuOpen(false)}
                                >Skills</Button>
                            </Col>
                        </Row>
                    </Container>
                )}

                <PlayerInfoMenu isOpen={playerInfoOpen} onClose={() => setPlayerInfoOpen(false)} />
                <QuestLogMenu isOpen={questLogOpen} onClose={() => setQuestLogOpen(false)} />
            </Container>
        </Parallax>
    );
}

export default Town;
