import './footer.styles.scss';
import Gmail from '../../assets/gmail.png';
import Facebook from '../../assets/facebook.png';
import Github from '../../assets/github.png';
import LinkedIn from '../../assets/linkedin.png';
import {Outlet} from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <Outlet />
      <div className="footer-container">
        <div className="contact-container">
          <h6
            style={{
              color: 'gray',
              textDecoration: 'underline',
              height: '30px',
              textAlign: 'center',
            }}
          >
            Contact:{' '}
          </h6>
          <div className="gmail">
            <h6>
              <img
                src={Gmail}
                alt="gmail"
                style={{width: '20px', height: '20px'}}
              />
            </h6>
            <h6
              style={{
                color: 'gray',
                paddingLeft: '8px',
                paddingTop: '2px',
              }}
            >
              ovidiupetric99@gmail.com
            </h6>
          </div>
          <div className="facebook">
            <h6>
              <img
                src={Facebook}
                alt="facebook"
                style={{width: '20px', height: '20px'}}
              />
            </h6>
            <h6
              style={{
                color: 'gray',
                paddingLeft: '8px',
                paddingTop: '2px',
              }}
            >
              facebook.com/ovidiupetricvasiliu/
            </h6>
          </div>
        </div>
        <div className="follow-container">
          <h6
            style={{
              color: 'gray',
              textDecoration: 'underline',
              height: '30px',
              textAlign: 'center',
            }}
          >
            Follow:{' '}
          </h6>
          <div className="github">
            <h6>
              <img
                src={Github}
                alt="github"
                style={{width: '20px', height: '20px'}}
              />
            </h6>
            <h6
              style={{
                color: 'gray',
                paddingLeft: '8px',
                paddingTop: '2px',
              }}
            >
              github.com/ovidiupetric99
            </h6>
          </div>
          <div className="linkedin">
            <h6>
              <img
                src={LinkedIn}
                alt="linkedin"
                style={{width: '20px', height: '20px'}}
              />
            </h6>
            <h6
              style={{
                color: 'gray',
                paddingLeft: '8px',
                paddingTop: '2px',
              }}
            >
              linkedin.com/in/ovidiu-petric-766b471b4/
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
