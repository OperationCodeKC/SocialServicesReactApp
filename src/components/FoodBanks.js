import React, { Component } from 'react';

const TableBody = props => {
    const rows = props.foodBankData.map((row,index)=>{
        return(
            <tr key={index}>
                <td>{row.Name}</td>
                <td>{row.Address}</td>
                <td>{row.City}</td>
                <td>{row.State}</td>
                <td>{row.Zipcode}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody>
  }

class Table extends Component {
    render(){
      const { foodBankData } = this.props     
    return (
         <table className="Table">
             <TableBody foodBankData={foodBankData} />
         </table>   
          )
    }
}

export default Table;