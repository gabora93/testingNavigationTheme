import axios from "axios";
import * as SecureStore from 'expo-secure-store';
var moment = require('moment');
import { GETTOKEN, API_URL } from '../../constants';
import { getFromSecureStore } from "../helper"
import { useAuth } from '../../hooks/useAuth'
const { user, login, logout } = useAuth();


class AxiosInstance {
    static instance;

    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.manager = axios.create({
            baseURL: API_URL
        });

        this.manager.defaults.headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };



        this.instance = this;
        this.manager.defaults.timeout = 5000;
        this.manager.interceptors.request.use(request =>
            AxiosInstance.requestHandler(request)
        );
    }

    static requestHandler = async request => {
        const jwtToken = await getFromSecureStore("jwt");
        const tempToken = await getFromSecureStore("temporal_token");

        const JWT = user?.authToken;
        const TEMPORAL_TOKEN = user?.temporalToken;

        // console.log('JWT>>>>>>>>>>>>>>>>>>>>>>>>>>',JWT)

        // const jwtToken = await getFromSecureStore("jwt");
        // const tempToken = await getFromSecureStore("temporal_token");
        const gToken = "IntcInR5cFwiOlwiSldUXCIsXCJhbGdcIjpcIkhTMjU2XCJ9Ig.eyJDb21wYW55IjoiU29ub3JhIC0gQXBwIERldmVsb3BtZW50IENvbXBhbnkiLCJUb3B0ZWNoUHJvZHVjdCI6IkwyRCIsIkNyZWF0aW9uRGF0ZSI6IjIwMjEtMDktMjggMTE6MDA6NDgifQ.1EezgPf2v79q45ejwfCwb8nzNln1TN9vIectudIMn8k"
        const gToken2 = "0A25C56017136D7DDF4E0E9F60C83F4863F071D5E58DFB3CF25191903AC9BEAE"
        console.log("jwttoken", jwtToken)
        if (jwtToken != null) {
            console.log("sip hay jwt")
            request.headers["Access-Control-Allow-Origin"] = '*';
            request.headers["Content-Type"] = "application/json";
            request.headers["token"] = `${jwtToken}`;
            request.headers["utcdate"] = `${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`;
            console.log("request data", request)
           
            
        } else {
            console.log("no hay jwt")
            if(tempToken){
                console.log("                                                      ")
                console.log(">>>>>>>>>>>> CALL WITH TEMPORAL TOKEN:", tempToken)
                console.log("                                                      ")
                if (gToken) {
                    request.headers["Access-Control-Allow-Origin"] = '*';
                    request.headers["token"] = tempToken
                    request.headers["utcdate"] = `${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`;
                    request.headers["toptechproduct"] = "L2D";
                }
            }else{
                console.log(">>>>>>>>>>>> CALL WITH GOLDEN TOKEN:", gToken2)
                request.headers["Access-Control-Allow-Origin"] = '*';
                request.headers["token"] = gToken2
                request.headers["utcdate"] = `${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`;
                request.headers["toptechproduct"] = "L2D";
            }
            
        }
        // console.log("REQUEST HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS")
        // console.log("                                                                           ")
        // console.log( request.headers)
        // console.log("                                                                           ")
        // console.log("REQUEST HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS")

        // console.log("REQUEST HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS")
        // console.log("                                                                           ")
        // console.log( request)
        // console.log("                                                                           ")
        // console.log("REQUEST HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS HEADERS")

                return request;

    };

    getUserToken = () => {
        return instance.post(GETTOKEN, {
            payload: {
                Company: "DRIVER_APP",
                ToptechProduct: "L2D",
            },
            data: {
                status: "true",
                exp_date: `${moment.utc().add(5, 'years').format('YYYY-MM-DD HH:mm:ss')}`
            }
        });
    }
}

export { AxiosInstance };

export default new AxiosInstance().manager;
