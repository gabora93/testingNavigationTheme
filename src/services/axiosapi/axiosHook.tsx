import axios from "axios";
import moment from 'moment';
import { GETTOKEN, API_URL } from '../../constants';
import { getFromSecureStore } from "../helper"
import { useAuth } from '../../hooks/useAuth';

// Custom hook to create and manage Axios instance
export const useAxiosInstance = () => {
  const { user } = useAuth();

  // Initialize Axios instance
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 5000,
  });

  // Request interceptor

  const requestHandler = async request => {
    const jwtToken = await getFromSecureStore("jwt");
    const tempToken = await getFromSecureStore("temporal_token");

    const user = await getFromSecureStore('user');
// CHANGETHIS
    const TOKENSIO = 'IntcInR5cFwiOlwiSldUXCIsXCJhbGdcIjpcIkhTMjU2XCJ9Ig.eyJDb21wYW55IjoiRFJJVkVSX0FQUCIsIlRvcHRlY2hQcm9kdWN0IjoiTDJEIiwiQ3JlYXRpb25EYXRlIjoiMjAyMi0wNy0wMSAxNDozOToyMCJ9.iKDUOW1yPitiofidH71V_XyuB6GUc7uhAembkb8NZ4w'
    // console.log('USER>>>>>>>>>>>>>>>>>>>>>>>>>>',user)
    // const JWT = user.temporalToken;
    const TEMPORAL_TOKEN = user?.temporalToken;

    // console.log('JWT>>>>>>>>>>>>>>>>>>>>>>>>>>',JWT)
    console.log('TEMPORAL TOKEN   >>>>>>>>>>>>>>>>>>>>>>>>>>',tempToken)
    

    // const tempToken = await getFromSecureStore("temporal_token");
    const gToken = "IntcInR5cFwiOlwiSldUXCIsXCJhbGdcIjpcIkhTMjU2XCJ9Ig.eyJDb21wYW55IjoiU29ub3JhIC0gQXBwIERldmVsb3BtZW50IENvbXBhbnkiLCJUb3B0ZWNoUHJvZHVjdCI6IkwyRCIsIkNyZWF0aW9uRGF0ZSI6IjIwMjEtMDktMjggMTE6MDA6NDgifQ.1EezgPf2v79q45ejwfCwb8nzNln1TN9vIectudIMn8k"
    const gToken2 = "0A25C56017136D7DDF4E0E9F60C83F4863F071D5E58DFB3CF25191903AC9BEAE"

    if (jwtToken != null) {
        console.log("sip hay jwt")
        console.log("sip hay TOKENSIO", jwtToken)  // CHANGETHIS for jwtToken
        console.log("                                                      ")
        console.log(">>>>>>>>>>>> CALL WITH JJJWWWTTTT TOKEN:", TOjwtTokenKENSIO)// CHANGETHIS for jwtToken
        console.log("                                                      ")

        request.headers["Access-Control-Allow-Origin"] = '*';
        request.headers["Content-Type"] = 'application/json;charset=UTF-8';
        request.headers["token"] = `${jwtToken}`;// CHANGETHIS for jwtToken
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
                request.headers["Content-Type"] = 'application/json;charset=UTF-8';
                request.headers["token"] = tempToken;
                request.headers["utcdate"] = `${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`;
                request.headers["toptechproduct"] = "L2D";
            }
        }else{
            console.log(">>>>>>>>>>>> CALL WITH GOLDEN TOKEN:", gToken2)
            request.headers["Access-Control-Allow-Origin"] = '*';
            request.headers["Content-Type"] = 'application/json;charset=UTF-8';
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


  // Add request interceptor
  axiosInstance.interceptors.request.use(request => requestHandler(request));

  // Function to get user token
  const getUserToken = () => {
    return axiosInstance.post(GETTOKEN, {
      payload: {
        Company: "DRIVER_APP",
        ToptechProduct: "L2D",
      },
      data: {
        status: "true",
        exp_date: `${moment.utc().add(5, 'years').format('YYYY-MM-DD HH:mm:ss')}`
      }
    });
  };

  return { axiosInstance, getUserToken };
};

// Exporting the hook for use in components
export default useAxiosInstance;
