import React from 'react'

function Footer(){
    return(
        <div className="mainfooter">
            <div className="topfooter">
                <div className="column1">
                    <h3>Map</h3>
                    <iframe className="map" allowFullScreen 
                    title="Map of The Fisherman's Cafe"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA6KFP8N5jSy6JfjxYXPL2t5iZCqSqx2yw&q=place_id:ChIJYxm5QKGJqDMRLdh_A0crcdI&zoom=17&region=ph">
                    </iframe>
                </div>
                <div className="column2">
                    <h3>Cafe Hours</h3>
                    <h5>Mondays to Sundays.</h5>
                    <p>9:00 AM - 7:00 PM</p>
                    <h3>Location</h3>
                    <p>St. Peter and Paul Parish, Binaobao,</p>
                    <p>Bantayan Island</p>
                </div>
                <div className="Column3">
                    <h3>Contact</h3>
                    <a className="navigation-link" href="#facebook">facebook.com/thefishermanscafe</a><br/><br/>
                    <a className="navigation-link" href="#messenger">m.me/thefishermanscafe</a>
                    <h3>Others</h3>
                    <a className="navigation-link" href="#faq">Frequentyly Asked Questions (FAQs)</a><br/><br/>
                    <a className="navigation-link" href="#partners">For Partners</a>
                </div>
            </div>
            <div className="bottomfooter">
                <h5>Copyright 2021 The FisherMan's Cafe All Rights Reserved</h5>
            </div>
        </div>
    )
}

export default Footer;