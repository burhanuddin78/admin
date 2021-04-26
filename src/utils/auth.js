
import instance from '../config/axios/instance'
import axios from 'axios'

const querystring = require("query-string");
const AUTH_TOKEN_KEY = 'token'

export function loginUser(countryCode, number, password) {
    return new Promise((resolve, reject) => {
        try {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            axios.post(
                `https://api.dealmate.com.my/token?phoneNumber=${countryCode + number}`,
                querystring.stringify({
                    grant_type: "password",
                    password: password,
                }),
                {
                    headers: headers
                }
            ).then(
                (res) => {
                    console.log(res)
                    checkTokenValidOnLogin(res.data.access_token).then((data) => {
                        if (data == true) {
                            setAuthToken(res.data.access_token)
                            resolve()
                        } else {
                            reject('Not Admin')
                        }
                    })

                },
                (err) => {
                    console.error('Caught an error during login:', err)
                    reject(err)
                }
            )
        }
        catch (err) {
            console.error('Caught an error during login:', err)
            reject(err)
        }
    })
}

export function logoutUser() {
    clearAuthToken()
}

export function setAuthToken(token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
    instance.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export async function isLoggedIn() {
    let authToken = getAuthToken()
    if (authToken) {
        let isTokenValid = await checkTokenValid()
        console.log(isTokenValid)
        if (isTokenValid) {
            return true
        } else {
            return false
        }
    }
    return false
}

async function checkTokenValid() {
    try {
        // check if token is valid by calling api and remove token from cookies
        const response = await axios.get(
            `https://api.dealmate.com.my/api/account/getadminidfromtoken`,
            { headers: { 'Authorization': 'Bearer ' + getAuthToken() } }
        )
        const data = await response;
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        return false
    }
}

async function checkTokenValidOnLogin(token) {
    try {
        // check if token is valid by calling api and remove token from cookies
        const response = await axios.get(
            `https://api.dealmate.com.my/api/account/getadminidfromtoken`,
            { headers: { 'Authorization': 'Bearer ' + token } }
        )
        const data = await response;
        console.log(data)
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}