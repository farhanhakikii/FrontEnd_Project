import React from 'react'
import { Link } from 'react-router-dom';
import noImage from "../../assets/Images/no-image.jpg"
import NovelCard from "../components/NovelCard"

export class Novel extends React.Component{
    render() {
        const {novel, loading} = this.props

        if(loading){
            return <h2>Loading...</h2>
        }
        return (
            <div className="container-fluid center d-flex flex-wrap p-4">
                {novel.map((val) => {
                    return <div className="p-3">
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/novel/${val.id}`}>
                          <NovelCard imgsrc={val.image ? val.image : noImage} title={val.title} author={val.author.username}/>      
                        </Link>
                    </div>
                    // return <div key={novel.id} className="alert alert-primary">
                    //     <h4 className="alert-heading">{novel.title}</h4>
                    // </div>
                })}
            </div>
        )
    }
}

export default Novel;