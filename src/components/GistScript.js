import React, { Component } from "react";
import Prism from "prismjs";


class GistScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptContent: "Script is not available"
    }
  }
  componentDidMount() {
    this.fetchScript();
  }

  fetchScript () {
    const { url, type } = this.props.file;
    console.log(type);
    fetch(url)
      .then(response => response.text())
      .then(scriptContent => (
        this.setState({
            scriptContent
          }, () => Prism.highlightAll())
        )
      )
  }


  render() {
    const { scriptContent } = this.state;
    const { filename, language } = this.props.file;
    console.log({language})
    return (
      <div className="gist-script">
        <div className="gist-script-info">
          <div className="gist-filename">
            File name: <i>{filename}</i>
          </div>
          <div className="gist-language">
            Language: <i>{language || "Unknown"}</i>
          </div>
        </div>
        <pre>
          <code className={`language-${language && language.toLowerCase() || "text"}`}>
            {scriptContent}
          </code>
        </pre>
      </div>
    )
  }
}

export default GistScript;
