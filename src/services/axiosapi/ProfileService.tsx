import { useAxiosInstance } from './axiosHook'
import { CHANGE_EMAIL, CHANGE_PASSWORD, FORGOT_USERNAME, FORGOT_PASSWORD, UPDATE_TOKEN, DELETE_ACCOUNT } from '../../constants.ts';
var moment = require('moment');

const ProfileService = () => {
   
    const { axiosInstance } = useAxiosInstance();
 
   const changeEmail = (body) => {
        let res = axiosInstance.post(CHANGE_EMAIL, {
            olduserID: body.olduserID,
            newuserID: body.newuserID,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }

   const changePassword = (body) => {
        let res = axiosInstance.post(CHANGE_PASSWORD, {
            userID: body.userID,
            oldpassword: body.oldpassword,
            newpassword: body.newpassword,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }
   const recoverUsername = (body) => {
        let res = axiosInstance.post(FORGOT_USERNAME, {
            firstName: body.firstName,
            lastName: body.lastName,
            license: body.license,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }
   const recoverPassword = (body) => {
        let res = axiosInstance.post(FORGOT_PASSWORD, {
            userID: body.userID,
            api_token: body.api_token,
            locale: body.locale.slice(0, 2)
        });
        return res;
    }
   const updateTokenCall = (body) => {
        let res = axiosInstance.post(UPDATE_TOKEN, {
            loginName: body.loginName,
            deviceTokenString: body.deviceTokenString
        });
        return res;
    }

    const deleteAccount = (body) => {
        let res = axiosInstance.post(DELETE_ACCOUNT, {
            email: body.email
        });
        return res;
    }

   const updateToken = async (email, deviceTokenString) => {
        try {
            let body = {
                loginName: email,
                deviceTokenString: deviceTokenString
            };
            console.log('body', body);
            const response = await updateTokenCall(body);
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

    return { changeEmail, changePassword, recoverUsername, recoverPassword, updateToken, deleteAccount, updateTokenCall}
}
export default ProfileService;