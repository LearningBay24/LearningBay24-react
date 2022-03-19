import React, { Component } from 'react'
import { RenderFooter } from './App'

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <RenderFooter />
      </div>
    )
  }
}

export default Dashboard