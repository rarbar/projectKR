import {SuperButton} from '../common/c2-SuperButton/SuperButton';
import styles from './Registration.module.css'
import stylesContainer from '../common/styles/Container.module.css'
import eye from '../common/icons/eye.png'
import closedEye from '../common/icons/closedEye.png'
import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {registrationTC} from '../../redux/reducers/reducerRegistration';
import {Redirect} from 'react-router-dom';
import {Preloader} from "../common/preloader/Preloader";
import {
  emailErrorMessage,
  validateEmail,
  validateEmailStyles
} from "../common/validation/emailValidation";
import {
  confirmPasswordMessage, confirmPasswordStyles,
  passwordErrorMessage,
  validatePasswordStyles
} from "../common/validation/passwordValidation";

export const Registration = () => {
  const dispatch = useDispatch()
  const authoriseMe = useSelector<AppRootStateType, boolean>(state => state.registration.authoriseMe)
  const entityStatus = useSelector<AppRootStateType, boolean>(state => state.registration.entityStatus)
  const [openPassword, setOpenPassword] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(false)


  const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(!(validateEmail(e.currentTarget.value) && (password.length > 7) && (passwordConfirm === password)))
    setEmail(e.currentTarget.value)
  }

  const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(!(validateEmail(email) && (e.currentTarget.value.length > 7) && (passwordConfirm === e.currentTarget.value)))
    setPassword(e.currentTarget.value)
  }
  const passwordConfirmTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(!(validateEmail(email) && (e.currentTarget.value.length > 7) && (password === e.currentTarget.value)))
    setPasswordConfirm(e.currentTarget.value)
  }

  const changeViewPassword = () => {
    setOpenPassword(!openPassword)
  }

  const registerHandler = () => {
    setInitialized(true)
    if (password === passwordConfirm) {
      setTimeout(() => dispatch(registrationTC(email, password)), 1000)
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
    } else {
      alert('Парли не совпадают.')
    }
  }

  const clearAllInputs = () => {
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
    setDisabledBtn(true)
  }


  if (authoriseMe) {
    return <Redirect to={'/profile'}/>
  }
  return (
      <div className={stylesContainer.container}>
        <div className={stylesContainer.titleApp}>
          <h1>Brain storm</h1>
          <h2>Sign up</h2>
        </div>
        {initialized && <Preloader/>}
        <form className={stylesContainer.form}>
          <div className={stylesContainer.item}>
            <p>Email:</p>
            <div style={validateEmailStyles(email)}
                 className={stylesContainer.inputBlock}>
              <input
                  onChange={emailTarget}
                  value={email}
                  type="text"
                  placeholder="example@ddd.com"
                  autoFocus/>
            </div>
            {emailErrorMessage(email)}
          </div>
          <div className={stylesContainer.item}>
            <p>Password:</p>
            <div style={validatePasswordStyles(password)}
                 className={stylesContainer.inputBlock}>
              <input
                  onChange={passwordTarget}
                  value={password}
                  type={openPassword ? 'text' : 'password'}
                  placeholder="****"/>
              <img onClick={changeViewPassword} alt=""
                   src={openPassword ? eye : closedEye}/>
            </div>
            {passwordErrorMessage(password)}
          </div>
          <div className={stylesContainer.item}>
            <p>Confirm password:</p>
            <div style={confirmPasswordStyles(password, passwordConfirm)}
                 className={stylesContainer.inputBlock}>
              <input
                  onChange={passwordConfirmTarget}
                  value={passwordConfirm}
                  type={openPassword ? 'text' : 'password'}
                  placeholder="****"/>
              <img onClick={changeViewPassword} alt=""
                   src={openPassword ? eye : closedEye}/>
            </div>
            {confirmPasswordMessage(password, passwordConfirm)}
          </div>
          <div className={styles.buttons}>
            <SuperButton onClickHandler={clearAllInputs} title="Cancel"/>
            <SuperButton entityStatus={entityStatus}
                         onClickHandler={registerHandler}
                         disabledBtn={disabledBtn} title="Register"/>
          </div>
        </form>
      </div>
  )
}