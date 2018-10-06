import React, { Component } from "react";
import { Button, Glyphicon } from "react-bootstrap";

class Algorithms extends Component {

  constructor (props) {
    super(props);
    this.state = {
      testScenarios: [
        {arr: ["abba", "anna", "nana", "dorothy"], result: "", arrForPrism: "[abba, anna, nana, dorothy]"},
        {arr: ["cat", "dog", "sheep", "parrot"], result: "", arrForPrism: "[cat, dog, sheep, parrot]"}
      ]
    }
  }

  /**
   * Checks if any word in the given array (scenario) is an anagram of any other word in the same array
   * @param scenario {array}
   * @returns {boolean}
   */
  checkAnagram(scenario) {
    return true;
  }

  startTesting = () => {
    const scenarioResults = this.state.testScenarios.map(scenario => {
      scenario.result = this.checkAnagram(scenario.arr) ? "passed" : "failed";
      return (
        scenario
      )
    })
    this.setState({
      testScenarios: scenarioResults
    })
  }

  render() {
    return (
      <section className="algorithm">
        <h2>Algorithms</h2>
        <p>Given an array of words, write a function that checks whether any word in
          the array is an anagram of another word in the array. E.g.:
        </p>
        <pre>
          <code className="language-javascript">
            [ abba, anna, nana, dorothy ] => true
          </code>
        </pre>
        <pre>
          <code className="language-javascript">
            [ cat, dog, sheep, parrot ] => false
          </code>
        </pre>
        <p>
          The function can be in any language or pseudocode, it should take one
          array as an argument
          and return true or false.
        </p>
        <p><i>Bonus: what is the time complexity of your function?</i></p>
        <h3>Answer</h3>
        <p>Test Cases:</p>
        <div className="test-case-scenarios">
          {this.state.testScenarios.map ((scenario, index) => (
            <div key={index} className="test-case">
              <pre>
                <code className="language-javascript">
                  {scenario.arrForPrism}
                </code>
              </pre>
              <Glyphicon
                className={scenario.result === "passed" ? "passed" : "default"}
                glyph="ok-circle"
              />
              <Glyphicon
                className={scenario.result === "failed" ? "failed" : "default"}
                glyph="remove-circle"
              />
            </div>
          ))}
        </div>
        <Button bsStyle="primary" onClick={this.startTesting}>Begin Testing</Button>
      </section>
    )
  }
}

export default Algorithms
