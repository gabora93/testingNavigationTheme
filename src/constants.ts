// APP
const VERSION: string = '2.0.0';

// API URL
const API_URL: string = 'https://api.toptechdata.com/api/api.php';

// Auth endpoints
const SIGNUP: string = `${API_URL}/app_driver_signup`;
const LOGIN: string = `${API_URL}/app_driver_login`;
const GETTOKEN: string = `${API_URL}/createtoken`;
const ISACTIVATED: string = `${API_URL}/app_driver_isuserverified`;
const ACCEPT_T_C: string = `${API_URL}/app_driver_accept_t_c`;

// BOLS endpoints
const GET_BOLS: string = `${API_URL}/app_driver_getbols`;
const GET_BOL: string = `${API_URL}/app_driver_getbolfile`;

// Eligibility endpoints
const GET_TERMINALS: string = `${API_URL}/app_driver_getterminalsbylicense`;
const GET_SUPPLIERS_BY_TERMINAL: string = `${API_URL}/app_driver_getsuppliersbyterminal`;
const GET_VEHICLES_BY_TERMINAL: string = `${API_URL}/app_driver_getvehiclesbyterminal`;
const GET_CUSTOMERS_BY_SUPPPLIER: string = `${API_URL}/app_driver_getcustomersbysupplier`;
const GET_ACCOUNTS_BY_SUPPLIER_CUSTOMER: string = `${API_URL}/app_driver_getaccountsbysuppliercustomer`;
const GET_A_DESTINATION_BY_SUPPLIER_CUSTOMER_ACCOUNT: string = `${API_URL}/app_driver_getdestinationsbysuppliercustomeraccount`;
const CHECK_LOAD_RACK_ELIGIBILITY: string = `${API_URL}/app_driver_checkloadrackeligibility`;
const CHECK_ORDER_ELIGIBILITY: string = `${API_URL}/app_driver_checkordereligibility`;

// Profile endpoints
const CHANGE_EMAIL: string = `${API_URL}/app_driver_changeusername`;
const CHANGE_PASSWORD: string = `${API_URL}/app_driver_changepassword`;
const FORGOT_USERNAME: string = `${API_URL}/app_driver_forgotusername`;
const FORGOT_PASSWORD: string = `${API_URL}/app_driver_forgotpassword`;
const UPDATE_TOKEN: string = `${API_URL}/app_driver_updatenotificationtoken`;
const DELETE_ACCOUNT: string = `${API_URL}/app_driver_deleteuser`;

const SEND_PUSH_NOTIFICATION: string = `${API_URL}/app_driver_sendpushnotification`;


export {
	// APP
	VERSION,

	// API
	API_URL,

	// AUTH ENDPOINTS
	SIGNUP, LOGIN, GETTOKEN, ISACTIVATED, ACCEPT_T_C,

	// BOLS ENDPOINTS
	GET_BOLS, GET_BOL,

	// ELIGIBILITY ENDPOINTS
	GET_TERMINALS, GET_SUPPLIERS_BY_TERMINAL, GET_VEHICLES_BY_TERMINAL, GET_CUSTOMERS_BY_SUPPPLIER,
	GET_ACCOUNTS_BY_SUPPLIER_CUSTOMER, GET_A_DESTINATION_BY_SUPPLIER_CUSTOMER_ACCOUNT, CHECK_LOAD_RACK_ELIGIBILITY,
	CHECK_ORDER_ELIGIBILITY,

	// PROFILE ENDPOINTS
	CHANGE_EMAIL, CHANGE_PASSWORD, FORGOT_USERNAME, FORGOT_PASSWORD, UPDATE_TOKEN, SEND_PUSH_NOTIFICATION, DELETE_ACCOUNT,
}
