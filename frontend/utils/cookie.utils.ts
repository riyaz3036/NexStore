import Cookies from 'js-cookie'

const ACCESS_TOKEN_COOKIE_NAME = 'access_token'

const COOKIE_CONFIG = {
  domain: process.env.VITE_COOKIE_DOMAIN,
  path: '/',
  secure: true,
  sameSite: 'strict' as const,
  expires: 7
}

export const getAccessTokenFromCookie = () => {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
}

export const setAccessTokenInCookie = (accessToken: string) => {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, COOKIE_CONFIG)
}

export const clearAccessTokenInCookie = () => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME, {
    domain: process.env.VITE_COOKIE_DOMAIN
  })
}
