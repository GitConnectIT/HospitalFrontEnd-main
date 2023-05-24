import React from "react";
import { Container, Card, CardBody, CardSubtitle, CardTitle, Button} from "reactstrap";
import IUserData from "../../../interfaces/IUserData";

// const logo: string =
//   require("../main/assets/images/users/user4.jpg").default;


const ProfileViewData = (props: any) =>
{
    const { userData } = props;
    console.log(userData, "WDA")
    

    return(
    userData && <Container style = {{backgroundColor: "white", marginTop: "1rem", borderRadius: "1rem",border: "1px solid grey",}}>
        <div style = {{display: "flex", flexDirection: "column", alignItems: "center", }}>
            <p> {userData.firstName} {userData.lastName} </p>
            {/* <img src = {logo} alt = "immage" /> */}
        </div>
        <div> 
        <Card> 
            <CardBody className="border-top p-4">
            <div>
                    <CardSubtitle className="text-muted fs-5">Name</CardSubtitle>
                    <CardTitle tag="h5">
                        {userData.firstName} {userData.lastName}
                    </CardTitle>

                    <CardSubtitle className="text-muted fs-5 mt-3"> Phone</CardSubtitle>
                    <CardTitle tag="h5">
                        {userData.phoneNumber}
                    </CardTitle>

                    <CardSubtitle className="text-muted fs-5 mt-3"> Email </CardSubtitle>
                    <CardTitle tag="h5">
                        {userData.email}
                    </CardTitle>

                    <CardSubtitle className="text-muted fs-5 mt-3">Address </CardSubtitle>
                    <CardTitle tag="h5">
                        <div className = "d-flex flex-column">
                            <div>
                                {userData.address ? userData.address : "No address yet"},  
                            </div>
                            <div>
                                {userData.state ? userData.state : "No state yet"},   
                            </div>
                            <div>
                                {userData.zipCode ? userData.zipCode : "No zip Code yet"}
                            </div>
                        </div> 
                    </CardTitle>

                    <CardSubtitle className="text-muted fs-5 mt-3"> Gender</CardSubtitle>
                    <CardTitle tag="h5">
                        {userData.gender ? userData.gender : "No gender yet"}
                    </CardTitle>

                    <CardSubtitle className="text-muted fs-5 mt-3 mb-2">
                    Social Profile
                    </CardSubtitle>
                    <div className="d-flex align-items-center gap-2">
                    <Button className="btn-circle" color="info">
                        <i className="bi bi-facebook"></i>
                    </Button>
                    <Button className="btn-circle" color="success">
                        <i className="bi bi-twitter"></i>
                    </Button>
                    <Button className="btn-circle" color="danger">
                        <i className="bi bi-youtube"></i>
                    </Button>
                    </div>
                </div>
                </CardBody>
            </Card>
        </div>
    </Container>
    )
}

export default ProfileViewData;