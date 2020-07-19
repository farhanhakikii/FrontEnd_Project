import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import noImage from "../../assets/Images/no-image.jpg"
import swal from 'sweetalert';

class NovelPage extends React.Component{
    state = {
        novelDetails: [],
        episodes: [],
        username: "",
        id: "",
        userId: "",
        selectedFile: null,
        showUpload: false
    }
    
    componentDidMount() {
        this.loadNovel()
    }

    componentDidUpdate(){
        //this.loadNovel()
    }

    loadNovel = () => {
        Axios.get(`${API_URL}/novel/${this.props.match.params.novelId}`)
        .then((res) => {
          this.setState({ novelDetails: res.data })
          this.setState({ username: res.data.author.username, id: res.data.id, userId: res.data.author.id})
          this.loadEpisode()
        })
        .catch((err) => {
          console.log(err);
        });
    }

    uploadHandle = () => {
        this.setState({showUpload: !this.state.showUpload})
    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }

    fileUploadHandler = () => {
        let formData = new FormData();
        if(this.state.selectedFile == null){
            swal("Pilih File Dahulu")
        }else {
            formData.append("file", this.state.selectedFile, this.state.selectedFile.name )
            Axios.patch(`${API_URL}/documents/novel/${this.state.id}`, formData)
            .then((res) => {
                swal("Foto Cover Novel Diperbaharui")
                this.uploadHandle()
            })
            .catch((err => {
                console.log(err)
            }))
        }
    }

    loadEpisode = () => {
        Axios.get(`${API_URL}/novel/${this.state.id}/episode`)
        .then((res) => {
            this.setState({ episodes: res.data})
        })
        .catch((err) =>  {
            console.log(err)
        })
    }

    renderEpisode = () => {
        if(this.props.user.username == this.state.username || this.props.user.type == "premium"){
            return this.state.episodes.map((val) => {
                return <Link to={`/novel/${this.state.id}/${val.episodeNumber}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="border p-1 rounded">{val.id}. {val.episodeTitle}</div>
                </Link> 
            })
        } else{
            return <div>Please Upgrade to Premium User First</div>
        }
    }

    render() {
        return (
            <div className="container mt-2">
                <h1 className="text-center border text-white p-2 rounded" style={{backgroundColor: "black"}}>{this.state.novelDetails.title}</h1>
                <div className="row">
                    <div className="col-3 text-center">
                        <img src={this.state.novelDetails.image ? this.state.novelDetails.image : noImage} style={{height: "12rem", width: "12rem"}} alt={this.state.novelDetails.title}/>
                        {
                            this.props.user.id == this.state.userId ?
                            <>
                                <button className="btn btn-success mt-2" onClick={this.uploadHandle}>Update Novel Cover</button>
                                {
                                    this.state.showUpload ? <>
                                    <input className="mt-2" type="file" onChange={this.fileChangeHandler}/>
                                    <button className="btn btn-success" onClick={this.fileUploadHandler}>Update</button>
                                    <button className="btn btn-danger" onClick={this.uploadHandle}>Cancel</button>
                                    </> : null
                                }

                            </> : null
                        }
                    </div>
                    <div className="col-9 d-flex flex-column justify-content-center text-left">
                        <h2>Synopsis</h2>
                        {this.state.novelDetails.synopsis}
                        <div>
                            By : {" "} 
                            <Link to={`/users/${this.state.userId}`}>
                                {this.state.username}
                            </Link> 
                        </div>
                    </div>
                </div>

                <h2 className="p-3 border text-center text-white mt-3 rounded" style={{backgroundColor: "black"}}>Episode</h2>
                <div className="mt-3 text-white" style={{backgroundColor: "black"}}>
                    {
                        this.state.novelDetails.type == "premium" ?
                        this.renderEpisode() : this.state.episodes.length > 0 ? this.state.episodes.map((val) => {
                        return <Link to={`/novel/${this.state.id}/${val.episodeNumber}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="border p-1 rounded">{val.episodeNumber}. {val.episodeTitle}</div>
                        </Link>
                        }) : null
                    }
                </div>
                <div className="text-center mt-2">
                    {
                        this.props.user.username == this.state.username ?
                        <Link to={`/newEps/${this.state.id}`}>
                            <button title="Add New Episode" className="btn" style={{backgroundColor: "black", color: "white", fontSize: 25}}>+</button>
                        </Link>
                        : null
                    }
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

  
export default connect(mapStateToProps)(NovelPage);
