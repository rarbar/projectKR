import styles from './profile.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {Logout} from '../../redux/reducers/reducerLogin';
import {Redirect} from 'react-router-dom';

export const Profile = () => {

  const authMe = useSelector<AppRootStateType, boolean>(state => state.login.authMe)

  const dispatch = useDispatch()

  function logoutMe() {
    dispatch(Logout())
  }

  if (!authMe) {
    return <Redirect to={'/login'}/>
  }

  return (
      <div className={styles.profile}>
        <div className={styles.box}>
          <div className={styles.prof}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPhc-UqiuZfT4V37eO5MVVvSI3D_tUG5dIQ&usqp=CAU"
                alt="face"/>
            <h3>Petr Ivanov</h3>
            <p>Front-end developer</p>
            <button onClick={logoutMe}>Logout</button>
          </div>
          <div className={styles.numberCard}>
            <h2>Number of cards</h2>
            <p>1-100</p>
          </div>
        </div>
        <div className={styles.cards}>
          <h1>Packs list Petr’s</h1>
        </div>
      </div>
  )
}