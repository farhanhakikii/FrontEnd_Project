import React from 'react';
import { Carousel } from 'react-bootstrap'
import NovelCard from "../components/NovelCard"
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import noImage from "../../assets/Images/no-image.jpg"
import Novel from "../components/Novel"
import Pagination from "../components/Pagination"
import swal from 'sweetalert';

class Home extends React.Component{
    state = {
        carousel: [],
        novelList: [],
        loading: false,
        currentPage: 1,
        novelPerPage: 15
    }

    // getCarousel = () => {
    //     Axios.get(`${API_URL}/carousel`)
    //     .then((res) => {
    //         this.setState({carousel: res.data})
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    getNovel = () => {
        Axios.get(`${API_URL}/novel`)
        //Axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then((res) => {
            this.setState({novelList: res.data})
            this.setState({loading: false})
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.getNovel()
    }

    // renderCarousel = () => {            
    //     return this.state.carousel.map((val) => {
    //         return <Carousel.Item>
    //             <img className="d-block w-100" src={val.image} style={{ height: "595px", width: "400px"}} alt="First slide"/>
    //             <Carousel.Caption>
    //                 <h1>{val.Description}</h1>
    //             </Carousel.Caption>
    //         </Carousel.Item>   
    //     })
    // }

    // productList = () => {
    //     return <div className="container-fluid center d-flex flex-wrap p-4">
    //             {
    //                 this.state.novelList.map((val) => {
    //                     return <div className="p-3">
    //                               <Link style={{ textDecoration: "none", color: "inherit" }} to={`/novel/${val.id}`}>
    //                                 <NovelCard imgsrc={val.image ? val.image : noImage} title={val.title} author={val.author.username}/>      
    //                               </Link>
    //                            </div>
    //                 })
    //             }
    //             </div>
    // }
    render() {
        const { currentPage, novelPerPage, novelList, loading } = this.state
        const indexOfLastNovel = currentPage * novelPerPage
        const indexOfFirstNovel = indexOfLastNovel - novelPerPage
        const currentNovel = novelList.slice(indexOfFirstNovel, indexOfLastNovel)

        const paginate = pageNum => { this.setState({currentPage: pageNum}) }
        const nextPage = () => this.setState({ currentPage: currentPage + 1 })
        const prevPage = () => this.setState({ currentPage: currentPage - 1 })
        return (
            <>
            {/* <div>
                <Carousel>
                    {this.renderCarousel()} 
                </Carousel>
            </div>
            {this.productList()} */}
                <h1 className="mt-1 border p-1 text-center">Our Novel List</h1>
                <Novel novel={currentNovel} loading={loading}/>
                <Pagination novelPerPage={novelPerPage} totalNovel={novelList.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />

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