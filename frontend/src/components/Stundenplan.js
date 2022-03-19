import React, { Component } from 'react'
import { RenderFooter } from './App'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export class Stundenplan extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [{ name: "AI1", taken: false, times: [[1, 2], [2, 3]] }, { name: "AI2", taken: true, times: [[1, 4], [3, 3]] },]
    }
  }
  render() {
    return (
      <div>
        <h1>Stundenplan</h1>
        <this.Plotcalendar />
        <button value="AI1" onClick={this.toggle1}>AI1</button>
        <button value="AI2" onClick={this.toggle2}>AI2</button>
        <button value="fill" onClick={this.Fillcalender}>Render Calender</button>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
        />
        <RenderFooter />
      </div>
    )
  }

  toggle1 = () => {
    this.state.courses[0].taken = !this.state.courses[0].taken
  }

  toggle2 = () => {
    this.state.courses[1].taken = !this.state.courses[1].taken
  }

  Fillcalender = () => {
    let t = document.getElementById("table")
    for (let r = 1; r < 6; r++) {
      for (let c = 1; c < 6; c++) {

        t.rows[r].cells[c].innerHTML = " "

      }
    }
    for (let course of this.state.courses) {
      if (course.taken) {
        for (let time of course.times) {
          let r = t.rows[time[1] + 1]
          let c = r.cells[time[0] + 1]
          c.innerHTML = course.name
        }
      }
    }


  }

  Plotcalendar = () => {
    return (
      <table id="table" border="1px">
        <thead>
          <tr>
            <th>#</th>
            <th>Montag</th>
            <th>Dienstag</th>
            <th>Mittwoch</th>
            <th>Donnerstag</th>
            <th>Freitag</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Stundenplan