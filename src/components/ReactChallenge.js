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
      pageNumber: 1
    }
  }

  componentDidMount() {
    this.getGists();
  }

  changePage = (num) => {
    const paginationLimit = 70;
    let pageNumber = this.state.pageNumber + num;
    if (pageNumber <= 1) {
      pageNumber = 1;
    }
    if (pageNumber >= paginationLimit) {
      pageNumber = paginationLimit;
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
        const additionalParameters = {};
        // error check for pagination or requests limitations for unauthorized users - check gist api documentation
        if (gistData.message) {
          if (gistData.message.includes("rate")) {
            additionalParameters.limitError = gistData.message;
          } else {
            additionalParameters.errorMsg = gistData.message
          }
        }
        this.setState({
          gistData,
          ...additionalParameters
        })
      })
  }

  getFiles = (files) => {
    const formattedFiles = [];
    for (const keys in files) {
      formattedFiles.push({filename: files[keys].filename, url: files[keys]["raw_url"], type: files[keys].type, language: files[keys].language})
    }
    return formattedFiles;
  }

  renderGists() {
    const { gistData, errorMsg, limitError } = this.state;
    const displayError = errorMsg || limitError;
    if (displayError) {
      return <p>{displayError}</p>
    }
    return gistData.map(gist => {
      const files = this.getFiles(gist.files);
      return (
        <div key={gist.id} className="gist-container">
          <GistHeader
            gist={gist}
          />
          <small>Total files: {files.length}</small>
          {files.map((file, index) => <GistScript key={index} file={file} />)}
        </div>
      )}
    )
  }

  render() {
    const { gistData, pageNumber, errorMsg, limitError } = this.state;
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
              disabled={!!limitError || pageNumber === 1}
              bsStyle="primary"
              onClick={() => this.changePage(-1)}
            >
              Previous Page
            </Button>
            {`- ${pageNumber} -`}
            <Button
              disabled={!!errorMsg}
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
