import { Action } from '@ngrx/store';
import { LoadCustomersAction } from '../../../shared/store/actions/shared-api.actions';
import { ISdmsReportRequest, ICustomerSOStatusReportRequest, ISoStatusReportRequest, ISoStatusReportDetailsRequest, IStockProductsRequest, IStockReportRequest } from '../../models/sdms-report.interface';
import { ICustomer } from '../../../shared/models/customer.interface';

export const LOAD_CUSTOMER_WISE_REPORT = '[SDMS] Load Customer Wise Report';
export const LOAD_CUSTOMER_WISE_REPORT_SUCCESS = '[SDMS] Load Customer Wise Report Success';
export const LOAD_CUSTOMER_WISE_REPORT_FAIL = '[SDMS] Load Customer Wise Report Fail';
export const RESET_CUSTOMER_WISE_REPORT = '[SDMS] Reset Customer Wise Report';

export const LOAD_COLLECTION_REPORT = '[SDMS] Load Collection Report';
export const LOAD_COLLECTION_REPORT_SUCCESS = '[SDMS] Load Collection Report Success';
export const LOAD_COLLECTION_REPORT_FAIL = '[SDMS] Load Collection Report Fail';
export const RESET_COLLECTION_REPORT = '[SDMS] Reset Collection Report';

export const LOAD_COLLECTION_DETAILS = '[SDMS] Load Collection Details';
export const LOAD_COLLECTION_DETAILS_SUCCESS = '[SDMS] Load Collection Details Success';
export const LOAD_COLLECTION_DETAILS_FAIL = '[SDMS] Load Collection Details Fail';
export const RESET_COLLECTION_DETAILS = '[SDMS] Reset Collection Details';

export const LOAD_SO_STATUS_REPORT = '[SDMS] Load So Status Report';
export const LOAD_SO_STATUS_REPORT_SUCCESS = '[SDMS] Load So Status Report Success';
export const LOAD_SO_STATUS_REPORT_FAIL = '[SDMS] Load So Status Report Fail';
export const RESET_SO_STATUS_REPORT = '[SDMS] Reset So Status Report';

export const LOAD_SO_STATUS_REPORT_DETAILS = '[SDMS] Load So Status Report Details';
export const LOAD_SO_STATUS_REPORT_DETAILS_SUCCESS = '[SDMS] Load So Status Report Details Success';
export const LOAD_SO_STATUS_REPORT_DETAILS_FAIL = '[SDMS] Load So Status Report Details Fail';
export const RESET_SO_STATUS_REPORT_DETAILS = '[SDMS] Reset So Status Report Details';

export const LOAD_STOCK_PRODUCTS = '[SDMS] Load Stock Products';
export const LOAD_STOCK_PRODUCTS_SUCCESS = '[SDMS] Load Stock Products Success';
export const LOAD_STOCK_PRODUCTS_FAIL = '[SDMS] Load Stock Products Fail';
export const RESET_STOCK_PRODUCTS = '[SDMS] Reset Products Report';

export const LOAD_STOCK_REPORT = '[SDMS] Load Stock Report';
export const LOAD_STOCK_REPORT_SUCCESS = '[SDMS] Load Stock Report Success';
export const LOAD_STOCK_REPORT_FAIL = '[SDMS] Load Stock Report Fail';
export const RESET_STOCK_REPORT = '[SDMS] Reset Stock Report';


export class LoadCustomerWiseReportAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_REPORT;
    constructor(public payload: ISdmsReportRequest){
    }
}

export class LoadCustomerWiseReportSuccessAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_REPORT_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadCustomerWiseReportFailAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_REPORT_FAIL;
    constructor(public payload: any){
    }
}

export class ResetCustomerWiseReportAction implements Action {
    readonly type = RESET_CUSTOMER_WISE_REPORT;
    constructor(public payload?: any){}
}

export class LoadCollectionReportAction implements Action {
    readonly type = LOAD_COLLECTION_REPORT;
    constructor(public payload: ISdmsReportRequest){
    }
}

