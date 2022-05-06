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
  SET_FORUMS,
  SET_EDIT_ID,
  SET_ALERT,
  SET_ALERT_TEXT,
  SET_TEXT,
  SET_THREAD_COUNTS,
  SET_LOGBAR,
  TOGGLE_LINKS,
  SET_SHOW_LINKS_FALSE,
} from './actions';

const reducer = (state, action) => {
  if (action.type === REGISTER_USER) {
    return { ...state, user: action.payload.user, token: action.payload.token };
  }

  if (action.type === LOGIN_USER) {
    return { ...state, user: action.payload.user, token: action.payload.token };
  }

  if (action.type === LOGOUT_USER) {
    return { ...state, user: null, token: null };
  }

  if (action.type === SHOW_SPINNER) {
    return { ...state, showSpin: !state.showSpin };
  }

  if (action.type === HIDE_SPINNER) {
    return { ...state, showSpin: !state.showSpin };
  }

  if (action.type === SET_THREADS) {
    return { ...state, threads: action.payload.data };
  }

  if (action.type === SET_POSTS) {
    return { ...state, posts: action.payload.data };
  }

  if (action.type === SET_TITLE) {
    return { ...state, title: action.payload.title };
  }

  if (action.type === SET_BTNS) {
    return { ...state, btns: action.payload.btns };
  }

  if (action.type === SET_FORUMS) {
    return { ...state, forums: action.payload.data };
  }

  if (action.type === SET_EDIT_ID) {
    return {
      ...state,
      editId: action.payload.id,
      text: action.payload.text,
    };
  }

  if (action.type === SET_ALERT) {
    return { ...state, alert: !state.alert };
  }

  if (action.type === SET_ALERT_TEXT) {
    return { ...state, alertText: action.payload.alertText };
  }

  if (action.type === SET_TEXT) {
    return { ...state, alertText: '' };
  }

  if (action.type === SET_THREAD_COUNTS) {
    return { ...state, threadCounts: [...action.payload.threadCounts] };
  }

  if (action.type === SET_LOGBAR) {
    return { ...state, logbarChange: !state.logbarChange };
  }

  if (action.type === TOGGLE_LINKS) {
    return { ...state, showLinks: !state.showLinks };
  }

  if (action.type === SET_SHOW_LINKS_FALSE) {
    return { ...state, showLinks: false };
  }
};

export default reducer;
