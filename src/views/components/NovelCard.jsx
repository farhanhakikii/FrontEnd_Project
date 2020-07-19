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
    // <div style={{ backgroundColor: "black" /*backgroundImage: `url(${props.imgsrc})`, backgroundSize: "cover"*/}} className="card text-center d-inline-block">
    //         <div className="mt-4 overflow">
    //             <img src={props.imgsrc} style={{ width: "225px", height: "225px", objectFit: "contain" }} alt={props.title}/>
    //         </div>
    //         <div className="card-body text-white">
    //             <h4 className="card-title">
    //                 {props.title}
    //             </h4>
    //         <p className="card-text text-white">
    //             {props.author}
    //         </p>
    //         </div>
    //     </div>
}

export default ProductCard