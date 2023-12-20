
import axios from './axiosInstance';
import { GET_TERMINALS, GET_SUPPLIERS_BY_TERMINAL, GET_CUSTOMERS_BY_SUPPPLIER, GET_VEHICLES_BY_TERMINAL, GET_ACCOUNTS_BY_SUPPLIER_CUSTOMER, GET_A_DESTINATION_BY_SUPPLIER_CUSTOMER_ACCOUNT, CHECK_LOAD_RACK_ELIGIBILITY, CHECK_ORDER_ELIGIBILITY } from '../../constants.ts';
import i18n from "i18n-js"
var moment = require('moment');

class EligibilityService {
    static instance;

    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.axios = axios;
        this.instance = this;
    }

 
    getTerminalsByLicence = (body) => {
        let res = this.axios.post(GET_TERMINALS, {
            license: body.license
        });
        return res;
    }

    getSuppliersByTerminal = (body) => {
        let res = this.axios.post(GET_SUPPLIERS_BY_TERMINAL, {
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    getVehiclesByTerminal = (body) => {
        let res = this.axios.post(GET_VEHICLES_BY_TERMINAL, {
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    getCustomersBySupplier = (body) => { 
        let res = this.axios.post(GET_CUSTOMERS_BY_SUPPPLIER, {
            supplier_no: body.supplier_no,
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    getAccountsBySupplierCustomer = (body) => {
        let res = this.axios.post(GET_ACCOUNTS_BY_SUPPLIER_CUSTOMER, {
            supplier_no: body.supplier_no,
            cust_no: body.cust_no,
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    getAdestinationBySupplierCustomerAccount = (body) => {
        let res = this.axios.post(GET_A_DESTINATION_BY_SUPPLIER_CUSTOMER_ACCOUNT, {
            supplier_no: body.supplier_no,
            cust_no: body.cust_no,
            acct_no: body.acct_no,
            license: body.license,
            term_id: body.term_id
        });
        return res;
    }

    checkLoadRackEligibility = (body) => {
        let res = this.axios.post(CHECK_LOAD_RACK_ELIGIBILITY, {
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

    checkOrderEligibility = (body) => {
        let res = this.axios.post(CHECK_ORDER_ELIGIBILITY, {
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

    

}

export default new EligibilityService();