export class LoadCollectionReportSuccessAction implements Action {
    readonly type = LOAD_COLLECTION_REPORT_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadCollectionReportFailAction implements Action {
    readonly type = LOAD_COLLECTION_REPORT_FAIL;
    constructor(public payload: any){
    }
}

export class ResetCollectionReportAction implements Action {
    readonly type = RESET_COLLECTION_REPORT;
    constructor(public payload?: any){}
}

export class LoadCollectionDetailsAction implements Action {
    readonly type = LOAD_COLLECTION_DETAILS;
    constructor(public payload: any){
    }
}

export class LoadCollectionDetailsSuccessAction implements Action {
    readonly type = LOAD_COLLECTION_DETAILS_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadCollectionDetailsFailAction implements Action {
    readonly type = LOAD_COLLECTION_DETAILS_FAIL;
    constructor(public payload: any){
    }
}

export class ResetCollectionDetailsAction implements Action {
    readonly type = RESET_COLLECTION_DETAILS;
    constructor(public payload?: any){}
}

//------------Get Customer on Location Select So Status Report------------------
export const LOAD_CUSTOMERS_SO_STATUS_REPORT = '[SDMS] Load Customer So Status Report';
export const LOAD_CUSTOMERS_SO_STATUS_REPORT_SUCCESS = '[SDMS] Load Customer So Status Report Success';
export const LOAD_CUSTOMERS_SO_STATUS_REPORT_FAIL = '[SDMS] Load Customer So Status Report Fail';

export class LoadCustomersSoStatusReportAction implements Action {
    readonly type = LOAD_CUSTOMERS_SO_STATUS_REPORT;
    constructor(public payload: ICustomerSOStatusReportRequest){
    }
}

export class LoadCustomersSoStatusReportSuccessAction implements Action {
    readonly type = LOAD_CUSTOMERS_SO_STATUS_REPORT_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadCustomersSoStatusReportFailAction implements Action {
    readonly type = LOAD_CUSTOMERS_SO_STATUS_REPORT_FAIL;
    constructor(public payload: any){
    }
}

//-------------------So Status Report------------------------

export class LoadSoStatusReportAction implements Action {
    readonly type = LOAD_SO_STATUS_REPORT;
    constructor(public payload: ISoStatusReportRequest){
    }
}

export class LoadSoStatusReportSuccessAction implements Action {
    readonly type = LOAD_SO_STATUS_REPORT_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadSoStatusReportFailAction implements Action {
    readonly type = LOAD_SO_STATUS_REPORT_FAIL;
    constructor(public payload: any){
    }
}

export class ResetSoStatusReportAction implements Action {
    readonly type = RESET_SO_STATUS_REPORT;
    constructor(public payload?: any){}
}
//-----------------So Status Report Details----------------

export class LoadSoStatusReportDetailsAction implements Action {
    readonly type = LOAD_SO_STATUS_REPORT_DETAILS;
    constructor(public payload: ISoStatusReportDetailsRequest){
    }
}

export class LoadSoStatusReportDetailsSuccessAction implements Action {
    readonly type = LOAD_SO_STATUS_REPORT_DETAILS_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadSoStatusReportDetailsFailAction implements Action {
    readonly type = LOAD_SO_STATUS_REPORT_DETAILS_FAIL;
    constructor(public payload: any){
    }
}

export class ResetSoStatusReportDetailsAction implements Action {
    readonly type = RESET_SO_STATUS_REPORT_DETAILS;
    constructor(public payload?: any){}
}

//------------------Load Stock Products---------------------------------

export class LoadStockProductsAction implements Action {
    readonly type = LOAD_STOCK_PRODUCTS;
    constructor(public payload: IStockProductsRequest){
    }
}

export class LoadStockProductsSuccessAction implements Action {
    readonly type = LOAD_STOCK_PRODUCTS_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadStockProductsFailAction implements Action {
    readonly type = LOAD_STOCK_PRODUCTS_FAIL;
    constructor(public payload: any){
    }
}

export class ResetStockProductsAction implements Action {
    readonly type = RESET_STOCK_PRODUCTS;
    constructor(public payload?: any){}
}

//------------------Stock Report---------------------------------

export class LoadStockReportAction implements Action {
    readonly type = LOAD_STOCK_REPORT;
    constructor(public payload: IStockReportRequest){
    }
}

export class LoadStockReportSuccessAction implements Action {
    readonly type = LOAD_STOCK_REPORT_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadStockReportFailAction implements Action {
    readonly type = LOAD_STOCK_REPORT_FAIL;
    constructor(public payload: any){
    }
}

export class ResetStockReportAction implements Action {
    readonly type = RESET_STOCK_REPORT;
    constructor(public payload?: any){}
}

export const LOAD_CUST_WISE_CUSTOMERS = '[SDMS REPORTS] Load Customers Cust Wise Sales Report ';
export const LOAD_CUST_WISE_CUSTOMERS_SUCCESS = '[SDMS REPORTS] Load Customers Cust Wise Sales Report Success';
export const LOAD_CUST_WISE_CUSTOMERS_FAIL = '[SDMS REPORTS]Load Customers Cust Wise Sales Report Fail';

export class LoadCustomersCustWiseSalesAction implements Action {
    readonly type = LOAD_CUST_WISE_CUSTOMERS;
    constructor(public payload?: any) { }
}

export class LoadCustomersCustWiseSalesSuccessAction implements Action {
    readonly type = LOAD_CUST_WISE_CUSTOMERS_SUCCESS;
    constructor(public payload: Array<ICustomer>) { }
}

export class LoadCustomersCustWiseSalesFailAction implements Action {
    readonly type = LOAD_CUST_WISE_CUSTOMERS_FAIL;
    constructor(public payload: any) { }
}

//-------------------Get Group Code for Stock Report--------------------
export const LOAD_STOCK_GROUP_CODES = '[SDMS] Load Stock Group Codes';
export const LOAD_STOCK_GROUP_CODES_SUCCESS = '[SDMS] Load Stock Group Codes Success';
export const LOAD_STOCK_GROUP_CODES_FAIL = '[SDMS] Load Stock Group Codes Fail';
export const RESET_STOCK_GROUP_CODES = '[SDMS] Reset Group Codes Report';


export class LoadStockGroupCodesAction implements Action {
    readonly type = LOAD_STOCK_GROUP_CODES;
    constructor(public payload?: any){
    }
}

export class LoadStockGroupCodesSuccessAction implements Action {
    readonly type = LOAD_STOCK_GROUP_CODES_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadStockGroupCodesFailAction implements Action {
    readonly type = LOAD_STOCK_GROUP_CODES_FAIL;
    constructor(public payload: any){
    }
}

export class ResetStockGroupCodesAction implements Action {
    readonly type = RESET_STOCK_GROUP_CODES;
    constructor(public payload?: any){}
}

//-------------------Get Sub Group Code for Stock Report--------------------
export const LOAD_STOCK_SUB_GROUP_CODES = '[SDMS] Load Stock Sub Group Codes';
export const LOAD_STOCK_SUB_GROUP_CODES_SUCCESS = '[SDMS] Load Stock Sub Group Codes Success';
export const LOAD_STOCK_SUB_GROUP_CODES_FAIL = '[SDMS] Load Stock Sub Group Codes Fail';
export const RESET_STOCK_SUB_GROUP_CODES = '[SDMS] Reset Sub Group Codes Report';


export class LoadStockSubGroupCodesAction implements Action {
    readonly type = LOAD_STOCK_SUB_GROUP_CODES;
    constructor(public payload?: any){
    }
}

export class LoadStockSubGroupCodesSuccessAction implements Action {
    readonly type = LOAD_STOCK_SUB_GROUP_CODES_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadStockSubGroupCodesFailAction implements Action {
    readonly type = LOAD_STOCK_SUB_GROUP_CODES_FAIL;
    constructor(public payload: any){
    }
}

export class ResetStockSubGroupCodesAction implements Action {
    readonly type = RESET_STOCK_SUB_GROUP_CODES;
    constructor(public payload?: any){}
}

//-------------------Get Sub Sub Group Code for Stock Report--------------------
export const LOAD_STOCK_SUB_SUB_GROUP_CODES = '[SDMS] Load Stock Sub Sub Group Codes';
export const LOAD_STOCK_SUB_SUB_GROUP_CODES_SUCCESS = '[SDMS] Load Stock Sub Sub Group Codes Success';
export const LOAD_STOCK_SUB_SUB_GROUP_CODES_FAIL = '[SDMS] Load Stock Sub Sub Group Codes Fail';
export const RESET_STOCK_SUB_SUB_GROUP_CODES = '[SDMS] Reset Sub Sub Group Codes Report';


export class LoadStockSubSubGroupCodesAction implements Action {
    readonly type = LOAD_STOCK_SUB_SUB_GROUP_CODES;
    constructor(public payload?: any){
    }
}

export class LoadStockSubSubGroupCodesSuccessAction implements Action {
    readonly type = LOAD_STOCK_SUB_SUB_GROUP_CODES_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadStockSubSubGroupCodesFailAction implements Action {
    readonly type = LOAD_STOCK_SUB_SUB_GROUP_CODES_FAIL;
    constructor(public payload: any){
    }
}

export class ResetStockSubSubGroupCodesAction implements Action {
    readonly type = RESET_STOCK_SUB_SUB_GROUP_CODES;
    constructor(public payload?: any){}
}

//-------------------Get Brand Display Name for Stock Report--------------------
export const LOAD_STOCK_BRAND_DISPLAY_NAMES = '[SDMS] Load Stock Brand Display Names';
export const LOAD_STOCK_BRAND_DISPLAY_NAMES_SUCCESS = '[SDMS] Load Stock Brand Display Names Success';
export const LOAD_STOCK_BRAND_DISPLAY_NAMES_FAIL = '[SDMS] Load Stock Brand Display Names Fail';
export const RESET_STOCK_BRAND_DISPLAY_NAMES = '[SDMS] Reset Brand Display Names Report';


export class LoadStockBrandDisplayNamesAction implements Action {
    readonly type = LOAD_STOCK_BRAND_DISPLAY_NAMES;
    constructor(public payload ?: any){
    }
}

export class LoadStockBrandDisplayNamesSuccessAction implements Action {
    readonly type = LOAD_STOCK_BRAND_DISPLAY_NAMES_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadStockBrandDisplayNamesFailAction implements Action {
    readonly type = LOAD_STOCK_BRAND_DISPLAY_NAMES_FAIL;
    constructor(public payload: any){
    }
}

export class ResetStockBrandDisplayNamesAction implements Action {
    readonly type = RESET_STOCK_BRAND_DISPLAY_NAMES;
    constructor(public payload?: any){}
}

//--------------Set Stock Report View----------------------

export const SET_STOCK_REPORT_VIEW='[SDMS - SO] Set Stcok Report View (Item wise Or Batch Wise)';
export class SetStockReportViewAction implements Action {
    readonly type = SET_STOCK_REPORT_VIEW;
    constructor(public payload: any){
    }
}

//------------------Load Stock Products---------------------------------
export const LOAD_STOCK_PRODUCTS_FILTER = '[SDMS] Load Stock Fliter Products';
export const LOAD_STOCK_PRODUCTS_FILTER_SUCCESS = '[SDMS] Load Stock Fliter Products Success';
export const LOAD_STOCK_PRODUCTS_FILTER_FAIL = '[SDMS] Load Stock Fliter Products Fail';

export class LoadStockProductsFilterAction implements Action {
    readonly type = LOAD_STOCK_PRODUCTS_FILTER;
    constructor(public payload: IStockProductsRequest){
    }
}

export class LoadStockProductsFilterSuccessAction implements Action {
    readonly type = LOAD_STOCK_PRODUCTS_FILTER_SUCCESS;
    constructor(public payload: any){
    }
}

export class LoadStockProductsFilterFailAction implements Action {
    readonly type = LOAD_STOCK_PRODUCTS_FILTER_FAIL;
    constructor(public payload: any){
    }
}

export const RESET_STOCK_REPORT_DATA = '[SDMS] Reset Stock Report Data';
export class ResetStockReportDataAction implements Action {
    readonly type = RESET_STOCK_REPORT_DATA;
    constructor(public payload?: any){
    }
}

export type sdmsReportActions = 
    LoadCustomerWiseReportAction |
    LoadCustomerWiseReportSuccessAction |
    LoadCustomerWiseReportFailAction |
    ResetCustomerWiseReportAction |

