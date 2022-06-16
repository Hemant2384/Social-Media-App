import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from 'semantic-ui-react'
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import SinglePost from './pages/SinglePost';


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
    <Container>
    <MenuBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/posts/:postId' element={<SinglePost/>}/>
    </Routes>
    </Container>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
