import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true
})

type requestPostType = any

export const LoginAPI = {
  async authMe(email: string, password: string, rememberMe: boolean) {
    return await instance.post<requestPostType>('/auth/login', {
      email,
      password,
      rememberMe
    })
  },
  async logout() {
    return await instance.delete('/auth/me')
  }
}

export const RegistrationAPI = {
  async regMe(email: string, password: string) {
    return await instance.post<requestPostType>('/auth/register', {
      email,
      password,
    })
  }
}

export const RestorePasswordAPI = {
  async restorePassword(password: string, resetPasswordToken: string) {
    return await instance.post<requestPostType>('/auth/set-new-password', {
      password,
      resetPasswordToken
    })
  },
  async sendEmailForUpdatePassword(email: string, from: string, message: string) {
    return await axios.post<requestPostType>('https://neko-back.herokuapp.com/2.0/auth/forgot', {
      email,
      from,
      message
    }, {withCredentials: true})
  }
}

