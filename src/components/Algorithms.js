import React, { Component } from "react";
import { Button, Glyphicon } from "react-bootstrap";

class Algorithms extends Component {

  constructor (props) {
    super(props);
    this.state = {
      testScenarios: [
        {arr: ["abba", "anna", "nana", "dorothy"], result: ""},
        {arr: ["cat", "dog", "sheep", "parrot"], result: ""},
        {arr: ["1:Apple Macintosh", "2:Microsoft", "3:Linux", "4:Laptop Machines"], result: ""},
        {arr: ["Madonna of the Rocks!", "'So dark, the con of man'"], result: ""},
        {arr: ["meat", "banana", "chicken", "apple", "hamburger"], result: ""}
      ],
      testingCompleted: false
    }
  }

  /**
   * Checks if any word in the given array (scenario) is an anagram of any other word in the same array
   * Removes all symbols,numbers,spaces and checks if one word uses ALL letters of any other.
   * @param scenario {array}
   * @returns {boolean}
   */
  checkAnagram(scenario) {
    const formatWord = (word) => {
      return word.toLowerCase()
        .replace(/[\W\d]/g,"")
        .split("")
        .sort((a, b) => {
          if (a < b) return -1;
          else if (a > b) return 1;
          return 0;
        })
        .join("")
    }
    for (let i = 0; i < scenario.length; i++) {
      for (let j = i + 1; j < scenario.length; j++) {
        if ( formatWord(scenario[i]) === formatWord(scenario[j])) {
          return true;
        }
      }
    }
    return false;
  }

  startTesting = () => {
    // Starts testing by looping through all of the test scenarios and updates scenario result.
    if (!this.state.testingCompleted) {
      const scenarioResults = this.state.testScenarios.map(scenario => {
        scenario.result = this.checkAnagram(scenario.arr) ? "passed" : "failed";
        return (
          scenario
        )
      })
      this.setState({
        testScenarios: scenarioResults,
        testingCompleted: true
      })
    }
  }

  render() {
    const { testingCompleted } = this.state;
    return (
      <section className="algorithm">
        <h2>Algorithms</h2>
        <p>Given an array of words, write a function that checks whether any word in the array is an anagram of another word in the array. E.g.:</p>
        <pre>
          <code className="language-javascript"> [ abba, anna, nana, dorothy ] => true </code>
        </pre>
        <pre>
          <code className="language-javascript"> [ cat, dog, sheep, parrot ] => false </code>
        </pre>
        <p>The function can be in any language or pseudocode, it should take one array as an argument and return true or false.</p>
        <p><i>Bonus: what is the time complexity of your function?</i></p>
        <h2>Answer</h2>
        <p>Test Cases:</p>
        <div className="test-case-scenarios">
          {this.state.testScenarios.map ((scenario, index) => (
            <div key={index} className="test-case">
              <pre>
                <code className="language-javascript">{JSON.stringify(scenario.arr)}</code>
              </pre>
              <Glyphicon className={scenario.result === "passed" ? "passed" : "default"} glyph="ok-circle"/>
              <Glyphicon className={scenario.result === "failed" ? "failed" : "default"} glyph="remove-circle"/>
            </div>
          ))}
        </div>
        <Button bsStyle="primary" onClick={this.startTesting}>{testingCompleted ? "Testing Finished" : "Begin Testing"}</Button>
        <p><small>Time complexity of this functions is: O(N<sup>2</sup>)</small></p>
      </section>
    )
  }
}

export default Algorithms
