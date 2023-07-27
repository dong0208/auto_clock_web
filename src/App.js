import React from "react";
import { connect } from 'react-redux'
import http from "./utils/http";
import { loginCheckApi } from "./authorityApi/login";

class App extends React.Component {
  state = {

  }
  static getDerivedStateFromProps() {
    loginCheckApi().then(() => {

    }).catch((err) => {
      if (err) {
        console.log(err)
      }
    })
    return null
  }
  componentDidMount() {

  }
  render() {
    console.log(this.props)
    return <div>
      <span>12345</span>
    </div>
  }
}

const mapStateToProps = ({ userInfoReducer, }) => {
  return {
    userInfo: userInfoReducer
  }
}
export default connect(
  mapStateToProps,
)(App);
