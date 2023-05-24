import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Input, InputGroup, InputGroupText, Nav } from "reactstrap";

const CompaniesSearch = (props: any) =>
{
    const {searchTerm, setSearchTerm} = props;

    return(
            <div className = "my-3 px-2 pb-3 border-bottom">
               
               <h2> My Companies </h2> 
               <InputGroup>
                   <InputGroupText>
                   <FontAwesomeIcon
                       // color = "black"
                       icon={`fa-solid fa-magnifying-glass` as any}
                   />
                   </InputGroupText>
                   <Input 
                       className="form-control"
                       id="searchUser"
                       name="searchUser"
                       type="text"
                       value = {searchTerm} 
                       onChange = {(e)=>setSearchTerm(e.target.value)} 
                       placeholder = "Search..."
                       />
               </InputGroup>
            </div>
    )
}

export default CompaniesSearch;