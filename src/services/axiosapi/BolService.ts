import axios from './axiosInstance';
import { GET_BOLS, GET_BOL } from '../../constants';
import { ServerData, Result, BOL } from '../../types/types'
import * as SecureStore from 'expo-secure-store';
import { getFromSecureStore } from '../helper';
import { IBlobData } from '../../../types/types';

class BolService {
    static instance;

    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.axios = axios;
        this.instance = this;
    }

    getBOLS = async (body) => {
        let res : ServerData = this.axios.post(GET_BOLS, {
            license: body.license,
            maxNumberOfBOLs: body.maxNumberOfBOLs
        })
        return res;
    }

    getBOLOLD = async (body) => {
        return this.axios.post(GET_BOL, {
            license: body.license,
            trans_ref_no: body.trans_ref_no
        }).then(function (response) {
            if (response !== null) {
                return response as ServerData;
            }
        })
            .catch(function (error: Error) {
                let message = 'Unknown Error'
                if (error instanceof Error) message = error.message
                console.log('error message: ', message)
            })
    }

    getBOL = async (body) => {
        console.log('trying to get bol')
        try {
            const response = await this.axios.post(GET_BOL, {
                license: body.license,
                trans_ref_no: body.trans_ref_no
            });
    
            if (response.status >= 200 && response.status < 300) {
                return response.data as IBlobData;
            } else {
                // Handle non-successful HTTP response (status code not in the 2xx range)
                console.error('Non-successful HTTP response:', response.status);
                // You might want to throw an error or handle it in a way that makes sense for your application.
                // For now, let's return null.
                return null;
            }
        } catch (error) {
            // Handle errors during the request (e.g., network issues, server errors)
            console.error('Error during HTTP request:', error.message);
            // You might want to throw an error or handle it in a way that makes sense for your application.
            // For now, let's return null.
            return null;
        }
    };

    getMultipleBOLS = async (BOLS: BOL[]) => {
        let bols: BOL[] = BOLS;
        try {
            const license = await SecureStore.getItemAsync("license");
            for (const item of BOLS) {
                let body = {
                    license: license,
                    trans_ref_no: item.TransRefNo
                };
                const response = await this.getBOL(body);
                if (response.data.result[0].BLOB != null) {
                    item.BLOB = response.data.result[0].BLOB
                } else {
                    console.log("NO RESPONSWE", response)
                }
            }
            return bols;
        }
        catch (error) {
            console.log("error", error)
        }
    }
}

export default new BolService();