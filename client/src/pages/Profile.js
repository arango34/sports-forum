import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
import ProfileForm from '../components/ProfileForm';

import './Profile.css';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const { setShowLinksFalse } = useAppContext();
  const [date, setDate] = useState();
  const [currentUser, setCurrentUser] = useState();
  const { id } = useParams();

  const alertSuccess = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/auth/user/${id}`);
      setCurrentUser(data);
      setDate(moment(data.createdAt).format('MMM Do, YYYY'));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='profile-section' onClick={setShowLinksFalse}>
      <h2 className='user-h2'>Account Info</h2>
      <div className='profile-alert'>
        <p className={showAlert ? 'red showalert' : 'hidden'}>
          User info updated
        </p>
      </div>
      <div className='profile-container'>
        <div className='stats-container'>
          <div className='profile-row date-row'>
            <p className='stats-p'>
              <span className='stats-label date-span g'>Date joined: </span>
              <span className='profile-date'>{date}</span>
            </p>
          </div>
          <div className='profile-row posts-row'>
            <p className='stats-p'>
              <span className='stats-label b posts g'>Posts: </span>
              <span className='profile-date'>{currentUser.posts}</span>
            </p>
          </div>
        </div>
        <ProfileForm currentUser={currentUser} alertSuccess={alertSuccess} />
      </div>
    </section>
  );
};

export default Profile;
