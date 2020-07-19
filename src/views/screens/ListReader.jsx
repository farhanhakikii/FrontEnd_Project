import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import swal from 'sweetalert'

class ListReader extends React.Component{
    state = {
        allReader: [],
    }

    componentDidMount(){
        this.renderReader()
    }

    componentDidUpdate(){
        this.renderReader()
    }

    renderReader = () => {
        Axios.get(`${API_URL}/users/role`, {
            params: {
                role: "reader"
            }
        })
        .then((res) => {
            this.setState({allReader: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteReader = (value) => {
        Axios.delete(`${API_URL}/users/${value}`)
        .then((res) => {
            swal("Berhasil Menghapus Reader")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <>
            <div className="text-center text-white p-2 mt-3" style={{backgroundColor: "black"}}><h1>List Reader</h1></div>
            <table className="table mt-3 text-white" style={{backgroundColor: "black"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>isVerified</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.allReader.map((val, id) => {
                        return <tr>
                            <td>{id + 1}</td>
                            <td>{val.username}</td>
                            <td>{val.fullName}</td>
                            <td>{val.email}</td>
                            <td>{val.verified ? "Yes" : "No"}</td>
                            <td><button className="btn btn-danger" onClick={() => this.deleteReader(val.id)}>Delete</button></td>
                        </tr>
                    })
                }
            </tbody>
            </table>
            </>
        )
    }
}
export default ListReader;