    LoadCollectionReportAction |
    LoadCollectionReportSuccessAction |
    LoadCollectionReportFailAction |
    ResetCollectionReportAction |

    LoadCollectionDetailsAction |
    LoadCollectionDetailsSuccessAction  |
    LoadCollectionDetailsFailAction |
    ResetCollectionDetailsAction |

    LoadCustomersSoStatusReportAction |
    LoadCustomersSoStatusReportSuccessAction |
    LoadCustomersSoStatusReportFailAction |

    LoadSoStatusReportAction |
    LoadSoStatusReportSuccessAction |
    LoadSoStatusReportFailAction |
    ResetSoStatusReportAction |

    LoadSoStatusReportDetailsAction |
    LoadSoStatusReportDetailsSuccessAction |
    LoadSoStatusReportDetailsFailAction |
    ResetSoStatusReportDetailsAction |

    LoadStockProductsAction |
    LoadStockProductsSuccessAction |
    LoadStockProductsFailAction |
    ResetStockProductsAction |

    LoadStockReportAction |
    LoadStockReportSuccessAction |
    LoadStockReportFailAction |
    ResetStockReportAction |
    
    LoadCustomersCustWiseSalesAction |
    LoadCustomersCustWiseSalesSuccessAction |
    LoadCustomersCustWiseSalesFailAction |
    
    LoadStockGroupCodesAction |
    LoadStockGroupCodesSuccessAction |
    LoadStockGroupCodesFailAction |
    ResetStockGroupCodesAction |

    LoadStockSubGroupCodesAction |
    LoadStockSubGroupCodesSuccessAction |
    LoadStockSubGroupCodesFailAction |
    ResetStockSubGroupCodesAction |
    
    LoadStockSubSubGroupCodesAction |
    LoadStockSubSubGroupCodesSuccessAction |
    LoadStockSubSubGroupCodesFailAction |
    ResetStockSubSubGroupCodesAction |

    LoadStockBrandDisplayNamesAction |
    LoadStockBrandDisplayNamesSuccessAction |
    LoadStockBrandDisplayNamesFailAction |
    
    SetStockReportViewAction|
    
    LoadStockProductsFilterAction|
    LoadStockProductsFilterSuccessAction|
    LoadStockProductsFilterFailAction|
    ResetStockReportDataAction;

    