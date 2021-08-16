import './App.css';
import SuperInputText
    from './components/common/c1-SuperInputText/SuperInputText';
import SuperCheckbox from './components/common/c3-SuperCheckbox/SuperCheckbox';
import SuperButton from './components/common/c2-SuperButton/SuperButton';
import {Route, Switch} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import {Registration} from './components/Registration/Registration';
import {RestorPassword} from './components/RestorPassword/RestorPassword';
import {TestPage} from './components/TestPage/TestPage';
import {InputPassword} from './components/InputPassword/InputPassword';
import {Error404} from './components/Error404/Error404';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path={'/login'}
                       render={() => <Login/>}/>
                <Route path={'/profile'}
                       render={() => <Profile/>}/>
                <Route path={'/registration'}
                       render={() => <Registration/>}/>
                <Route path={'/restorpassword'}
                       render={() => <RestorPassword/>}/>
                <Route path={'/testPage'}
                       render={() => <TestPage/>}/>
                <Route path={'/inputpassword'}
                       render={() => <InputPassword/>}/>
                <Route path={'*'}
                       render={() => <Error404/>}/>
            </Switch>

            <SuperInputText/>
            <SuperCheckbox/>
            <SuperButton/>
        </div>
    );
}

export default App;
