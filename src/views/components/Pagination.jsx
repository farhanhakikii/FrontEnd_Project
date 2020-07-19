import React from 'react'

export class Pagination extends React.Component{
    render(){
        const { novelPerPage, totalNovel, paginate, nextPage, prevPage } = this.props
        const pageNumbers = []
        for(let i = 1; i <= Math.ceil( totalNovel / novelPerPage ); i++){
            pageNumbers.push(i)
        }
        return(
            <div>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => prevPage()}>Previous</a>
                    </li>
                    {
                        pageNumbers.map((val) => {
                            return <li className="page-item" key={val}>
                                <a className="page-link" href="#" onClick={() => paginate(val)}>{val}</a>
                            </li>
                        })
                    }
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => nextPage()}>Next</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Pagination;