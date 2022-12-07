import './styling/App.css';
import Nav from './components/Nav';
import { useLoggedInContext } from './context/LoggedIn';
import Body from './components/Body';

function App() {
  const {loggedIn } = useLoggedInContext();
  return (
    <>
      {  loggedIn.user && <Nav/>}
      {/* <Body/> */}
      <Body/>
    </>
  );
}

export default App;
