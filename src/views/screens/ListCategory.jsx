import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class ListCategory extends React.Component{
    state = {
        categoryList: [],
        categoryName: ''
    }

    renderCategoryList = () => {
        Axios.get(`${API_URL}/category`)
        .then((res) => {
            this.setState({categoryList: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    addNewCategory = () => {
        const { categoryName } = this.state
        Axios.get(`${API_URL}/category/name`, {
            params: {
                categoryName: categoryName
            }
        })
        .then((res) => {
            if(res.data){
                swal("Category Sudah Ada.")
            } else {
                Axios.post(`${API_URL}/category`, {
                    categoryName
                })
                .then((res) => {
                    swal("Add New Category Success.")
                    this.setState({categoryName: ""})
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteCategory = (id) => {
        Axios.delete(`${API_URL}/category/${id}`)
        .then((res) => {
            swal("Delete Success")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.renderCategoryList()
    }

    componentDidUpdate() {
        this.renderCategoryList()
    }

    inputHandler = (e,field) => {
        this.setState({[field]: e.target.value})
    }

    render(){
        return <div className="text-center">
            <div className="text-white mt-2 p-1" style={{backgroundColor: "black"}}><h1>List Category</h1></div>
            <table class="table text-white mt-1" style={{backgroundColor: "black"}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.categoryList.map((val, key) => {
                            return <tr>
                                <td>{key + 1}</td>
                                <td>{val.categoryName}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.deleteCategory(val.id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                </table>
                <div className="container d-flex flex-column w-25">
                    <input onChange={(e) => this.inputHandler(e,"categoryName")} value={this.state.categoryName} className="mt-1 mr-2 rounded" type="text" placeholder="Masukkan Category"/>
                    <Link>
                        <button className="mt-2 btn btn-success" onClick={this.addNewCategory}>Add New Category</button>
                    </Link>
                </div>
        </div>
    }
}

export default ListCategory