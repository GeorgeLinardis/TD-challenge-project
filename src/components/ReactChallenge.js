import React, { Component } from "react";
import { Button } from "react-bootstrap";
import GistHeader from "./GistHeader";
import GistScript from "./GistScript";

class ReactChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistData: "",
      perPage: 5,
      pageNumber: 1,
      noMoreResults: false
    }
  }

  componentDidMount() {
    this.getGists();
  }

  changePage = (num) => {
    let pageNumber = this.state.pageNumber + num;
    if (pageNumber <= 1) {
      pageNumber = 1;
    }
    this.setState({
      pageNumber
    }, () => this.getGists())
  }

  getGists = () => {
    const { perPage, pageNumber } = this.state;
    const url = `https://api.github.com/gists/public?page=${pageNumber}&per_page=${perPage}`;
    fetch(url)
      .then(response => response.json())
      .then(gistData => {
        console.log(gistData);
        this.setState({
          gistData
        })
      })
  }

  renderGists() {
    const { gistData } = this.state;
    // error preventing for pagination or requests limit limitations
    if (gistData.message) {
      return <p>{gistData.message}</p>
    }
    return gistData.map(gist => (
      <div key={gist.id} className="gist-container">
        <GistHeader
          gist={gist}
        />
        <GistScript/>
      </div>
    ))
  }

  render() {
    const maxPaginationNumber = 70;
    const { gistData, pageNumber } = this.state;
    return (
      <section className="react-challenge">
        <h2>React</h2>
        <p>By using Facebook’s <a href="https://github.com/facebook/create-react-app">create-react-app </a> &
          <a href="https://api.github.com/gists/public"> GitHub’s gist API </a>
          build a single page app that lists public gists with their author & html url.</p>
        <p><i>Bonus: include the gist's code in the listing.</i></p>
        <h2>Answer</h2>
        <div className="gists-container">
          {!gistData && <p>No Data Available</p>}
          {gistData && this.renderGists()}
          <div className="select-page-buttons">
            <Button
              disabled={pageNumber === 1}
              bsStyle="primary"
              onClick={() => this.changePage(-1)}
            >
              Previous Page
            </Button>
            {`- ${pageNumber} -`}
            <Button
              disabled={pageNumber >= maxPaginationNumber} // limited pagination for unauthorized users
              bsStyle="primary"
              onClick={() => this.changePage(+1)}
            >
              Next Page
            </Button>
          </div>
        </div>

      </section>
    )
  }
}

export default ReactChallenge;
