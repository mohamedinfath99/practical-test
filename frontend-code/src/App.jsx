
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './pages/Post';


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
