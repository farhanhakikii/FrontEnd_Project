import React from 'react'
import { Link } from 'react-router-dom';
import noImage from "../../assets/Images/no-image.jpg"
import NovelCard from "../components/NovelCard"

export class Novel extends React.Component{
    render() {
        const {novel, loading, searchBar} = this.props

        if(loading){
            return <h2>Loading...</h2>
        }
        return (
            <div className="container-fluid center d-flex flex-wrap p-4">
                {novel.map((val) => {
                    if(val.title.toLowerCase().includes(searchBar)){
                    return <div className="p-3">
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/novel/${val.id}`}>
                          <NovelCard imgsrc={val.image ? val.image : noImage} title={val.title} author={val.author.username ? val.author.username : null}/>      
                        </Link>
                    </div>
                    }
                })}
            </div>
        )
    }
}

export default Novel;