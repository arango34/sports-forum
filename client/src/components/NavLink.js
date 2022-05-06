import {
  FaFootballBall,
  FaBasketballBall,
  FaBaseballBall,
  FaHockeyPuck,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './NavLink.css';

const NavLink = ({ name, link, setShowLinks, showLinks, index }) => {
  return (
    <li>
      <Link
        to={link}
        className={
          index === 3 ? 'link nav-link radius-bottom' : 'link nav-link'
        }
        onClick={() => setShowLinks(!showLinks)}
      >
        <div className='account-info-flex'>
          {name === 'Football' ? (
            <FaFootballBall className='user-circle' />
          ) : name === 'Basketball' ? (
            <FaBasketballBall className='user-circle' />
          ) : name === 'Baseball' ? (
            <FaBaseballBall className='user-circle' />
          ) : (
            <FaHockeyPuck className='user-circle' />
          )}
          <p>{name}</p>
        </div>
      </Link>
    </li>
  );
};

export default NavLink;
