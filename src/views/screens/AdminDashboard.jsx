import React from 'react'
import { Link } from 'react-router-dom';

class AdminDashboard extends React.Component{
    render() {
        return (
            <>
            <div className="mt-5 text-center">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="container d-flex justify-content-center mt-5">
                <Link to="/listnovel">
                    <button className="btn btn-success mr-3">List Novel</button>
                </Link>
                    
                <Link to="/listwriter">
                    <button className="btn btn-success mr-3">List Writer</button>
                </Link>

                <Link to="/listreader">
                    <button className="btn btn-success mr-3">List User</button>
                </Link>

                <Link to="/listcategory">    
                    <button className="btn btn-success mr-3">List Category</button>
                </Link>
                <Link to="/listpayment">
                    <button className="btn btn-success">List Payment</button>
                </Link>
            </div>
            </>
        )
    }
}

export default AdminDashboard;