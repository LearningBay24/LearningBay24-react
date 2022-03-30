import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'
export class Kursuebersicht extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [
        { name: "Prog1", taken: false, times: [[1, 2], [3, 2]] },
        { name: "Prog2", taken: false, times: [[0, 4], [4, 1]] },
        { name: "Prog3", taken: false, times: [[2, 2], [1, 1]] },
        { name: "Mathe1", taken: false, times: [[1, 3], [3, 4]] },
        { name: "Mathe2", taken: false, times: [[2, 1], [4, 4]] },
        { name: "Mathe3", taken: false, times: [[1, 4], [3, 0]] },
        { name: "Projekt1", taken: false, times: [[4, 1], [1, 3]] },
        { name: "Projekt2", taken: false, times: [[1, 2], [3, 2]] },
      ]
    }
  }

  checkname = () => {

    let start = document.getElementById("input").value;
    document.getElementById("output").innerHTML = "";
    for (let i = 0; i < this.state.courses.length; i++) {
      let course = this.state.courses[i]
      if (course.name.match(new RegExp(start))) {
        document.getElementById("output").innerHTML += '<div><h2>' + course.name + '</h2><p>taken:' + course.taken + '</p><p>Zeitslots:(' + course.times[0] + ') / (' + course.times[1] + ')</div>'
      }
    }
  }

  render() {
    return (
      <div className="Kursuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Row" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid><h1>Kursübersicht</h1>
                <input id="input" type="text" onChange={this.checkname}></input>
                <p id="output"></p></Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default Kursuebersicht