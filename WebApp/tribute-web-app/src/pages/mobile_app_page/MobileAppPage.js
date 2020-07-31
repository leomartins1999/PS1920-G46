import React from "react";

function MobileAppPage(){
    return (
        <>
            <div className="text-center card container p-5">
                <h1 className="text-primary text-left">Tribute Android App</h1>
                <h5 className="text-secondary text-left">For volunteers</h5>
                <div className="row no-gutters mt-5">
                    <div className="col-4">
                        <img src="android.png" className="card-img"/>
                    </div>
                    <div className="col-6 container">
                        <div className="card-body text-left">
                            <p>Our mobile app is specially designed with volunteers in mind!<br/>
                            You can follow your favorite orgs and show interest in their events.<br/>
                            Download it from the <a href="/#">play store!</a></p>
                            <p>Not a volunteer? <a href="/login">Click here!</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileAppPage