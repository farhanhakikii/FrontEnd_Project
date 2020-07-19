import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';

class ListNovel extends React.Component{
    state = {
        allNovel: [],
        episode: [],
        show: false
    }

    componentDidMount(){
        this.renderAllNovel()
    }

    componentDidUpdate(){
        this.renderAllNovel()
    }

    modalHandle = () => {
        this.setState({show: !this.state.show, username: "", password: ""})
    }

    renderAllNovel = () => {
        Axios.get(`${API_URL}/novel`)
        .then((res) => {
            this.setState({allNovel: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    premiumNovel = (novelId) => {
        Axios.patch(`${API_URL}/novel/${novelId}`)
        .then((res) => {
            swal("Novel Sudah Jadi Premium.")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderEpisode = (novelId) => {
        Axios.get(`${API_URL}/novel/${novelId}/episode`)
        .then((res) => {
            this.setState({episode: res.data})
            this.modalHandle()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteNovel = (novelId) => {
        Axios.delete(`${API_URL}/novel/${novelId}`)
        .then((res) => {
            Axios.delete(`${API_URL}/novel/${novelId}`)
            .then((res) => {
                swal("Berhasil Menghapus Novel")
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="text-center">
            <div className="text-white p-2 mt-3" style={{backgroundColor: "black"}}><h1>List Novel</h1></div>
            <table className="table mt-3 text-white" style={{backgroundColor: "black"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.allNovel.map((val, key) => {
                        return <tr>
                            <td>{key + 1}</td>
                            <td>{val.title}</td>
                            <td>{val.author != null ? val.author.username : null}</td>
                            <td>{val.type}</td>
                            <td>
                                {
                                    val.type == "free" ? 
                                    <button className="btn btn-warning text-white mr-2" onClick={() => this.premiumNovel(val.id)}>Go Premium</button>
                                    : null
                                }
                                <button className="btn btn-primary mr-2" onClick={() => this.renderEpisode(val.id)}>View</button>
                                <button className="btn btn-danger" onClick={() => this.deleteNovel(val.id)}>Delete</button>
                            </td>
                            <Modal show={this.state.show}>
                                <Modal.Header>
                                <Modal.Title>{val.title} - Episode List</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    {
                                        this.state.episode.map((val) => {
                                            return <div className="d-flex flex-row">
                                                <p>{val.episodeNumber}. {val.episodeTitle}</p>
                                                {/* <p className="ml-2" style={{backgroundColor: "red", color: "white"}}>Delete</p> */}
                                            </div>
                                        })
                                    }
                                </Modal.Body>

                                <Modal.Footer>
                                <button className="btn btn-dark" onClick={this.modalHandle}>Close</button>
                                </Modal.Footer>
                            </Modal>
                        </tr>
                    })
                }
            </tbody>
            </table>
            </div>
        )
    }
}
export default ListNovel;