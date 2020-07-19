import React from 'react'
import "./EpisodePage.css"
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Link } from 'react-router-dom'

class EpisodePage extends React.Component{
    state = {
        textsample: ``,
        episodeDetails: []
    }
    renderEpisode = () => {
        Axios.get(`${API_URL}/episode/eps?novelNumber=${this.props.match.params.novelId}&episodeNumber=${this.props.match.params.episodeId}`)
        .then((res) => {
            this.setState({episodeDetails: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }   
    
    componentDidMount() {
        this.renderEpisode()
    }

    componentDidUpdate() {
        this.renderEpisode()
    }

    render() {
        return (
            <>
            <div className="text-center mt-2" style={{fontSize: 30, backgroundColor: "black", color: "white"}}>{this.state.episodeDetails.episodeTitle}</div>
            <div className="m-2 d-flex flex-row justify-content-around align-items-center">
                {
                    this.props.match.params.episodeId != 1 ?
                    <Link to={`/novel/${this.props.match.params.novelId}/${parseInt(this.props.match.params.episodeId) - 1}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <button className="btn" style={{fontSize: 40, backgroundColor: "black", color: "white", borderColor: "black"}}>{"<"}</button>
                    </Link> :
                    <button disabled className="btn" style={{fontSize: 40, backgroundColor: "black", color: "white", borderColor: "black"}}>{"<"}</button>
                }
                <textarea className="text-left border p-4" disabled style={{backgroundColor: "black"}} value={this.state.episodeDetails.episodeContent}/>
                {/* <input type="text" disabled placeholder={this.state.textsample} className="form-control rounded"/> */}
                <Link to={`/novel/${this.props.match.params.novelId}/${parseInt(this.props.match.params.episodeId) + 1}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <button className="btn" style={{fontSize: 40, backgroundColor: "black", color: "white", borderColor: "black"}}>{">"}</button>
                </Link>
            </div>
            </>
        )
    }
}

export default EpisodePage;