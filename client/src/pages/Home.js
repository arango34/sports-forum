import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import HomeRow from '../components/HomeRow';
import Loading from '../components/Loading';

import { useAppContext } from '../context/appContext';

import './Home.css';

const Home = () => {
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logoutUser, getThreadCounts, setShowLinksFalse } =
    useAppContext();

  const getForums = useCallback(async () => {
    setIsLoading(true);
    getThreadCounts();
    try {
      const res = await axios.get('/api/forums');
      const { data } = res;
      setForums(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [getThreadCounts]);

  useEffect(() => {
    if (!user) {
      logoutUser();
    }
    getForums();
  }, [user, getForums, logoutUser]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className='forum-section' onClick={setShowLinksFalse}>
      {forums.map((item, i) => {
        return (
          <HomeRow key={i} className={i % 2 === 0 ? 'grey' : null} {...item} />
        );
      })}
    </section>
  );
};

export default Home;
