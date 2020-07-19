import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class LupaPassword extends React.Component{
    state = {
        isUser: false,
        userData: [], 
        showpass: false,
        password: "",
        confirmPassword: "",
        redirectHome: false
    }

    inputHandler = (e,field) => {
        this.setState({[field]: e.target.value})
    }

    showPassword = () => {
        this.setState({showpass : !this.state.showpass})
    }
    
    renderUser = () => {
        const { userData } = this.state 
        Axios.get(`${API_URL}/users/${this.props.match.params.userId}`)
        .then((res) => {
            this.setState({userData: res.data})
            if(this.props.match.params.token == res.data.forgetToken )
                this.setState({ isUser: true })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    submitNewPassword = () => {
        const { password, confirmPassword } = this.state
        if( password != confirmPassword){
            swal("Password dan Konfirmasi Password Harus Sama!")
        }else{
            Axios.patch(`${API_URL}/users/${this.state.userData.id}/setNewPassword?password=${password}`)
            .then((res) => {
                swal("Password Berhasil Diperbaharui")
                this.setState({password: "", confirmPassword: "", redirectHome: true})
            })
            .catch((err) => {
                swal("Terjadi Error.")
            })
        }
    }

    componentDidMount() {
        this.renderUser()
    }

    render() {
        if(this.state.redirectHome){
           return <Redirect to="/"/>
        } else {
            if(this.state.isUser){
                return (
                    <div className="mt-5 container border w-25">
                    <div className="d-flex flex-column p-4">
                        <div className="text-center">
                            <h3 className="m-1">Fill New Password</h3>
                        </div>
                        {
                            this.state.showpass?
                            <>
                            <input onChange={(e) => this.inputHandler(e,"password")} value={this.state.password} className="mt-2 rounded" type="text" placeholder="Masukkan Password"/>
                            <input onChange={(e) => this.inputHandler(e,"confirmPassword")} value={this.state.confirmPassword} className="mt-2 rounded" type="text" placeholder="Masukkan Konfirmasi Password"/>
                            </>
                            :
                            <>                     
                            <input onChange={(e) => this.inputHandler(e,"password")} value={this.state.password} className="mt-2 rounded" type="password" placeholder="Masukkan Password"/>
                            <input onChange={(e) => this.inputHandler(e,"confirmPassword")} value={this.state.confirmPassword} className="mt-2 rounded" type="password" placeholder="Masukkan Konfirmasi Password"/>
                            </>
                        }
                        <div className="d-flex flex-row mt-2">
                            <input type="checkbox" onChange={this.showPassword}/>Show Password
                        </div>
                        <button className="mt-2 rounded btn btn-dark" onClick={this.submitNewPassword}>Submit New Password</button>
                    </div>
                </div>
                )
            } else {
                return (
                    <div className="mt-5 text-center">
                        <h1>Error 404</h1>
                        <h1>Not Found</h1>
                        <Link to="/">Return Home</Link>
                    </div>
                )
            }    
        }
    }
}

export default LupaPassword;