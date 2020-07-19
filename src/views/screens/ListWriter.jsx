import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'

class ListWriter extends React.Component{
    state = {
        allWriter: [],
    }

    componentDidMount(){
        this.renderWriter()
    }

    renderWriter = () => {
        Axios.get(`${API_URL}/users/role`, {
            params: {
                role: "writer"
            }
        })
        .then((res) => {
            this.setState({allWriter: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <>
            <div className="text-center text-white p-2 mt-3" style={{backgroundColor: "black"}}><h1>List Writer</h1></div>
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
                    this.state.allWriter.map((val, id) => {
                        return <tr>
                            <td>{id+1}</td>
                            <td>{val.username}</td>
                            <td>{val.fullName}</td>
                            <td>{val.email}</td>
                            <td>{val.verified ? "Yes" : "No"}</td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    })
                }
            </tbody>
            </table>
            </>
        )
    }}
export default ListWriter;