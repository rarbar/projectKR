import styles from './Login.module.css'
import stylesContainer from '../common/styles/Container.module.css'
import React, {ChangeEvent, useState} from "react";
import eye from "../common/icons/eye.png";
import closedEye from "../common/icons/closedEye.png";
import {SuperButton} from '../common/c2-SuperButton/SuperButton';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {loginTC} from "../../redux/reducers/reducerLogin";
import {NavLink, Redirect} from "react-router-dom";
import {Preloader} from "../common/preloader/Preloader";
import {
  emailErrorMessage,
  validateEmail,
  validateEmailStyles
} from "../common/validation/emailValidation";
import {
  passwordErrorMessage,
  validatePasswordStyles
} from "../common/validation/passwordValidation";

export const Login = () => {

  const dispatch = useDispatch()
  const authMe = useSelector<AppRootStateType, boolean>(state => state.login.authMe)
  const entityStatus = useSelector<AppRootStateType, boolean>(state => state.login.entityStatus)
  const [initialized, setInitialized] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)

  const changeViewPassword = () => {
    setOpenPassword(!openPassword)
  }

  const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(!(validateEmail(e.currentTarget.value) && (password.length > 7)))
    setEmail(e.currentTarget.value)
  }

  const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(!(validateEmail(email) && (e.currentTarget.value.length > 7)))
    setPassword(e.currentTarget.value)
  }

  const loginHandler = () => {
    setInitialized(true)
    dispatch(loginTC(email, password, checked))
    setEmail('')
    setPassword('')
    setChecked(false)
    setInitialized(false)
  }

  if (authMe) {
    return <Redirect to={'/'}/>
  }

  return (
      <div className={stylesContainer.container}>
        <div className={stylesContainer.titleApp}>
          <h1>Brain storm</h1>
          <h2>Sign in</h2>
        </div>
        {initialized && <Preloader/>}
        <form className={stylesContainer.form}>
          <div className={stylesContainer.item}>
            <p>Email:</p>
            <div style={validateEmailStyles(email)}
                 className={stylesContainer.inputBlock}>
              <input onChange={emailTarget}
                     value={email}
                     type="text"
                     placeholder="example@ddd.com"/>
            </div>
            {emailErrorMessage(email)}
          </div>
          <div className={stylesContainer.item}>
            <p>Password:</p>
            <div style={validatePasswordStyles(password)}
                 className={stylesContainer.inputBlock}>
              <input onChange={passwordTarget}
                     value={password}
                     type={openPassword ? "text" : "password"}
                     placeholder="****"/>
              <img onClick={changeViewPassword} alt=''
                   src={openPassword ? eye : closedEye}/>
            </div>
            {passwordErrorMessage(password)}
            <div className={styles.restorePasswordBlock}>
              <NavLink to={'/inputemail'}>
                forgot password?
              </NavLink>
            </div>
          </div>
          <div className={styles.rememberMe}>
            <input onClick={() => setChecked(!checked)}
                   className={styles.checkbox}
                   type="checkbox"/>
            <span>remember me</span>
          </div>
          <SuperButton entityStatus={entityStatus}
                       disabledBtn={disabledBtn}
                       title="Login"
                       onClickHandler={loginHandler}/>
          <p>Don't have an account?</p>
          <div className={styles.loginBlock}>
            <NavLink to={'/registration'}>
              Sign Up</NavLink>
          </div>
        </form>
      </div>
  )
}