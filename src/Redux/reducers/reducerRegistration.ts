import {RegistrationAPI} from '../../API/loginAPI';
import {entityStatusAC, entityStatusAT} from "./reducerLogin";

const initState = {
  authoriseMe: false,
  entityStatus: false
}

export const reducerRegistration = (state: any = initState, action: actionType) => {
  switch (action.type) {
    case 'REGISTRATION_ME':
      return {...state, authoriseMe: action.authoriseMe}
    case "ENTITY-STATUS":
      return {...state, entityStatus: true}
    default:
      return state
  }
}

export const registrationAC = (authoriseMe: boolean) => ({
  type: 'REGISTRATION_ME',
  authoriseMe
} as const)

export const registrationTC = (email: string, password: string,) => async (dispatch: any) => {
  dispatch(entityStatusAC())
  await RegistrationAPI.regMe(email, password)
  try {
    dispatch(registrationAC(true))
  } catch {
    dispatch(registrationAC(false))
  }
}

// types
type actionType = registrationAT | entityStatusAT
type registrationAT = ReturnType<typeof registrationAC>