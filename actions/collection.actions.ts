import { Action } from '@ngrx/store';
import { ICustomerDetailRequest, ISaveCollectionRequest, ICustomerDetailsAsyncRequest } from '../../models/collection.interface';
import { ISOColCustomersRequest, IEmplolyeeLocation } from '../../models/so.interface';
export const SET_CUSTOMER_DETAIL = '[SDMS - COLLECTION] set Customer Detail';

export const LOAD_CUSTOMER_ADDRESS_DETAIL = '[SDMS - COLLECTION] Load Customer Address Detail';
export const LOAD_CUSTOMER_ADDRESS_DETAIL_SUCCESS = '[SDMS - COLLECTION] Load Customer Address Detail Success ';
export const LOAD_CUSTOMER_ADDRESS_DETAIL_FAIL = '[SDMS - COLLECTION] Load Customer Address Detail Fail';

export const LOAD_INVOICES = '[SDMS - COLLECTION] Load Invoices';
export const LOAD_INVOICES_SUCCESS = '[SDMS - COLLECTION] Load Invoices Success ';
export const LOAD_INVOICES_FAIL = '[SDMS - COLLECTION] Load Invoices Fail';

export const LOAD_PAYMENT_TYPES = '[SDMS - COLLECTION] Load Payment Types';
export const LOAD_PAYMENT_TYPES_SUCCESS = '[SDMS - COLLECTION] Load Payment Types Success';
export const LOAD_PAYMENT_TYPES_FAIL = '[SDMS - COLLECTION] Load Payment Types Fail';

export const SAVE_COLLECTION = '[SDMS - COLLECTION] Save Collection';
export const SAVE_COLLECTION_SUCCESS = '[SDMS - COLLECTION] Save Collection Success';
export const SAVE_COLLECTION_FAIL = '[SDMS - COLLECTION] Save Collection Fail';

export const SET_SELECTED_INVOICES = '[SDMS - COLLECTION] Set Selected Invoices';
export const RESET_COLLECTION = '[SDMS - COLLECTION] RESET_COLLECTION';


export class SetCustomerDetailAction implements Action {
    readonly type = SET_CUSTOMER_DETAIL;
    constructor(public payload: any) {
    }
}

