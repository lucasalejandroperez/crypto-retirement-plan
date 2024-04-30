import { IconBox } from '../../components/box/IconBox/IconBox';
import { GradientLine } from '../../components/GradientLine/GradientLine';
import twitterImage from '../../assets/footer/media-twitter.svg';
import { SocialMedia } from '../../constants/constants';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/brand/app-logo.png';

import './styles.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links-container">
        <div className="footer__links-title-container">
          <div className="footer__links-title">
            <span>ABOUT</span>
            <div className="footer__links-title-gradient-line-container">
              <GradientLine />
            </div>
          </div>
          <Link to="/documentation" className="pepe">
            Documentation
          </Link>
          <Link to="/team">Team</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
        <div className="footer__links-title-container">
          <div className="footer__links-title">
            <span>SUPPORT</span>
            <div className="footer__links-title-gradient-line-container">
              <GradientLine />
            </div>
          </div>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="footer__links-title-container">
          <div className="footer__links-title footer__links-title--community">
            <span>COMMUNITY</span>
            <div className="footer__links-title-gradient-line-container">
              <GradientLine />
            </div>
          </div>
          <div className="footer__links-community-container">
            <a className="footer__links-community-item" href={SocialMedia.TWITTER} target="_blank" rel="noreferrer">
              <IconBox image={twitterImage} />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__image-container">
        <img className="footer__image" src={logoImage} alt="Crypto Retirement Logo" />
        <span>CRYPTO RETIREMENT PLAN</span>
      </div>
    </footer>
  );
};
