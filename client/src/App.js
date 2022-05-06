import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginBar from './components/LoginBar';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Thread from './pages/Thread';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PostTopic from './pages/PostTopic';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      <Navbar />
      <LoginBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/forum/post-topic/:sport/:id' element={<PostTopic />} />
        <Route path='/thread/:sport/:id/:postss/:page' element={<Thread />} />
        <Route path='/forum/:sport/:threadss/:id/:page' element={<Forum />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
