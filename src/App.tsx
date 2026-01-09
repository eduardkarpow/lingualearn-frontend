import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UploadVideoComponent from './Components/UploadVideoComponent';
import VideosComponent from './Components/VideosComponent';
import VideoComponent from './Components/VideoComponent';

function App() {
  return (
    <BrowserRouter>  
      <div className="App">
        <Routes>
          <Route path="/upload" element={<UploadVideoComponent/>}/>
          <Route path="/videos" element={<VideosComponent/>}/>
          <Route path="/video/:id" element={<VideoComponent/>}/>
        </Routes>        
      </div>
    </BrowserRouter>
  );
}

export default App;
