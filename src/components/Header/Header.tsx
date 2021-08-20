import {NavLink} from 'react-router-dom'


export const Header = () => {
    return (
        <div>
            <div>
                <NavLink to={'/login'}>Login</NavLink>
            </div>
            <div>
                <NavLink to={'/profile'}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/registration'}>Registration</NavLink>
            </div>
            <div>
                <NavLink to={'/restorpassword'}>Restorpassword</NavLink>
            </div>
            <div>
                <NavLink to={'/inputpassword'}>Inputpassword</NavLink>
            </div>
        </div>
    )
}