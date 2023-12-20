import axios from './axiosInstance';
import { LOGIN, SIGNUP, GETTOKEN, ISACTIVATED, ACCEPT_T_C, TESTWITHSSL, MOVIES } from '../../constants';
var moment = require('moment');
import { getFromSecureStore } from '../helper';
import { ServerData, TokenData } from '../../../types/types';
import { ServerErrors } from '../../enums';

class AuthService {
    static instance;

    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.axios = axios;
        this.instance = this;
    }

    DoLogin = (body) => {
        let res = this.axios.post(LOGIN, {
            userName: body.userName,
            password: body.password,
            api_token: body.api_token
        });
        return res;
    }
    DoLoginWithSSL = (body) => {
        let res = this.axios.post(TESTWITHSSL, {
            userName: body.userName,
            password: body.password,
            api_token: body.api_token
        });
        return res;
    }

    try = () => {
        let res = this.axios.post(char,{ }, {withCredentials: true});
        return res;
    }

    getMOVIES = (body) => {
        return this.axios.get(MOVIES);
    }
   
      postData = async (url = '', data = {}) => {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'token': "IntcInR5cFwiOlwiSldUXCIsXCJhbGdcIjpcIkhTMjU2XCJ9Ig.eyJDb21wYW55IjoiU29ub3JhIC0gQXBwIERldmVsb3BtZW50IENvbXBhbnkiLCJUb3B0ZWNoUHJvZHVjdCI6IkwyRCIsIkNyZWF0aW9uRGF0ZSI6IjIwMjEtMDktMjggMTE6MDA6NDgifQ.1EezgPf2v79q45ejwfCwb8nzNln1TN9vIectudIMn8k",
            'utcdate' : `${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

      postDataWithUserToken = async (url = '', data = {}) => {
        // Opciones por defecto estan marcadas con un *
        //const jwtToken = await getFromSecureStore("jwt");
        const jwtToken = await getFromSecureStore("jwt");
        if (jwtToken) {
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'token': `${jwtToken}`,
            'utcdate' : `${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
      }

    DoSignUp = (body) => {
        let res = this.axios.post(SIGNUP, {
            firstName: body.firstName,
            lastName: body.lastName,
            license: body.license,
            email: body.email,
            confirmEmail: body.confirmEmail,
            password: body.password,
            confirmPassword: body.confirmPassword,
            api_token: body.api_token,
            os: body.os,
            locale: body.locale.slice(0, 2)
        });
        console.console.log((res));
        return res;
    }

    getUserToken = () => {
        this.axios.post(GETTOKEN, {
            payload: {
                Company: "DRIVER_APP",
                ToptechProduct: "L2D",
            },
            data: {
                status: "true",
                exp_date: `${moment.utc().add(5, 'years').format('YYYY-MM-DD HH:mm:ss')}`
            }
        }).then(function (response: ServerData | null) {
            if (response !== null) {
                console.log('SERVERDATA:::::::::::::::::::::::', response);
                console.log('SERVERDATA::::::::::::ERRORERRORERROR:::::::::::', response.data.error[0].msg);
                if (response.data.error[0].msg == ServerErrors.TOKEN_NOT_VALID_AT_ENDPOINT) {
                    console.log('TOKEN NOT VALID AT ENDPOINT');
                    return "Token not valid at endpoint";
                }
                return response;
            }else{
                return response
            }
        })
            .catch(function (error: Error) {
                let message = 'Unknown Error';
                if (error instanceof Error) message = error.message;
                console.log('error message: ', message);
                return "";
            });
    }


    getUserToken2 = async (): Promise<TokenData | string> => {
        try {
            const response = await this.axios.post(GETTOKEN, {
                payload: {
                    Company: "DRIVER_APP",
                    ToptechProduct: "L2D",
                },
                data: {
                    status: "true",
                    exp_date: `${moment.utc().add(5, 'years').format('YYYY-MM-DD HH:mm:ss')}`
                }
            });
            console.log('SERVERDATA:::::::::::::::::::::::', response);


            if (response.data.error.length > 0 && response.data.error[0].msg === ServerErrors.TOKEN_NOT_VALID_AT_ENDPOINT) {
                console.log('TOKEN NOT VALID AT ENDPOINT');
                return "Token not valid at endpoint";
            }
            return response.data as TokenData;
        } catch (error) {
            let message = 'Unknown Error';
            if (error instanceof Error) {
                message = error.message;
            }
            console.log('error message: ', message);
            return "";
        }
    }

    isUserVerified = (body) => {
        let res = this.axios.post(ISACTIVATED, {
            userID: body.userID
        });
        return res;
    }

    acceptTermsAndConditions = (body) => {
        let res = this.axios.post(ACCEPT_T_C, {
            userName: body.userName
        });
        return res;
    }
  

    

}

export default new AuthService();