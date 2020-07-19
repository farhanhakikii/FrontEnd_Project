import React from 'react'
import { connect } from "react-redux";
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import noPictUser from "../../assets/Images/noPictUser.png"

class EditProfile extends React.Component{
    state = {
        userProfile: [],
        isVerified: false,
        showEditPass: false,
        oldPass: "",
        newPass: "",
        confNewPass: "",
        showUpload: false
    }

    inputHandler = (e,field) => {
        this.setState({[field]: e.target.value})
    }

    modalHandleEditPass = () => {
        this.setState({showEditPass: !this.state.showEditPass})
    }

    uploadHandle = () => {
        this.setState({showUpload: !this.state.showUpload})
    }

    renderProfile = () => {
        Axios.get(`${API_URL}/users/${this.props.match.params.userId}`)
        .then((res) => {
            this.setState({userProfile: res.data, isVerified: res.data.verified})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }

    fileUploadHandler = () => {
        let formData = new FormData();

        formData.append("file", this.state.selectedFile, this.state.selectedFile.name )
        Axios.patch(`${API_URL}/documents/user/${this.props.user.id}`, formData)
        .then((res) => {
            swal("Profile Photo Updated")
            this.uploadHandle()
        })
        .catch((err => {
            console.log(err)
        }))

    }

    changePassword = () => {
        const { oldPass, newPass, confNewPass } = this.state

        if(oldPass == "" || newPass == "" || confNewPass == ""){
            swal("Lengkapi Form!")
        } else if( newPass != confNewPass ) {
            swal("Password dan Konfirmasi Password Harus Sama!")
        } else {
            Axios.patch(`${API_URL}/users/${this.props.match.params.userId}/password?password=${oldPass}&newPassword=${newPass}`)
            .then((res) => {
                swal("Password Berhasil Diganti.")
                this.setState({ oldPass: "", newPass: "", confNewPass: "" })
                this.modalHandleEditPass()
            })
            .catch((err) => {
                swal("Password Lama Salah.")
            })
        }
    }

    componentDidMount() {
        this.renderProfile()
    }

    componentDidUpdate() {
        this.renderProfile()
    }

    render(){
        if(this.state.isVerified && this.props.user.id == this.state.userProfile.id){
            return(
                <div className="container w-25">
                    <div className="d-flex flex-column p-3">
                        <h2 className="text-center text-white rounded p-1 mt-5" style={{backgroundColor: "black"}}>Edit Profile</h2>
                        <img src={this.state.userProfile.image ? this.state.userProfile.image : noPictUser} style={{height: "200px", objectFit: "contain"}} alt="image" className="mt-1"/>
                        <div className="text-center">
                            <button className="btn mt-2" style={{backgroundColor: "black", color: "white", width: "fit-content"}} onClick={this.uploadHandle}>Change Photo Profile</button>
                            {
                                this.state.showUpload?
                                <>
                                <input className="mt-2" type="file" onChange={this.fileChangeHandler}/>
                                <button className="btn btn-success" onClick={this.fileUploadHandler}>Update</button>
                                <button className="btn btn-danger" onClick={this.uploadHandle}>Cancel</button>
                                </> : null   
                            }
                        </div>
                        <button className="btn mt-2 btn-danger" onClick={this.modalHandleEditPass}>Change Password</button>
                    </div>
                    <Modal show={this.state.showEditPass}>
                            <Modal.Header>
                            <Modal.Title>Change Password</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="text-center">
                                    <input onChange={(e) => this.inputHandler(e,"oldPass")} value={this.state.oldPass} className="form-control mb-2" placeholder="Old Password" type="password"/>
                                    <input onChange={(e) => this.inputHandler(e,"newPass")} value={this.state.newPass} className="form-control mb-2" placeholder="New Password" type="password"/>
                                    <input onChange={(e) => this.inputHandler(e,"confNewPass")} value={this.state.confNewPass} className="form-control mb-2" placeholder="Confirm New Password" type="password"/>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn btn-dark" onClick={this.changePassword}>Save</button>
                                <button className="btn btn-dark" onClick={this.modalHandleEditPass}>Close</button>
                            </Modal.Footer>
                        </Modal>
                </div>
            )
        } else if(!this.state.isVerified && this.props.user.id == this.state.userProfile.id) {
            return (
                <div className="container text-center mt-5">
                    <h1>Please Verify Your Account First.</h1>
                    <h2>Check Your Email.</h2>
                    <Link to="/">Back to home</Link>
              </div>
            )
        } else {
            return (
            <div className="container text-center mt-5">
                <h1>Page Not Found</h1>
                <Link to="/">Back to home</Link>
            </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  
export default connect(mapStateToProps)(EditProfile);