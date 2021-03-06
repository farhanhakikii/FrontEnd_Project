import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginHandler, logoutHandler } from '../../redux/actions/user';
import { Modal, Dropdown } from 'react-bootstrap';
import Cookies from "universal-cookie";
import Axios from "axios";
import { API_URL } from '../../constants/API';
import swal from 'sweetalert';

class Navbar extends React.Component{
    state={
      show: false,
      username: "",
      password: "",
    }

    modalHandle = () => {
      this.setState({show: !this.state.show, username: "", password: ""})
    }

    componentDidUpdate(){
      if (this.props.user.id) {
        const cookie = new Cookies();
        cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
      }

      this.renderNavbar()
    }

    logoutBtnHandler = () => {
      this.props.onLogout()
    };

    loginBtnHandler = () => {
      const {username, password} = this.state
      let userlogin = {username, password}
      this.props.onLogin(userlogin)
      this.setState({username: "", password: ""})
      this.modalHandle()
    }

    lupaPassword = () => {
      Axios.get(`${API_URL}/users/un`, {
        params: {
          username: this.state.username
        }
      })
      .then((res) => {
        if(res.data == null){
          swal("Username Tidak Terdaftar")
        } else {
          Axios.patch(`${API_URL}/users/forget?username=${this.state.username}`)
          .then((res) => {
            swal("Link Untuk Reset Password Telah Dikirim Ke Email Kisana.")
          })
          .catch((err) => {
            console.log(err)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

    inputHandler = (e,field) => {
      this.setState({[field]: e.target.value})
    }

    toProfile = () => {
      swal("Hallo")
      return <Redirect to={`/users/${this.props.user.id}`}/>
    }

    renderNavbar = () => {
      return <div style={{ backgroundColor: "black"}} className="d-flex flex-row justify-content-between align-items-center px-4 navbar-container">
      <div className="d-flex flex-row p-2">
        <div className="mt-1 mr-4 text-white" style={{fontSize: 20, fontFamily: "Impact"}}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            ASPOS
          </Link>
        </div>
      </div>
      <div>
        {
          this.props.user.username ? 
          <>
          {
            this.props.user.role == "admin" ?
              <Link to="/admin">
                <button className="btn btn-dark mr-2 p-1">{this.props.user.username}</button>
              </Link>
               : 
              <Link to={`/users/${this.props.user.id}`}>
                <button className="btn btn-dark mr-2 p-1">{this.props.user.username}</button>
              </Link>
          }
          <Link to="/">
            <button className="btn btn-danger p-1" onClick={this.logoutBtnHandler}>Logout</button>
          </Link>
          </> :
          <div>
            <button className="btn btn-dark mr-2 p-1" onClick={this.modalHandle}>Login</button>
            <Link to="/register">
              <button className="btn btn-dark p-1">Sign Up</button>
            </Link>
          </div>
        }
      </div>
      <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input onChange={(e) => this.inputHandler(e,"username")} value={this.state.username} className="form-control mb-2" placeholder="Username" type="text"></input>
          <input onChange={(e) => this.inputHandler(e,"password")} value={this.state.password} className="form-control" placeholder="Password" type="password"></input>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-dark" onClick={this.lupaPassword}>Lupa Password</button>
          <button className="btn btn-dark" onClick={this.loginBtnHandler}>Login</button>
          <button className="btn btn-dark" onClick={this.modalHandle}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
    }

    render() {
        return (
          this.renderNavbar()
        )
    }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = {
  onLogout: logoutHandler,
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);