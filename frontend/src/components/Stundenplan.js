import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export class Stundenplan extends Component {
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Stundenplan</h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
          height={700}
        />
        <ShowNavbar />
      </div>
    )
  }
}



export default Stundenplan