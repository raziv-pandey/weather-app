import { Action } from '@ngrx/store';
import { IStatesRequest, ICitiesRequest, IGstnTypesData, ICustomerSaveRequest } from '../../models/sdms-master.interface';
import { IGLName } from '../../../fas/models/fas-report.interface';
import { models } from '../../facades';

//-----------------Load Countries--------------------------
export const LOAD_COUNTRIES = '[SDMS - Master] Load Countries Create Customer';
export const LOAD_COUNTRIES_SUCCESS = '[SDMS - Master] Load Countries Create Customer Success';
export const LOAD_COUNTRIES_FAIL = '[SDMS - Master] Load Countries Create Customer Fail';

export class LoadCountriesAction implements Action {
    readonly type = LOAD_COUNTRIES;
    constructor(public payload?: any){
    }
}

export class LoadCountriesSuccessAction implements Action {
    readonly type = LOAD_COUNTRIES_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadCountriesFailAction implements Action {
    readonly type = LOAD_COUNTRIES_FAIL;
    constructor(public payload: any){
    }
}

//-----------------------Load GSTN Types -------------------------

export const LOAD_GSTN_TYPES = '[SDMS - Master] Load Gstn Types Create Customer';
export const LOAD_GSTN_TYPES_SUCCESS = '[SDMS - Master] Load Gstn Types Create Customer Success';
export const LOAD_GSTN_TYPES_FAIL = '[SDMS - Master] Load Gstn Types Create Customer Fail';

export class LoadGstnTypesAction implements Action {
    readonly type = LOAD_GSTN_TYPES;
    constructor(public payload?: any){
    }
}

export class LoadGstnTypesSuccessAction implements Action {
    readonly type = LOAD_GSTN_TYPES_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadGstnTypesFailAction implements Action {
    readonly type = LOAD_GSTN_TYPES_FAIL;
    constructor(public payload: any){
    }
}

//---------------------Get States after selecting Countries--------------------------

export const LOAD_STATES = '[SDMS - Master] Load States Create Customer';
export const LOAD_STATES_SUCCESS = '[SDMS - Master] Load States Create Customer Success';
export const LOAD_STATES_FAIL = '[SDMS - Master] Load States Create Customer Fail';

export class LoadStatesAction implements Action {
    readonly type = LOAD_STATES;
    constructor(public payload : IStatesRequest){
    }
}

export class LoadStatesSuccessAction implements Action {
    readonly type = LOAD_STATES_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadStatesFailAction implements Action {
    readonly type = LOAD_STATES_FAIL;
    constructor(public payload: any){
    }
}

//---------------------Get Cities after selecting States--------------------------

export const LOAD_CITIES = '[SDMS - Master] Load Cities Create Customer';
export const LOAD_CITIES_SUCCESS = '[SDMS - Master] Load Cities Create Customer Success';
export const LOAD_CITIES_FAIL = '[SDMS - Master] Load Cities Create Customer Fail';

export class LoadCitiesAction implements Action {
    readonly type = LOAD_CITIES;
    constructor(public payload : ICitiesRequest){
    }
}

export class LoadCitiesSuccessAction implements Action {
    readonly type = LOAD_CITIES_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadCitiesFailAction implements Action {
    readonly type = LOAD_CITIES_FAIL;
    constructor(public payload: any){
    }
}

//---------------------Get GL Codes--------------------------

export const LOAD_GL_CODES = '[SDMS - Master] Load GL Codes';
export const LOAD_GL_CODES_SUCCESS = '[SDMS - Master] Load GL Codes Success';
export const LOAD_GL_CODES_FAIL = '[SDMS - Master] Load GL Codes Fail';

export class LoadGlCodesAction implements Action {
    readonly type = LOAD_GL_CODES;
    constructor(public payload ?: any){
    }
}

export class LoadGlCodesSuccessAction implements Action {
    readonly type = LOAD_GL_CODES_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadGlCodesFailAction implements Action {
    readonly type = LOAD_GL_CODES_FAIL;
    constructor(public payload: any){
    }
}

//-----------------------Save Customer----------------------

//-------------------Start Expense Save---------------
export const SAVE_CUSTOMER_MASTER = '[SDMS - MASTER] Save Customer Master';
export const SAVE_CUSTOMER_MASTER_SUCCESS = '[SDMS - MASTER] Save Customer Master Success';
export const SAVE_CUSTOMER_MASTER_FAIL = '[SDMS - MASTER] Save Customer Master Fail';
export const RESET_CUSTOMER_MASTER = '[SDMS - MASTER] Reset Customer Master';

export class SaveCustomerMasterAction implements Action {
    readonly type = SAVE_CUSTOMER_MASTER;
    constructor(public payload: ICustomerSaveRequest){
    }
}
export class SaveCustomerMasterSuccessAction implements Action {
    readonly type = SAVE_CUSTOMER_MASTER_SUCCESS;
    constructor(public payload: any){
    }
}
export class SaveCustomerMasterFailAction implements Action {
    readonly type = SAVE_CUSTOMER_MASTER_FAIL;
    constructor(public payload: any){
    }
}
export class ResetCustomerMasterAction implements Action {
    readonly type = RESET_CUSTOMER_MASTER;
    constructor(public payload ?: any){
    }
}

export type sdmsMasterActions = 

        LoadCountriesAction |
        LoadCountriesSuccessAction |
        LoadCountriesFailAction |

        LoadGstnTypesAction |
        LoadGstnTypesSuccessAction |
        LoadGstnTypesFailAction |

        LoadStatesAction |
        LoadStatesSuccessAction |
        LoadStatesFailAction |

        LoadCitiesAction |
        LoadCitiesSuccessAction |
        LoadCitiesFailAction |

        LoadGlCodesAction |
        LoadGlCodesSuccessAction |
        LoadGlCodesFailAction |
        
        SaveCustomerMasterAction |
        SaveCustomerMasterSuccessAction |
        SaveCustomerMasterFailAction |
        ResetCustomerMasterAction;

    
