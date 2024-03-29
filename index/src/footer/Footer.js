import React from "react";

/**
 * Represents a footer in a page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Footer() {
    return(

  <>
        <footer className={"footerBox"}>

        <p className={"footerHeader"}>Noen av våre støttespillere! </p>

        <div className={"mainSectionFooter"}>
            <div className={"relatedCompanies"}>
                <img src={require("../pictures/nrk.jpg")} className="companyPic"  alt={"relatedCompanyPicture"}/>
                <p className={"companyDescription"}>NRK</p>
            </div>

            <div className={"relatedCompanies"}>
                <img src={require("../pictures/radioaa.png")} className="companyPic"  alt={"relatedCompanyPicture"}/>
                <p className={"companyDescription"}>Radio Ålesund</p>
            </div>

             <div className={"relatedCompanies"}>
                <img src={require("../pictures/smp.png")} className="companyPic"  alt={"relatedCompanyPicture"}/>
                <p className={"companyDescription"}>Sunnmørsposten</p>
            </div>
        </div>

        <div className="socialMediaBox">
            <img src={require("../pictures/socialmediaicons.png")} className="socialiconsPic" alt={"socialMediaIconsPicture"}/>
        </div>


        </footer>

  </>

    )
}