import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';

import { useAppContext } from '../context/appContext';

import './Navbar.css';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const { threadCounts, user, showLinks, toggleLinks, setShowLinksFalse } =
    useAppContext();

  const getForums = useCallback(async () => {
    try {
      const res = await axios.get('/api/forums');
      const { data } = res;
      const links = data.map((item) => {
        const threadCount = threadCounts.reduce((total, thread) => {
          if (thread.name === item.name) {
            total = total + thread.threadCount;
          }
          return total;
        }, 0);

        return {
          name: item.name,
          link: `/forum/${item.name}/${threadCount}/${item._id}/1`,
        };
      });
      setLinks(links);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [threadCounts]);

  useEffect(() => {
    getForums();
  }, [threadCounts, getForums]);

  if (isLoading) {
    return (
      <>
        <nav>
          <div className='nav-center'>
            <Link to='/' onClick={setShowLinksFalse}>
              <h1 className='nav-h2'>SPORTS</h1>
            </Link>
            <GiHamburgerMenu className='ham' onClick={() => toggleLinks()} />
          </div>
        </nav>
        <div className={showLinks ? 'links-container show' : 'links-container'}>
          {}
        </div>
      </>
    );
  }

  return (
    <>
      <nav onClick={showLinks ? setShowLinksFalse : undefined}>
        <div className='nav-center'>
          <Link to='/' onClick={setShowLinksFalse}>
            <h1 className='nav-h2'>SPORTS</h1>
          </Link>
          <GiHamburgerMenu className='ham' onClick={toggleLinks} />
        </div>
      </nav>
      <div className={showLinks ? 'links-container show' : 'links-container'}>
        <ul className='links'>
          {user && (
            <>
              <div className='navLink-title-container account'>
                <div className='underline-container-user'>
                  <p className='navLink-title'>Account Info</p>
                  <div className='navLink-underline'></div>
                </div>
              </div>
              <div className='account-info-container'>
                <Link
                  to={`/profile/${user._id}`}
                  className={'link nav-link '}
                  onClick={setShowLinksFalse}
                >
                  <div className='account-info-flex'>
                    <FaRegUserCircle className='user-circle' />
                    <p>{user.userName}</p>
                  </div>
                </Link>
              </div>
            </>
          )}
          <div className='navLink-title-container forums'>
            <div className='underline-container-forum'>
              <p className='navLink-title'>Forums</p>
              <div className='navLink-underline'></div>
            </div>
          </div>
          <div className='radius'>
            {links.map((item, i) => {
              return <NavLink key={i} {...item} index={i} />;
            })}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
