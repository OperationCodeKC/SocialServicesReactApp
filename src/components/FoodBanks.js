import React, { Component } from 'react';
import geoFoodBanks from './geoBanks.json';

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
        const foodBankData = geoFoodBanks;  
    return (
         <table className="Table">
             <TableBody foodBankData={foodBankData} />
         </table>   
          )
    }
}

export default Table;