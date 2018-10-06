import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Searching from "./Searching";
import ReactChallenge from "./ReactChallenge";

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Header/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Searching/>
            <hr/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ReactChallenge/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