export class LoadCustomerAddressDetailAction implements Action {
    readonly type = LOAD_CUSTOMER_ADDRESS_DETAIL;
    constructor(public payload: ICustomerDetailRequest) {
    }
}
export class LoadCustomerAddressDetailSuccessAction implements Action {
    readonly type = LOAD_CUSTOMER_ADDRESS_DETAIL_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadCustomerAddressDetailFailAction implements Action {
    readonly type = LOAD_CUSTOMER_ADDRESS_DETAIL_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadInvoicesAction implements Action {
    readonly type = LOAD_INVOICES;
    constructor(public payload: ICustomerDetailRequest) {
    }
}
export class LoadInvoicesSuccessAction implements Action {
    readonly type = LOAD_INVOICES_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadInvoicesFailAction implements Action {
    readonly type = LOAD_INVOICES_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadPaymentTypesAction implements Action {
    readonly type = LOAD_PAYMENT_TYPES;
    constructor(public payload?: any) {
    }
}
export class LoadPaymentTypesSuccessAction implements Action {
    readonly type = LOAD_PAYMENT_TYPES_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadPaymentTypesFailAction implements Action {
    readonly type = LOAD_PAYMENT_TYPES_FAIL;
    constructor(public payload: any) {
    }
}

export class SaveCollectionAction implements Action {
    readonly type = SAVE_COLLECTION;
    constructor(public payload: ISaveCollectionRequest) {
    }
}
export class SaveCollectionSuccessAction implements Action {
    readonly type = SAVE_COLLECTION_SUCCESS;
    constructor(public payload: any) {
    }
}
export class SaveCollectionFailAction implements Action {
    readonly type = SAVE_COLLECTION_FAIL;
    constructor(public payload: any) {
    }
}

export class SetSelectedInvoicesAction implements Action {
    readonly type = SET_SELECTED_INVOICES;
    constructor(public payload: any) {
    }
}
export class ResetCollectionAction implements Action {
    readonly type = RESET_COLLECTION;
    constructor(public payload?: any) {
    }
}

export const SAVE_PARTIAL_COLLECTION = '[SDMS - COLLECTION] Save Partial Collection';
export const SAVE_PARTIAL_COLLECTION_SUCCESS = '[SDMS - COLLECTION] Save Partial Collection Success';
export const SAVE_PARTIAL_COLLECTION_FAIL = '[SDMS - COLLECTION] Save Partial Collection Fail';

export class SavePartialCollectionAction implements Action {
    readonly type = SAVE_PARTIAL_COLLECTION;
    constructor(public payload: ISaveCollectionRequest) {
    }
}
export class SavePartialCollectionSuccessAction implements Action {
    readonly type = SAVE_PARTIAL_COLLECTION_SUCCESS;
    constructor(public payload: any) {
    }
}
export class SavePartialCollectionFailAction implements Action {
    readonly type = SAVE_PARTIAL_COLLECTION_FAIL;
    constructor(public payload: any) {
    }
}

export const LOAD_CUSTOMERS_COLLECTION = '[SDMS - COLLECTION] Load Customers collection';
export const LOAD_CUSTOMERS_COLLECTION_SUCCESS = '[SDMS - COLLECTION] Load Customers collection Success';
export const LOAD_CUSTOMERS_COLLECTION_FAIL = '[SDMS - COLLECTION] Load Customers collection Fail';

export const ADD_COLLECTION_LOCATION_OF_EMPLOYEE_AS_PER_ROLE = '[SDMS - COLLECTION] Add collection Location of Logged Employee as per role';


export class LoadCustomersForCollectionAction implements Action {
    readonly type = LOAD_CUSTOMERS_COLLECTION;
    constructor(public payload: ISOColCustomersRequest) {
    }
}
export class LoadCustomersForCollectionSuccessAction implements Action {
    readonly type = LOAD_CUSTOMERS_COLLECTION_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadCustomersForCollectionFailAction implements Action {
    readonly type = LOAD_CUSTOMERS_COLLECTION_FAIL;
    constructor(public payload: any) {
    }
}
export class AddLocationOfEmployeeAsPerRoleCollectionAction implements Action {
    readonly type = ADD_COLLECTION_LOCATION_OF_EMPLOYEE_AS_PER_ROLE;
    constructor(public payload: IEmplolyeeLocation) {
    }
}
//-------------Load Logged Employee Location Collection------------------
export const LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION = '[SDMS - COLLECTION] Load Logged Employee Location Collection';
export const LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION_SUCCESS = '[SDMS - COLLECTION] Load Logged Employee Location Collection Success';
export const LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION_FAIL = '[SDMS - COLLECTION] Load Logged Employee Location Collection Fail';

export class LoadLoggedEmployeeLocationCollectionAction implements Action {
    readonly type = LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION;
    constructor(public payload?: any) {
    }
}
export class LoadLoggedEmployeeLocationCollectionSuccessAction implements Action {
    readonly type = LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadLoggedEmployeeLocationCollectionFailAction implements Action {
    readonly type = LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION_FAIL;
    constructor(public payload: any) {
    }
}

/* Load customer with Pagination*/

export const LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_COLLECTION = '[SDMS - COLLECTION] Load Customers with Infinity Scroll Collection';
export const LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_SUCCESS_COLLECTION = '[SDMS - COLLECTION] Load Customers with Infinity Scroll Success Collection';
export const LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_FAIL_COLLECTION = '[SDMS - COLLECTION]Load Customers with Infinity Scroll Fail Collection';

export class LoadCustomersListWithInfinityCollectionScrollAction implements Action {
    readonly type = LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_COLLECTION;
    constructor(public payload?: ICustomerDetailsAsyncRequest){
    }
}
export class LoadCustomersListWithInfinityCollectionScrollSuccessAction implements Action {
    readonly type = LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_SUCCESS_COLLECTION;
    constructor(public payload: any){
    }
}
export class LoadCustomersListWithInfinityCollectionScrollFailAction implements Action {
    readonly type = LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_FAIL_COLLECTION;
    constructor(public payload: any){
    }
}

export type collectionActions =
    SetCustomerDetailAction |

    LoadCustomerAddressDetailAction |
    LoadCustomerAddressDetailSuccessAction |
    LoadCustomerAddressDetailFailAction |

    LoadInvoicesAction |
    LoadInvoicesSuccessAction |
    LoadInvoicesFailAction |

    LoadPaymentTypesAction |
    LoadPaymentTypesSuccessAction |
    LoadPaymentTypesFailAction |

    SaveCollectionAction |
    SaveCollectionSuccessAction |
    SaveCollectionFailAction |

    SetSelectedInvoicesAction |
    ResetCollectionAction |

    SavePartialCollectionAction |
    SavePartialCollectionSuccessAction |
    SavePartialCollectionFailAction |

    LoadCustomersForCollectionAction |
    LoadCustomersForCollectionSuccessAction |
    LoadCustomersForCollectionFailAction |
    
    LoadLoggedEmployeeLocationCollectionAction |
    LoadLoggedEmployeeLocationCollectionSuccessAction |
    LoadLoggedEmployeeLocationCollectionFailAction |

    LoadCustomersListWithInfinityCollectionScrollAction |
    LoadCustomersListWithInfinityCollectionScrollSuccessAction |
    LoadCustomersListWithInfinityCollectionScrollFailAction;