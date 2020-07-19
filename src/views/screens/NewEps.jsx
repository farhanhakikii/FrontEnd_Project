import React from 'react'
import "./EpisodePage.css"
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class NewEps extends React.Component{
    state = {
        episodeTitle: '',
        episodeContent: '',
        episodeNumber: '',
        author: '',
        novelNumber: '',
        isPosted: false
    }

    inputHandler = (e,field) => {
        this.setState({[field]: e.target.value})
    }

    loadEps = () => {
        Axios.get(`${API_URL}/novel/${this.props.match.params.novelId}/episode`)
        .then((res) => {
            this.setState({episodeNumber: res.data.length + 1})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    novelAuthor = () => {
        Axios.get(`${API_URL}/novel/${this.props.match.params.novelId}`)
        .then((res) => {
            this.setState({author: res.data.author.id})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.loadEps()
        this.novelAuthor()
    }

    componentDidUpdate() {
        this.loadEps()
    }

    postEpisode = () => {
        const { episodeTitle, episodeNumber, episodeContent} = this.state
        if(episodeTitle == "" || episodeContent == ""){
            swal("Lengkapi Judul dan Isi Episode")
        }else{
            Axios.post(`${API_URL}/episode/${this.props.match.params.novelId}`, {
                episodeTitle,
                episodeNumber,
                episodeContent,
                novelNumber: this.props.match.params.novelId
            })
            .then((res) => {
                swal("Berhasil Posting Episode")
                this.setState({episodeContent: "", episodeTitle: "", isPosted: true})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        if(this.state.isPosted){
            return <Redirect to={`/novel/${this.props.match.params.novelId}`}/>
        } else {
            return (
                this.state.author == this.props.user.id ?
                <>
                <textarea onChange={(e) => this.inputHandler(e,"episodeTitle")} className="text-center mt-2" 
                        style={{fontSize: 30, backgroundColor: "black", color: "white", width: "100%", borderColor: "black", height: "45px"}}
                        placeholder="Isi Judul Episode Disini." value={this.state.episodeTitle}
                />
                <div className="m-2 d-flex flex-row justify-content-around align-items-center">
                    <textarea onChange={(e) => this.inputHandler(e,"episodeContent")} className="text-left border p-4" style={{backgroundColor: "black", color: "white", height: "475px"}} value={this.state.episodeContent}/>
                </div>
                <div className="text-center">
                    <button onClick={() => {this.postEpisode()}} className="btn" style={{fontSize: 20, backgroundColor: "black", color: "white", borderColor: "black"}}>Post</button>
                </div>
                </> 
                : <div className="mt-5 text-center">
                    <h1>Error 404</h1>
                    <h1>Not Found</h1>
                    <Link to="/">Return Home</Link>
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

  
export default connect(mapStateToProps)(NewEps);
