import styles from './footer.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <ul className={styles.rutes}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/activities">Activities</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>
            <Link to="/classes">classes</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>
          <li>
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
          <li>
            <Link to="/super-admins">SuperAdmins</Link>
          </li>
          <li>
            <Link to="/trainers">Trainers</Link>
          </li>
        </ul>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © {new Date().getFullYear()} Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
