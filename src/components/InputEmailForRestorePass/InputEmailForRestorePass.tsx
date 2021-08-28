import {SuperButton} from "../common/c2-SuperButton/SuperButton";
import stylesContainer from "../common/styles/Container.module.css";
import {NavLink, Redirect} from "react-router-dom";
import styles from "./InputEmailForRestorePass.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import React, {ChangeEvent, useState} from "react";
import {sendEmailForUpdatePasswordTC} from "../../redux/reducers/reducerRestorePassword";
import {Preloader} from "../common/preloader/Preloader";
import {
  emailErrorMessage,
  validateEmail,
  validateEmailStyles
} from "../common/validation/emailValidation";


export const InputEmailForRestorePass = () => {

  const dispatch = useDispatch()
  const sendEmail = useSelector<AppRootStateType, boolean>(state => state.restore.sendEmail)
  const entityStatus = useSelector<AppRootStateType, boolean>(state => state.restore.entityStatus)
  const [email, setEmail] = useState('')
  const [initialized, setInitialized] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)

  const from = "test-front-admin <ai73a@yandex.by>"
  const message = `<div style="background-color: lime; padding: 15px">
                     password recovery link: <a href='https://kamranbabaev.github.io/friday/?#/restorpassword/$token$'>link</a>
                     </div>`

  const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
    (validateEmail(e.currentTarget.value))
        ? setDisabledBtn(false)
        : setDisabledBtn(true)
    setEmail(e.currentTarget.value)
  }

  const sendInstructionHandler = () => {
    setInitialized(true)
    setTimeout(() => dispatch(sendEmailForUpdatePasswordTC(email, from, message)), 1000)
    setEmail("")
  }

  if (sendEmail) {
    return <Redirect to={"/checkemail"}/>
  }

  return (
      <div className={stylesContainer.container}>
        <div className={stylesContainer.titleApp}>
          <h1>Brain storm</h1>
          <h3>Forgot your password?</h3>
        </div>
        {initialized && <Preloader/>}
        <form className={stylesContainer.form}>
          <div className={stylesContainer.item}>
            <p>Email:</p>
            <div style={validateEmailStyles(email)}
                 className={stylesContainer.inputBlock}>
              <input onChange={emailTarget} value={email} type="text"
                     placeholder="example@ddd.com"/>
            </div>
            {emailErrorMessage(email)}
          </div>
          <div className={styles.restoreBlock}>
            <p>Enter your email address and we will send you further
              instruction...</p>
            <SuperButton entityStatus={entityStatus}
                         onClickHandler={sendInstructionHandler}
                         disabledBtn={disabledBtn}
                         title="Send Instructions"
            />
            <p>Did you remember your password?</p>
            <div>
              <NavLink className={styles.navLink} to={'/login'}>
                Try logging in</NavLink>
            </div>
          </div>
        </form>
      </div>
  )
}