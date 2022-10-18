import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons'
import ReactGA from "react-ga4";

export default class SocialButtons extends Component {
  constructor(props, context) {
    super(props, context);

    this.trackSocialMediaClick = this.trackSocialMediaClick.bind(this);
  }

  render() {
    return(
      <span className="social-buttons">
        <a
            href="https://www.instagram.com/startklar.bayern"
            rel="noreferrer"
            target="_blank"
            title="Instagram"
            onClick={this.trackSocialMediaClick}>
            <FontAwesomeIcon icon={faInstagram}/>
        </a>
        <a
            rel="noreferrer"
            href="https://www.facebook.com/events/344004301162008"
            target="_blank"
            title="Facebook"
            onClick={this.trackSocialMediaClick}>
            <FontAwesomeIcon icon={faFacebook}/>
        </a>
        <a
            rel="noreferrer"
            href="https://www.tiktok.com/@startklar.bayern"
            target="_blank"
            title="TikTok"
            onClick={this.trackSocialMediaClick}>
            <FontAwesomeIcon icon={faTiktok}/>
        </a>
      </span>
    )
  }

  trackSocialMediaClick(e) {
    const platform = e.target.title;

    ReactGA.event({
        category: "socialMedia",
        action: "clickSocialMediaLink",
        label: platform,
    });
  }
}
