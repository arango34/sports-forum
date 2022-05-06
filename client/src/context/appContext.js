import { useReducer, useContext, createContext, useCallback } from 'react';
import axios from 'axios';
import reducer from './reducer';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SHOW_SPINNER,
  HIDE_SPINNER,
  SET_THREADS,
  SET_POSTS,
  SET_TITLE,
  SET_BTNS,
  SET_ALERT,
  SET_ALERT_TEXT,
  SET_TEXT,
  SET_THREAD_COUNTS,
  SET_LOGBAR,
  TOGGLE_LINKS,
  SET_SHOW_LINKS_FALSE,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  showSpin: false,
  isLoading: true,
  threads: [],
  posts: [],
  title: '',
  btns: [],
  alertText: '',
  alert: false,
  threadCounts: [],
  logbarChange: false,
  showLinks: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER });
  }, []);

  const authFetch = axios.create({
    baseURL: '/api',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const setBtns = (btns) => {
    dispatch({ type: SET_BTNS, payload: { btns } });
  };

  const showAlert = (alertText) => {
    dispatch({ type: SET_ALERT });
    dispatch({ type: SET_ALERT_TEXT, payload: { alertText } });

    setTimeout(() => {
      dispatch({ type: SET_ALERT });
      dispatch({ type: SET_TEXT });
    }, 1500);
  };

  const showSpinner = () => {
    dispatch({ type: SHOW_SPINNER });
    setTimeout(() => {
      dispatch({ type: HIDE_SPINNER });
    }, 3000);
  };

  const registerUser = async (currentUser) => {
    try {
      const resp = await axios.post('/api/auth/register', currentUser);
      showSpinner();
      dispatch({ type: REGISTER_USER, payload: resp.data });
      const { user, token } = resp.data;
      addUserToLocalStorage({ user, token });
    } catch (error) {
      const { data } = error.response;
      showAlert(data.msg);
      console.log(error);
    }
  };

  const loginUser = async (currentUser) => {
    try {
      const resp = await axios.post('/api/auth/login', currentUser);
      showSpinner();
      dispatch({ type: LOGIN_USER, payload: resp.data });
      const { user, token } = resp.data;
      initialState.user = user;
      initialState.token = token;
      addUserToLocalStorage({ user, token });
    } catch (error) {
      const { data } = error.response;
      showAlert(data.msg);
      console.log(error);
    }
  };

  const updatePostCount = async (sport) => {
    await axios.patch(`/api/forums/post/${sport}`);
  };

  const updateThreadCount = async (sport) => {
    await axios.patch(`/api/forums/thread/${sport}`);
  };

  const updateThreadPostCount = async (id) => {
    await axios.patch(`/api/threads/${id}`);
  };

  const updateUserPostCount = async (id) => {
    await axios.patch(`/api/posts/user/${id}`);
  };

  const getThreadCounts = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/forums/threads`);

      dispatch({
        type: SET_THREAD_COUNTS,
        payload: { threadCounts: data },
      });
    } catch (error) {
      console.log(error.data.response.msg);
    }
  }, []);

  const getThreads = useCallback(
    async (id, threadCount, page) => {
      getThreadCounts();
      try {
        const { data } = await axios.get(
          `/api/threads/${id}?type=thread&count=${threadCount}${
            page && `&page=${page}`
          }`
        );
        setBtns(data.btns);
        dispatch({ type: SET_THREADS, payload: { data } });
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    },
    [getThreadCounts]
  );

  const createThread = async (thread, sport, id) => {
    const { createdBy, text } = thread;
    try {
      const { data } = await authFetch.post('/threads/', thread);
      const post = { createdBy, text, threadId: data.id, postNum: 1 };
      await authFetch.post('/posts/', post);
      showSpinner();
      //forum
      updatePostCount(sport);
      updateThreadCount(sport);
      updateUserPostCount(id);
    } catch (error) {
      const { data } = error.response;
      showAlert(data.msg);
      console.log(error);
    }
  };

  const getPosts = useCallback(async (id, page, postss) => {
    getThreadCounts();
    try {
      let { data } = await axios.get(
        `/api/posts/${id}?page=${page}&type=post&posts=${postss}`
      );
      setBtns(data.btns);

      data = data.posts.map((item) => {
        const { _doc } = item;
        if (_doc.text.startsWith('<div')) {
          const index = _doc.text.lastIndexOf(`</div>`);
          const textToQuote = _doc.text.slice(index + 6);
          const textHtml = `<p class="text-to-quote">${textToQuote}</p>`;
          const newText = _doc.text.substring(0, index + 6) + textHtml;

          item._doc.text = newText;
          item = { ...item, reply: true };
        }

        return item;
      });

      dispatch({ type: SET_POSTS, payload: { data } });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const postReply = useCallback(
    async ({ post, sport, id, userId }) => {
      try {
        await authFetch.post(`/posts`, post);
        updatePostCount(sport);
        updateThreadPostCount(id);
        updateUserPostCount(userId);
      } catch (error) {
        console.log(error);
      }
    },
    [authFetch]
  );

  const setTitle = (title) => {
    dispatch({ type: SET_TITLE, payload: { title } });
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/auth/user/${id}`);
      logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const setLogbar = () => {
    dispatch({ type: SET_LOGBAR });
  };

  const toggleLinks = () => {
    dispatch({ type: TOGGLE_LINKS });
  };

  const setShowLinksFalse = () => {
    dispatch({ type: SET_SHOW_LINKS_FALSE });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        showSpinner,
        createThread,
        getThreads,
        getPosts,
        postReply,
        setTitle,
        setBtns,
        getThreadCounts,
        setLogbar,
        deleteUser,
        toggleLinks,
        setShowLinksFalse,
        authFetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
