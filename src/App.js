import './App.css';
import Navigation from './routes/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navigation />
      <ToastContainer />
    </>
  );
}

export default App;
