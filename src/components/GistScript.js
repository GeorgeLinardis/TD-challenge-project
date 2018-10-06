import React, { Component } from "react";
import Prism from "prismjs";

class GistScript extends Component {

  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    return (
      <div className="gist-script">
      <pre>
        <code className="language-javascript">
          const name = testing && checking
        </code>
      </pre>
      </div>
    )
  }
}

export default GistScript;
