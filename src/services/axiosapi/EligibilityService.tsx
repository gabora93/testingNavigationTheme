
import axios from './axiosInstance';
import { GET_TERMINALS, GET_SUPPLIERS_BY_TERMINAL, GET_CUSTOMERS_BY_SUPPPLIER, GET_VEHICLES_BY_TERMINAL, GET_ACCOUNTS_BY_SUPPLIER_CUSTOMER, GET_A_DESTINATION_BY_SUPPLIER_CUSTOMER_ACCOUNT, CHECK_LOAD_RACK_ELIGIBILITY, CHECK_ORDER_ELIGIBILITY } from '../../constants';
var moment = require('moment');
import { useAxiosInstance } from './axiosHook';


const EligibilityService = () => {

    const { axiosInstance } = useAxiosInstance();
 
    const getTerminalsByLicence = async (body) => {
        let res = axiosInstance.post(GET_TERMINALS, {
            license: body.license
        });
        return res;
    }

    const getSuppliersByTerminal = (body) => {
        let res = axiosInstance.post(GET_SUPPLIERS_BY_TERMINAL, {
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    const getVehiclesByTerminal = (body) => {
        let res = axiosInstance.post(GET_VEHICLES_BY_TERMINAL, {
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    const getCustomersBySupplier = (body) => { 
        let res = axiosInstance.post(GET_CUSTOMERS_BY_SUPPPLIER, {
            supplier_no: body.supplier_no,
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    const getAccountsBySupplierCustomer = (body) => {
        let res = axiosInstance.post(GET_ACCOUNTS_BY_SUPPLIER_CUSTOMER, {
            supplier_no: body.supplier_no,
            cust_no: body.cust_no,
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    const getAdestinationBySupplierCustomerAccount = (body) => {
        let res = axiosInstance.post(GET_A_DESTINATION_BY_SUPPLIER_CUSTOMER_ACCOUNT, {
            supplier_no: body.supplier_no,
            cust_no: body.cust_no,
            acct_no: body.acct_no,
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    const checkLoadRackEligibility = (body) => {
        let res = axiosInstance.post(CHECK_LOAD_RACK_ELIGIBILITY, {
            license: body.license,
            term_id: body.term_id,
            supplier_no: body.supplier_no,
            cust_no: body.cust_no,
            acct_no: body.acct_no,
            destination_no: body.destination_no,
            truck_id: body.truck_id,
            trailer1_id: body.trailer1_id,
            trailer2_id: body.trailer2_id,
            locale: body.locale.slice(0, 2),
        });
        console.log(body.locale.slice(0, 2));
        return res;
    }

    const checkOrderEligibility = (body) => {
        let res = axiosInstance.post(CHECK_ORDER_ELIGIBILITY, {
            license: body.license,
            term_id: body.term_id,
            supplier_no: body.supplier_no,
            truck_id: body.truck_id,
            trailer1_id: body.trailer1_id,
            trailer2_id: body.trailer2_id,
            order_no: body.order_no,
            locale:body.locale.slice(0, 2),
        });
        console.log(body.locale.slice(0, 2));
        return res;
    }

    return {
        getTerminalsByLicence,
        getSuppliersByTerminal,
        getCustomersBySupplier,
        getAccountsBySupplierCustomer,
        getAdestinationBySupplierCustomerAccount,
        checkLoadRackEligibility,
        checkOrderEligibility,
        getVehiclesByTerminal
    }

    

}
export default EligibilityService;