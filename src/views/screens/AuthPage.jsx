//Belum validasi email
import React from 'react';
import { connect } from "react-redux";
import { registerHandler } from '../../redux/actions/user';
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from 'sweetalert';

class AuthPage extends React.Component{
    state = {
        fullName: "",
        username: "",
        email: "",
        password: "",
        role: "",
        creation: [],
        isVerified: false,
        type: "free",
        showpass: false,
    }

    componentDidUpdate() {
        if (this.props.user.id) {
          const cookie = new Cookies();
          cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
        }
    }

    showPassword = () => {
        if(!this.state.showpass){
            this.setState({showpass: true})
        }else if(this.state.showpass){
            this.setState({showpass: false})
        }
    }

    inputHandler = (e,field) => {
        this.setState({[field]: e.target.value})
    }

    registerBtnHandler = () => {
        const {username, fullName, password, email, role, isVerified, creation , type} = this.state;
        let newUser = {username, fullName, password, email, role, isVerified, creation, type}
        this.props.onRegister(newUser)
        this.setState({username: "", email: "", fullName: "", password: "", role: ""})
    }

    render() {
        if (this.props.user.id > 0) {
            return <Redirect to="/" />;
          }      
        return (
            <div className="mt-5 container border w-25">
                <div className="d-flex flex-column p-4">
                    <h1 className="m-1">Register</h1>
                    <input onChange={(e) => this.inputHandler(e,"fullName")} value={this.state.fullName} className="mt-2 rounded" type="text" placeholder="Masukkan Nama Lengkap"/>
                    <input onChange={(e) => this.inputHandler(e,"email")} value={this.state.email} className="mt-2 rounded" type="text" placeholder="Masukkan Email"/>
                    <input onChange={(e) => this.inputHandler(e,"username")} value={this.state.username} className="mt-2 rounded" type="text" placeholder="Masukkan Username"/>
                    {
                        this.state.showpass?
                        <>
                        <input onChange={(e) => this.inputHandler(e,"password")} value={this.state.password} className="mt-2 rounded" type="text" placeholder="Masukkan Password"/>
                        </>
                        :
                        <>                     
                        <input onChange={(e) => this.inputHandler(e,"password")} value={this.state.password} className="mt-2 rounded" type="password" placeholder="Masukkan Password"/>
                        </>
                    }
                    <select value={this.state.role} className="mt-2 rounded" onChange={(e) => this.inputHandler(e, "role")}>
                        <option hidden>Pilih Role</option>
                        <option value="reader">Reader</option>
                        <option value="writer">Writer</option>
                    </select>                    
                    <div className="d-flex flex-row mt-2">
                        <input type="checkbox" onChange={this.showPassword}/>Show Password
                    </div>
                    <button className="mt-2 rounded btn btn-dark" onClick={this.registerBtnHandler}>Register</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  
const mapDispatchToProps = {
    onRegister: registerHandler,
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);