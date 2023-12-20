import axios from './axiosInstance';
import { CHANGE_EMAIL, CHANGE_PASSWORD, FORGOT_USERNAME, FORGOT_PASSWORD, UPDATE_TOKEN, DELETE_ACCOUNT } from '../../constants.ts';
var moment = require('moment');

class ProfileService {
    static instance;

    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.axios = axios;
        this.instance = this;
    }

 
    changeEmail = (body) => {
        let res = this.axios.post(CHANGE_EMAIL, {
            olduserID: body.olduserID,
            newuserID: body.newuserID,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }

    changePassword = (body) => {
        let res = this.axios.post(CHANGE_PASSWORD, {
            userID: body.userID,
            oldpassword: body.oldpassword,
            newpassword: body.newpassword,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }
    recoverUsername = (body) => {
        let res = this.axios.post(FORGOT_USERNAME, {
            firstName: body.firstName,
            lastName: body.lastName,
            license: body.license,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }
    recoverPassword = (body) => {
        let res = this.axios.post(FORGOT_PASSWORD, {
            userID: body.userID,
            api_token: body.api_token,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }
    updateTokenCall = (body) => {
        let res = this.axios.post(UPDATE_TOKEN, {
            loginName: body.loginName,
            deviceTokenString: body.deviceTokenString
        });
        return res;
    }

    deleteAccount = (body) => {
        let res = this.axios.post(DELETE_ACCOUNT, {
            email: body.email
        });
        return res;
    }

    updateToken = async (email, deviceTokenString) => {
        try {
            let body = {
                loginName: email,
                deviceTokenString: deviceTokenString
            };
            console.log('body', body);
            const response = await this.updateTokenCall(body);
            console.log('response update token', response.data);
            console.log('status', response.data.result[0].Status);
    
            if (response.data.result[0].Status === "OK") {
                console.log(translate('generalAlarms.successNotificationTokenUpdated'))
                // Alert.alert("SUCCESS", "Notification Token Updated", [
                //     {
                //         text: "OK", onPress: () => {
                //             // navigation.goBack()
                //             // onSelect()
                //         }
                //     }
                // ]);
    
            } else {
                Alert.alert("", translate('generalAlarms.alertTokenNotUpdated'), [
                    { text: "OK", onPress: () => { } }
                ]);
            }
    
    
    
        } catch (e) {
            console.log('e', e);
            Alert.alert("", translate('generalAlarms.somethingsWasWorng'), [
                { text: "OK", onPress: () => console.log(e) }
            ]);
        }
    }
}

export default new ProfileService();