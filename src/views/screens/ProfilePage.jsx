import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';
import noPictUser from "../../assets/Images/noPictUser.png"
import swal from 'sweetalert';

class ProfilePage extends React.Component{
    state = {
        title: "",
        synopsis: "",
        image: "",
        showAdd: false,
        showUpgrade: false,
        showCategoryAdd: false,
        owner: this.props.match.params.userId,
        userId: this.props.user.id,
        type: "",
        isVerified: false,
        userProfile: [],
        writerNovelList: [],
        selectedNovel: "",
        selectedCategory: "",
        categoryList: [],
        payPremium: 50000,
        accountNumber: "",
        accountOwner: ""
    }

    inputHandler = (e,field) => {
        this.setState({[field]: e.target.value})
    }

    modalHandle = () => {
        this.setState({showAdd: !this.state.showAdd, title: "", synopsis: ""})
    }

    modalHandleUpgrade = () => {
        if(this.state.showUpgrade){
            this.setState({showUpgrade: !this.state.showUpgrade, payPremium: 50000})
        } else {
            let uniqPay = Math.floor(Math.random()*(999-100+1)+100);
            this.setState({showUpgrade: !this.state.showUpgrade, payPremium: this.state.payPremium + uniqPay})
        }
    }

    showCategoryHandle = () => {
        this.setState({ showCategoryAdd: !this.state.showCategoryAdd})
    }

    postNovel = () => {
        const { title, synopsis, owner } = this.state
        Axios.post(`${API_URL}/novel/${this.props.user.id}`, {
            title,
            synopsis,
            owner,
            type: "free"
        })
        .then((res) => {
            swal("Berhasil Menambah Novel")
        })
        .catch((err) => {
            console.log(err)
        })
        this.modalHandle()
    }

