import React, { Component } from "react";
import GistHeader from "./GistHeader";
import GistScript from "./GistScript";

class ReactChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistData: "",
      perPage: 2,
      pageNumber: 1
    }
  }

  componentDidMount() {
    this.getGists();
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
    const { gistData } = this.state;
    return (
      <section className="react-challenge">
        <h2>React</h2>
        <p>By using Facebook’s <a href="https://github.com/facebook/create-react-app">create-react-app </a> &
          <a href="https://api.github.com/gists/public"> GitHub’s gist API </a>
          build a single page app that lists public gists with their author & html url.</p>
        <p><i>Bonus: include the gist's code in the listing.</i></p>
        <h2>Answer</h2>
        {!gistData && <p>No Data Available</p>}
        {gistData && this.renderGists()}

      </section>
    )
  }
}

export default ReactChallenge;
