import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Dashboard</h1>
        <ShowNavbar />
      </div>
    )
  }
}

export default Dashboard