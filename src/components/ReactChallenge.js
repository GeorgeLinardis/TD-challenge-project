import React, { Component } from "react";
import { Button, Badge, Glyphicon } from "react-bootstrap";
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

  /**
   * Changes pages which user sees. (min = 1, max = paginationLimit)
   * @param num
   */
  changePage = (num) => {
    const paginationLimit = 70;
    let pageNumber = this.state.pageNumber + num;
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    if (pageNumber >= paginationLimit) {
      pageNumber = paginationLimit;
    }
    this.setState({
      pageNumber
    }, () => this.getGists())
  }

  /**
   * Fetches gists from Github's gist API.
   * Using Github's gist API as a non authorized user you have limitations on pagination or total requests number.
   * If u reach the pagination limit you can go back to previous pages and see the results,
   * but if u reach the requests limit you won't be able to check any results for some time.
   */
  getGists = () => {
    const { perPage, pageNumber } = this.state;
    const url = `https://api.github.com/gists/public?page=${pageNumber}&per_page=${perPage}`;
    fetch(url)
      .then(response => response.json())
      .then(gistData => {
        const additionalParameters = {};
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
      .catch((error) => console.log(error))
  }

  // Restructures files by pushing them in an array and getting only needed information for GistScript
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
    return Array.isArray(gistData) && gistData.map(gist => {
      const files = this.getFiles(gist.files);
      return (
        <div key={gist.id} className="gist-container">
          <GistHeader
            gist={gist}
          />
          <small>Total files: <Badge>{files.length}</Badge></small>
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
              <Glyphicon glyph="chevron-left"/>
              Previous Page
            </Button>
            {`- ${pageNumber} -`}
            <Button
              disabled={!!errorMsg || !!limitError}
              bsStyle="primary"
              onClick={() => this.changePage(+1)}
            >
              Next Page
              <Glyphicon glyph="chevron-right"/>
            </Button>
          </div>
        </div>
      </section>
    )
  }
}

export default ReactChallenge;
