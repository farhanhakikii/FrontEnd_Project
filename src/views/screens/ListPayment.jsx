import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


class ListPayment extends React.Component{
    state = {
        pendingPaymentList: [],
        completedPaymentList: [],
        showPending: true,
        showImage: false,
        imageSource: ""
    }

    componentDidMount(){
        this.renderPending()
        this.renderCompleted()
    }

    componentDidUpdate(){
        this.renderPending()
    }

    renderPending = () => {
        Axios.get(`${API_URL}/payment/pending?status=pending`)
        .then((res) => {
            this.setState({ pendingPaymentList: res.data}) 
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    renderCompleted = () => {
        Axios.get(`${API_URL}/payment/pending?status=completed`)
        .then((res) => {
            this.setState({ completePaymentList: res.data}) 
        })
        .catch((err) => {
            console.log(err)
        })
    }

    showPendingHandler = () => {
        this.setState({showPending: true})
    }

    showCompletedHandler = () => {
        this.setState({showPending: false})
    }

    viewReceipt = (imgsrc) => {
        this.setState({imageSource: imgsrc})
    }

    confirmPayment = (userId) => {
        Axios.patch(`${API_URL}/users/${userId}`)
        .then((res) => {
            swal("Get Premium User Success.")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    rejectPayment = (userId) => {
        Axios.patch(`${API_URL}/users/${userId}/failed`)
        .then((res) => {
            swal("Get Premium User Failed.")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render() {
        return (
            <>
            <div className="text-center text-white p-2 mt-3" style={{backgroundColor: "black"}}><h1>List Payment</h1></div>
            <div className="text-center mt-2">
                <button className="btn btn-warning mr-2" onClick={this.showPendingHandler}>Pending</button>
                <button className="btn btn-primary" onClick={this.showCompletedHandler}>Completed</button>
            </div>
            <table className="table mt-3 text-white" style={{backgroundColor: "black"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Amount</th>
                    <th>Account Number</th>
                    <th>Account Owner</th>
                    {
                        this.state.showPending ? 
                        <>
                        <th>Image</th>
                        <th>Action</th>
                        </> : null
                    }
                </tr>
            </thead>
            <tbody>
                {
                    this.state.showPending ?
                    this.state.pendingPaymentList.map((val, id) => {
                        return <tr>
                            <td>{id + 1}</td>
                            <td>{val.userId}</td>
                            <td>{val.payPremium}</td>
                            <td>{val.accountNumber}</td>
                            <td>{val.accountOwner}</td>
                            <td>
                                <a href={val.image}>File</a>
                                {/* <img src={val.image} style={{width: "200px", height: "100px"}} alt=""/> */}
                            </td>
                            <td>
                                <button className="btn btn-success mr-2" onClick={() => this.confirmPayment(val.userId)}>Confirm</button>
                                <button className="btn btn-danger" onClick={() => this.rejectPayment(val.userId)}>Reject</button>
                            </td>
                        </tr>
                    }) : this.state.completePaymentList.map((val, id) => {
                        return <tr>
                            <td>{id + 1}</td>
                            <td>{val.userId}</td>
                            <td>{val.payPremium}</td>
                            <td>{val.accountNumber}</td>
                            <td>{val.accountOwner}</td>
                        </tr>
                    })
                }
            </tbody>
            </table>
            </>
        )
    }
}

export default ListPayment;