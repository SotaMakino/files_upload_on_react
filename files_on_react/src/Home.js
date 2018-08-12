import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

class Home extends Component {
  state = { email: 'admin@example.com', password: 'secret', jwt: '', films: [] }

    login(e) {
    e.preventDefault()

    // we define a query here
    let query = `mutation {
      logged_in_user(
        auth: {
          email: "${this.state.email}"
          password: "${this.state.password}"
        }) {
        jwt,
        user {
          id
          email
        }
      }
    }`

    fetch('http://localhost:3000/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        let user = data.data.logged_in_user
        // if a non nil logged_in_user object is returned
        if (user) {
          this.setState({ jwt: user.jwt }, () => {
            // call retrieve books once we have the jwt
            this.retrieveFilms()
          })
        } else {
          alert('Incorrect username or password')
        }
      })
  }

    retrieveFilms() {
    let query = `query {
          films {
            id,
            nega {
              id,
              title,
              description
            }
          }
        }`

    fetch('http://localhost:3000/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.jwt}`,
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ films: data.data.films })
      })
  }

  renderFilmsListing() {
    let filmRecords = this.state.films.map(film => {
      return (
        <tr key={film.id}>
          <td>{film.id}</td>
        </tr>
      )
    })
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Comments Count</th>
          </tr>
        </thead>
        <tbody>{filmRecords}</tbody>
      </table>
    )
  }

  renderLogin() {
    return (
      <div>
        <h3>Login</h3>
        <form>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={e => this.login(e)}>
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="Home">
        {this.state.jwt == '' && this.renderLogin()}
        {this.state.jwt != '' && this.renderFilmsListing()}
      </div>
    )
  }
}

export default Home;