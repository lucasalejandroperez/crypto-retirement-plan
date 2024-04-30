import { GrMail } from 'react-icons/gr';
import { BsTwitter } from 'react-icons/bs';
import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { Contacts, SocialMedia } from '../../../../constants/constants';
import './styles.scss';

export const ContactUs = () => {
  return (
    <PageContainer>
      <div className="contact-us">
        <h1>Contact Us</h1>
        <p>
          At Crypto Retirement Plan, we are committed to excellence and transparency. If you have questions, comments,
          or need assistance with our services, please do not hesitate to contact us. Your satisfaction and trust are
          our priority.
        </p>
        <h2>Co-founders</h2>
        <p>
          Christian Perez and Lucas Perez are the visionaries behind Crypto Retirement Plan. As software engineers
          passionate about blockchain technology, they have dedicated their careers to developing secure and reliable
          solutions for the financial future. Their commitment to innovation and security is the cornerstone of our
          platform.
        </p>
        <h2>Direct Contact</h2>
        <p>
          For general inquiries, suggestions, or comments, you can contact us directly through our personal email
          addresses:
        </p>
        <span className="mail-link">
          Christian Perez
          <a href={`mailto:${Contacts.CHRISTIAN}`} target="_blank" rel="noreferrer" className="mail-link">
            <GrMail />
            <span>{`${Contacts.CHRISTIAN}`}</span>
          </a>
        </span>
        <span className="mail-link">
          Lucas Perez
          <a href={`mailto:${Contacts.LUCAS}`} target="_blank" rel="noreferrer" className="mail-link">
            <GrMail />
            <span>{`${Contacts.LUCAS}`}</span>
          </a>
        </span>
        <p>We strive to respond to all inquiries promptly and with the attention you deserve.</p>
        <h2>Social Networks</h2>
        <span className="social-link">
          Stay connected and follow our latest updates and news on Twitter:{' '}
          <a href={SocialMedia.TWITTER} target="_blank" rel="noreferrer">
            <BsTwitter />
            <span>@cryptoretirementplan</span>
          </a>
          . Here we share insights from the crypto world, important updates of our platform, and much more.
        </span>
        <h2>Have Specific Questions?</h2>
        <p>
          Whether you need help selecting the right retirement plan, have questions about how the Polygon blockchain
          works, or simply want to know more about how to protect your financial future with cryptocurrencies, we are
          here to help.
        </p>
        <h2>Technical Support</h2>
        <p>
          If you encounter technical problems or have questions related to the operation of the platform, our technical
          support team is available to ensure your experience is smooth and secure.
        </p>
      </div>
    </PageContainer>
  );
};
