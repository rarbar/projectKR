import {SuperButton} from "../common/c2-SuperButton/SuperButton";
import styles from "./RestorePassword.module.css"
import stylesContainer from "../common/styles/Container.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {ChangeEvent, useState} from "react";
import {restorePasswordTC} from "../../redux/reducers/reducerRestorePassword";
import eye from "../common/icons/eye.png";
import closedEye from "../common/icons/closedEye.png";
import {Redirect, useParams} from "react-router-dom";
import {Preloader} from "../common/preloader/Preloader";
import {
  passwordErrorMessage,
  validatePasswordStyles
} from "../common/validation/passwordValidation";

export const RestorePassword = () => {
  const [openPassword, setOpenPassword] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [password, setPassword] = useState('')
  const updatePassword = useSelector<AppRootStateType, string>(state => state.restore.updatePassword)
  const entityStatus = useSelector<AppRootStateType, boolean>(state => state.restore.entityStatus)
  const dispatch = useDispatch()

  let {token} = useParams<{ token: string }>();

  const changeViewPassword = () => {
    setOpenPassword(!openPassword)
  }

  const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const restoreHandler = () => {
    setInitialized(true)
    dispatch(restorePasswordTC(password, token))
    setPassword('')
  }


  if (updatePassword) {
    return <Redirect to={'/login'}/>
  }

  return (
      <div className={stylesContainer.container}>
        <div className={stylesContainer.titleApp}>
          <h1>Brain storm</h1>
          <h3>Create new password</h3>
        </div>
        {initialized && <Preloader/>}
        <form className={stylesContainer.form}>
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
          </div>
          <div className={styles.restoreBlock}>
            <p>Create new password and we will send your further instruction to
              email</p>
            <SuperButton entityStatus={entityStatus}
                         title="Create new password"
                         onClickHandler={restoreHandler}
                         disabledBtn={password.length > 0 && password.length < 8}
            />
            <div>
            </div>
          </div>
        </form>
      </div>
  )
}