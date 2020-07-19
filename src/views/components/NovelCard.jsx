import React from 'react';

const ProductCard = (props) => {
    return(
        <div className="card text-center text-white d-inline-block" style={{ backgroundColor: "black", width: "14rem"}}>
            <img src={props.imgsrc} className="card-img-top mt-2" style={{ width: "13rem", height: "12rem" }} alt={props.title}/>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">By : {props.author}</p>
            </div>
            </div>
    )
}

export default ProductCard