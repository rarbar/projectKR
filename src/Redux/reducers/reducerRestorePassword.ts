import {RestorePasswordAPI} from "../../API/loginAPI";
import {entityStatusAC, entityStatusAT} from "./reducerLogin";

const initState = {
  updatePassword: false,
  sendEmail: false,
  entityStatus: false
}

export const reducerRestorePassword = (state: any = initState, action: actionType) => {

  switch (action.type) {
    case "RESTORE_PASSWORD_AUTH_ME":
      return {...state, updatePassword: action.updatePassword}
    case "SEND_EMAIL_FOR_UPDATE_PASS":
      return {...state, sendEmail: action.sendEmail}
    case "ENTITY-STATUS":
      return {...state, entityStatus: true}
    default:
      return state
  }
}

export const restorePasswordAC = (updatePassword: boolean) => ({
  type: "RESTORE_PASSWORD_AUTH_ME",
  updatePassword
} as const)

export const sendEmailForUpdatePasswordAC = (sendEmail: boolean) => ({
  type: "SEND_EMAIL_FOR_UPDATE_PASS",
  sendEmail
} as const)

export const sendEmailForUpdatePasswordTC = (email: string, from: string, message: string) => async (dispatch: any) => {
  dispatch(entityStatusAC())
  await RestorePasswordAPI.sendEmailForUpdatePassword(email, from, message)
  dispatch(sendEmailForUpdatePasswordAC(true))
}


export const restorePasswordTC = (password: string, token: string) => async (dispatch: any) => {
  dispatch(entityStatusAC())
  await RestorePasswordAPI.restorePassword(password, token)
  try {
    dispatch(restorePasswordAC(true))
  } catch {
    dispatch(restorePasswordAC(false))
  }
}

// types
type actionType =
    restorePasswordAT
    | sendEmailForUpdatePasswordAT
    | entityStatusAT
type restorePasswordAT = ReturnType<typeof restorePasswordAC>
type sendEmailForUpdatePasswordAT = ReturnType<typeof sendEmailForUpdatePasswordAC>