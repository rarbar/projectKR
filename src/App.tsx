import './App.css';
import {Route, Switch} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import {Registration} from './components/Registration/Registration';
import {TestPage} from './components/TestPage/TestPage';
import {InputPassword} from './components/InputPassword/InputPassword';
import {Error404} from './components/Error404/Error404';
import {Header} from "./components/Header/Header";
import {RestorePassword} from './components/RestorePassword/RestorePassword';
import {InputEmailForRestorePass} from "./components/InputEmailForRestorePass/InputEmailForRestorePass";
import {CheckEmail} from "./components/CheckEmail/CheckEmail";
import {Preloader} from "./components/common/preloader/Preloader";


function App() {

  return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path={'/'}
                 render={() => <Profile/>}/>
          <Route path={'/login'}
                 render={() => <Login/>}/>
          <Route path={'/registration'}
                 render={() => <Registration/>}/>
          <Route path={'/testPage'}
                 render={() => <TestPage/>}/>
          <Route path={'/checkemail'}
                 render={() => <CheckEmail/>}/>
          <Route path={'/inputpassword'}
                 render={() => <InputPassword/>}/>
          <Route path={'/inputemail'}
                 render={() => <InputEmailForRestorePass/>}/>
          <Route path={`/restorpassword/:token`}
                 render={() => <RestorePassword/>}/>
          <Route path={'*'}
                 render={() => <Error404/>}/>
        </Switch>

      </div>
  );
}

export default App;
