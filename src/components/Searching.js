import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class Searching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleModal = () => {
    this.setState({
      show: !this.state.show
    });
  }
  handleKeyClose = (e) => {
    if (e.which === 27) {
      this.handleModal();
    }
  }
  render() {
    return (
      <section className="searching">
        <h2>Searching</h2>
        <p>Using react-bootstrap how would one close a modal when escape key is pressed?</p>
        <h2>Answer</h2>
        <div onKeyDown={this.handleKeyClose}>
          <Modal show={this.state.show}>
            <Modal.Header>
              <Modal.Title>Simple Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>If I set</p>
              <pre>
                onHide={"{"}this.handleClose{"}"}
              </pre>
              <p>in the Modal Element
                <i>(and remove currently added onKeyDown handler)</i>
                it will enable by default <b>Esc</b> key as an option to close the modal.
                It will also enable click-outside closing functionality.
              </p>
              <p><b>That would be my first choice.</b></p>
              <p>Another way would be to use an event
                handler which is how the <b>Esc</b> closing works here.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Button onClick={this.handleModal} bsStyle="primary">Open Modal</Button>
      </section>
    );
  }
}

export default Searching;