    renderWriterNovel = () => {
        Axios.get(`${API_URL}/novel/ofUser/?owner=${this.props.match.params.userId}`)
        .then((res) => {
            this.setState({ writerNovelList: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderCategory = () => {
        Axios.get(`${API_URL}/category`)
        .then((res) => {
            this.setState({ categoryList: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    addCategoryToNovel = () => {
        Axios.put(`${API_URL}/novel/${this.state.selectedNovel}/category/${this.state.selectedCategory}`)
        .then((res) => {
            swal("Berhasil Menambahkan Kategori ke Novel")
            this.setState({selectedCategory: "", selectedNovel: ""})
            this.showCategoryHandle()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }

    fileUploadHandler = () => {
        const {userId, payPremium, accountNumber, accountOwner} = this.state
        let formUser = { userId, payPremium, accountNumber, accountOwner }
        
        if(this.state.selectedFile == null){
            swal("Pilih File Dahulu")
        }else {
            let formData = new FormData();
            formData.append("file", this.state.selectedFile, this.state.selectedFile.name )
            formData.append("paymentData", JSON.stringify(formUser));
    
            Axios.post(`${API_URL}/documents/payment/${this.props.user.id}`, formData)
            .then((res) => {
                swal("Upload Bukti Pembayaran Sukses. Mohon Bersabar Menunggu Persetujuan Sistem.")
                this.modalHandleUpgrade()
            })
            .catch((err => {
                console.log(err)
            }))
        }
    }

    componentDidMount() {
        Axios.get(`${API_URL}/users/${this.props.match.params.userId}`)
        .then((res) => {
            this.setState({userProfile: res.data, isVerified: res.data.verified})
        })
        .catch((err) => {
            console.log(err)
        })
        this.renderWriterNovel()
        this.renderCategory()
    }

    componentDidUpdate() {
        this.renderWriterNovel()
    }

    render() {
        return (
            this.props.match.params.userId == 1 || this.state.userProfile == null ?
            <div className="mt-5 text-center">
                <h1>Error 404</h1>
                <h1>Not Found</h1>
                <Link to="/">Return Home</Link>
            </div> :
            <div>
                {
                    this.state.userProfile.role == "writer" ? 
                    <div className="container text-center mt-4">
                        <div className="row">
                            <div className="col-3">
                                <img className="border" src={this.state.userProfile.image ? this.state.userProfile.image : noPictUser} style={{height: "250px", width: "250px"}} alt="image"/>
                                <h1 className="mt-2">
                                    {this.state.userProfile.fullName}
                                </h1>
                                <h6 className="mt-2">{this.state.userProfile.email}</h6>
                                {
                                    this.props.match.params.userId == this.props.user.id ?
                                    <Link to={`/editprofile/${this.props.match.params.userId}`}>
                                        <button className="btn mt-2" style={{fontSize: 20, backgroundColor: "black", color: "white"}}>Edit Profile</button>
                                    </Link> : null
                                }
                                {
                                    this.state.isVerified && this.props.user.id == this.props.match.params.userId?<>
                                    <button className="btn btn-success mt-2" onClick={this.showCategoryHandle}>Add Category to Novel</button>
                                    {
                                        this.state.showCategoryAdd ? <>
                                        <select className="mt-2" value={this.state.selectedNovel} onChange={(e) => this.inputHandler(e, "selectedNovel")}>
                                        <option hidden>Pilih Novel</option>
                                        {
                                            this.state.writerNovelList.map((val) => {
                                            return <option value={val.id}>{val.title}</option>
                                            })
                                        }
                                        </select>

                                        <select className="mt-2" value={this.state.selectedCategory} onChange={(e) => this.inputHandler(e, "selectedCategory")}>
                                        <option hidden>Pilih Category</option>
                                        {
                                            this.state.categoryList.map((val) => {
                                            return <option value={val.id}>{val.categoryName}</option>
                                            })
                                        }
                                        </select>
                                        <br/>
                                        <button className="btn btn-primary mt-2" onClick={this.addCategoryToNovel}>Add</button>
                                        </> : null
                                    }
                                    </> : null
                                }
                            </div>
                            <div className="col-9">
                                <h1 className="pb-2" style={{backgroundColor: "black", color: "white"}}>Creation :</h1>
                                {
                                    this.state.writerNovelList.map((val) => {
                                        return <div style={{backgroundColor: "black", color: "white"}}>
                                            <h2>{val.title}</h2>
                                            <p className="p-2 text-left">
                                                Synopsis : {" "}{val.synopsis}
                                                <Link to={`/novel/${val.id}`} style={{ textDecoration: "none", color: "blue" }}>
                                                    {" Read"}
                                                </Link>
                                            </p>
                                        </div >
                                    })
                                }
                                {
                                    this.props.match.params.userId == this.props.user.id && this.state.isVerified ?
                                    <button className="btn mt-1" style={{backgroundColor: "black", color: "white"}} onClick={this.modalHandle}>Add New Novel</button> : null
                                }
                                {
                                    this.props.match.params.userId == this.props.user.id && this.state.isVerified == false ?
                                    <p style={{backgroundColor: "black", color: "white"}}>Please Verify Acount First. Check Your Email.</p> : null
                                }

                            </div>
                        </div>
                        <Modal show={this.state.showAdd}>
                            <Modal.Header>
                            <Modal.Title>Add New Novel</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <input onChange={(e) => this.inputHandler(e,"title")} value={this.state.username} className="form-control mb-2" placeholder="Novel Title" type="text"></input>
                                <textarea onChange={(e) => this.inputHandler(e,"synopsis")} value={this.state.password} className="form-control" placeholder="Synopsis"></textarea>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn btn-dark" onClick={this.postNovel}>Save</button>
                                <button className="btn btn-dark" onClick={this.modalHandle}>Cancel</button>
                            </Modal.Footer>
                        </Modal>
                    </div> : 
                    <div className="container w-25 text-center mt-5">
                        <img className="border" src={this.state.userProfile.image ? this.state.userProfile.image : noPictUser} style={{height: "250px", width: "250px"}} alt="image"/>
                        <h1 className="mt-2">
                        {this.state.userProfile.fullName}
                            {/* {
                                this.props.user.isVerified ? <p>Verified</p> : null
                            } */}
                        </h1>
                        {
                            this.props.user.type == "premium" ? 
                            <div className="mt-2" style={{backgroundColor: "yellow", color: "black"}}>Premium User</div>
                             : null
                        }
                        <h5 className="mt-2">{this.state.userProfile.email}</h5>
                        {
                            this.props.match.params.userId == this.props.user.id && this.props.user.type == "free" ? 
                            <div className="d-flex flex-column">
                            <Link>
                                <button className="btn btn-warning mt-2 mr-2" style={{width: "fit-content"}} onClick={this.modalHandleUpgrade}>Upgrade To Premium</button>
                            </Link>
                        <Modal show={this.state.showUpgrade}>
                            <Modal.Header>
                            <Modal.Title>Upgrade to Premium</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="text-center">
                                    <h4>Jumlah Pembayaran : {this.state.payPremium} </h4>
                                    <h6>CIMB Niaga : 873292418611 a/n PT. ASPOS JAYA</h6>
                                    <input className="mt-2" onChange={(e) => this.inputHandler(e,"accountNumber")} type="text" placeholder="No Rekening Pengirim" value={this.state.accountNumber}/><br/>
                                    <input className="mt-2" onChange={(e) => this.inputHandler(e,"accountOwner")} type="text" placeholder="Nama Pemilik Rekening" value={this.state.accountOwner}/><br/>
                                    <input className="mt-2" type="file" onChange={this.fileChangeHandler}/>
                                    <button className="btn btn-warning mt-2" onClick={this.fileUploadHandler}>Upload Foto Pembayaran</button>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn btn-dark" onClick={this.modalHandleUpgrade}>Close</button>
                            </Modal.Footer>
                        </Modal>
                            <Link to={`/editprofile/${this.props.match.params.userId}`}>
                                <button className="btn mt-2" style={{backgroundColor: "black", color: "white"}}>Edit Profile</button> 
                            </Link>
                            </div> : null
                        }
                        {
                            this.props.match.params.userId == this.props.user.id && this.props.user.type != "free" ?
                            <Link to={`/editprofile/${this.props.match.params.userId}`}>
                                <button className="btn mt-2" style={{backgroundColor: "black", color: "white"}}>Edit Profile</button> 
                            </Link> : null
                        }                        
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

export default connect(mapStateToProps)(withRouter(ProfilePage));