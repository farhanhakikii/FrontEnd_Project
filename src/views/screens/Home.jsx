import React from 'react';
import { Carousel } from 'react-bootstrap'
import NovelCard from "../components/NovelCard"
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { connect } from "react-redux";
import noImage from "../../assets/Images/no-image.jpg"
import Novel from "../components/Novel"
import Pagination from "../components/Pagination"
import { Dropdown } from 'react-bootstrap';

class Home extends React.Component{
    state = {
        carousel: [],
        novelList: [],
        loading: false,
        currentPage: 1,
        novelPerPage: 15,
        category: [],
        selectedCategory: 0,
        viewByCategory: false,
        searchBar: ""
    }

    inputHandler = (e,field) => {
        this.setState({[field]: e.target.value})
    }

    viewNovel = () => {
        const { selectedCategory } = this.state
        if( selectedCategory == 0 ) {
            this.getNovel()
        } else {
            this.getNovelByCategory()
        }
    }

    renderCategory = () => {
        Axios.get(`${API_URL}/category`)
        .then((res) => {
          this.setState({category: res.data})
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getNovelByCategory = () => {
        Axios.get(`${API_URL}/novel/category/${this.state.selectedCategory}`)
        .then((res) => {
            this.setState({ novelList: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
  
    getNovel = () => {
        Axios.get(`${API_URL}/novel`)
            .then((res) => {
            this.setState({novelList: res.data})
            this.setState({loading: false})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.getNovel()
        this.renderCategory()
    }

    componentDidUpdate(){
        //this.viewNovel()
    }

    render() {
        const { currentPage, novelPerPage, novelList, loading } = this.state
        const indexOfLastNovel = currentPage * novelPerPage
        const indexOfFirstNovel = indexOfLastNovel - novelPerPage
        const currentNovel = novelList.slice(indexOfFirstNovel, indexOfLastNovel)

        const pageNumber = Math.ceil( novelList.length / novelPerPage )

        const paginate = pageNum => { this.setState({currentPage: pageNum}) }
        const nextPage = () => {
            if(currentPage < pageNumber) {
                this.setState({ currentPage: currentPage + 1 })
            } else {
                this.setState({ currentPage: pageNumber})
            }

        }
        const prevPage = () => {
            if(currentPage > 1) {
                this.setState({ currentPage: currentPage - 1 })
            } else {
                this.setState({ currentPage: 1})
            }
        }
        return (
            <>
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <div>
                        <div className="mr-4 text-white" style={{fontSize: 20}}>
                            <select value={this.state.selectedCategory} className="mt-2 rounded form-control" onChange={(e) => this.inputHandler(e, "selectedCategory")}>
                                <option hidden>Category</option>
                                {
                                    this.state.category.map((val) => {
                                        return <option value={val.id}>{val.categoryName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <input value={this.state.searchBar} style={{width: "750px", height: "35px", backgroundColor: "black", color: "white"}} 
                               type='text' className="form-control rounded mt-2 mr-4" placeholder='Search Novel' onChange={(e) => this.inputHandler(e, "searchBar")}/>
                    </div>
                    <div>
                        <button className="btn mt-2" style={{backgroundColor: "black", color: "white"}} onClick={this.viewNovel}>Filter</button>
                    </div>
                </div>
                <Novel novel={currentNovel} loading={loading} searchBar={this.state.searchBar}/>
                <div className="mt-5">
                    <Pagination novelPerPage={novelPerPage} totalNovel={novelList.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

  
export default connect(mapStateToProps)(Home);