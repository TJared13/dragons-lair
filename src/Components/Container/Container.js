import React, { Component } from 'react'
import './Container.css'
import Treasure from '../Treasure'
import axios from 'axios'

export default class Container extends Component {
  constructor() {
    super()
    this.state = {
      treasures: {},
    }
    this.addMyTreasure = this.addMyTreasure.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ treasures: {} })
    }
  }

  getDragonTreasure() {
    axios.get('/api/treasure/dragon')
      .then(treasure => {
        this.setState({
          treasures: {
            ...this.state.treasures,
            dragon:treasure.data
          }
        })
      })
      .catch(err => console.log(err))
  }

  getAllTreasure() {
    axios.get('/api/treasure/all')
      .then(res => {
        this.setState({
          treasures: {
            ...this.state.treasures,
          all: res.data
          }
        })
      })
      .catch(err => (err.response.request.response))
  }

  getMyTreasure() {
    axios.get('/api/treasure/user')
      .then(treasure => {
        this.setState({
          treasures: {
            ...this.state.treasures,
            user: treasure.data
          }
        })
      })
      .catch(err => alert(err.response.request.response))
  }

  addMyTreasure(newMyTreasure) {
    this.setState({
      treasures: {
        ...this.state.treasures,
        user: newMyTreasure,
      },
    })
  }

  render() {
    const { username } = this.props.user
    const { dragon, user, all } = this.state.treasures
    return (
      <div className="Container">
        {dragon ? (
          <div className="treasureBox loggedIn">
            <h1>Dragon's treasure</h1>
            <Treasure treasure={dragon} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={() => this.getDragonTreasure()}>
              See Dragon's <br /> Treasure
            </button>
            <p>
              This treasure trove does not require a user to be logged in for
              access
            </p>
          </div>
        )}
        {user && username ? (
          <div className="treasureBox loggedIn">
            <h1>
              {this.props.user.username}
              's treasure
            </h1>
            <Treasure treasure={user} addMyTreasure={this.addMyTreasure} />
          </div>
        ) : (
          <div className="treasureBox">
            <button
              className="title"
              onClick={() => this.getMyTreasure()}
              name="user"
            >
              See My <br /> Treasure
            </button>
            <p>
              This treasure trove requires a user to be logged in for access
            </p>
          </div>
        )}
        {all && username ? (
          <div className="treasureBox loggedIn">
            <h1>All treasure</h1>
            <Treasure treasure={all} />
          </div>
        ) : (
          <div className="treasureBox">
            <button
              className="title"
              onClick={() => this.getAllTreasure()}
              name="all"
            >
              See All <br /> Treasure
            </button>
            <p>
              This treasure trove requires a user to be a logged in as an admin
              user for access
            </p>
          </div>
        )}
      </div>
    )
  }
}
