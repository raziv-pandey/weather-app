import { Action } from '@ngrx/store';
import { LoadLocationsAction } from '../../../shared/store/actions/shared-api.actions';
import { ICustomersRequest, ILicenceTypesRequest, IActivateLicenceData, IDeleteActiveLicenceRequest, ILicenceKeysRequest, IActivateLicenceRequest, IGenerateLicenceRequest } from '../../models/licence.interface';

//-----------------Load Customers--------------------------------------------
export const LOAD_LICENCE_CUSTOMERS = '[SDMS - LICENCE GENERATION] Load Licence Customers';
export const LOAD_LICENCE_CUSTOMERS_SUCCESS = '[SDMS - LICENCE GENERATION] Load Licence Customers Success ';
export const LOAD_LICENCE_CUSTOMERS_FAIL = '[SDMS - LICENCE GENERATION] Load Licence Customers Fail';

export class LoadLicenceCustomersAction implements Action {
    readonly type = LOAD_LICENCE_CUSTOMERS;
    constructor(public payload: ICustomersRequest){
    }
}
export class LoadLicenceCustomersSuccessAction implements Action {
    readonly type = LOAD_LICENCE_CUSTOMERS_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadLicenceCustomersFailAction implements Action {
    readonly type = LOAD_LICENCE_CUSTOMERS_FAIL;
    constructor(public payload: any){
    }
}

//---------------------------Load Licence Type-----------------------------------

export const LOAD_LICENCE_TYPES = '[SDMS - LICENCE GENERATION] Load Licence Types';
export const LOAD_LICENCE_TYPES_SUCCESS = '[SDMS - LICENCE GENERATION] Load Licence Types Success ';
export const LOAD_LICENCE_TYPES_FAIL = '[SDMS - LICENCE GENERATION] Load Licence Types Fail';

export class LoadLicenceTypesAction implements Action {
    readonly type = LOAD_LICENCE_TYPES;
    constructor(public payload: ILicenceTypesRequest){
    }
}
export class LoadLicenceTypesSuccessAction implements Action {
    readonly type = LOAD_LICENCE_TYPES_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadLicenceTypesFailAction implements Action {
    readonly type = LOAD_LICENCE_TYPES_FAIL;
    constructor(public payload: any){
    }
}

//-----------------------------Load Licence Key---------------------------------

export const LOAD_LICENCE_KEYS = '[SDMS - LICENCE GENERATION] Load Licence Keys';
export const LOAD_LICENCE_KEYS_SUCCESS = '[SDMS - LICENCE GENERATION] Load Licence Keys Success ';
export const LOAD_LICENCE_KEYS_FAIL = '[SDMS - LICENCE GENERATION] Load Licence Keys Fail';

export class LoadLicenceKeysAction implements Action {
    readonly type = LOAD_LICENCE_KEYS;
    constructor(public payload: ILicenceKeysRequest){
    }
}
export class LoadLicenceKeysSuccessAction implements Action {
    readonly type = LOAD_LICENCE_KEYS_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadLicenceKeysFailAction implements Action {
    readonly type = LOAD_LICENCE_KEYS_FAIL;
    constructor(public payload: any){
    }
}

//-----------------------------Activate Licence--------------------------------------

export const LOAD_ACTIVATE_LICENCE = '[SDMS - LICENCE GENERATION] Load Activate Licence';
export const LOAD_ACTIVATE_LICENCE_SUCCESS = '[SDMS - LICENCE GENERATION] Load Activate Licence Success ';
export const LOAD_ACTIVATE_LICENCE_FAIL = '[SDMS - LICENCE GENERATION] Load Activate Licence Fail';

export class LoadActivateLicenceAction implements Action {
    readonly type = LOAD_ACTIVATE_LICENCE;
    constructor(public payload: IActivateLicenceRequest){
    }
}
export class LoadActivateLicenceSuccessAction implements Action {
    readonly type = LOAD_ACTIVATE_LICENCE_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadActivateLicenceFailAction implements Action {
    readonly type = LOAD_ACTIVATE_LICENCE_FAIL;
    constructor(public payload: any){
    }
}

//--------------------------- Generate Licence-----------------------------------

export const LOAD_GENERATE_LICENCE = '[SDMS - LICENCE GENERATION] Load Generate Licence';
export const LOAD_GENERATE_LICENCE_SUCCESS = '[SDMS - LICENCE GENERATION] Load Generate Licence Success ';
export const LOAD_GENERATE_LICENCE_FAIL = '[SDMS - LICENCE GENERATION] Load Generate Licence Fail';
export const RESET_GENERATE_LICENCE = '[SDMS - LICENCE GENERATION] Reset Generate Licence';

export class LoadGenerateLicenceAction implements Action {
    readonly type = LOAD_GENERATE_LICENCE;
    constructor(public payload: IGenerateLicenceRequest){
    }
}
export class LoadGenerateLicenceSuccessAction implements Action {
    readonly type = LOAD_GENERATE_LICENCE_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadGenerateLicenceFailAction implements Action {
    readonly type = LOAD_GENERATE_LICENCE_FAIL;
    constructor(public payload: any){
    }
}

export class ResetGenerateLicenceAction implements Action {
    readonly type = RESET_GENERATE_LICENCE;
    constructor(public payload ?: any){
    }
}

//--------------------------Delete Licence---------------------

export const DELETE_ACTIVE_LICENCE = '[SDMS - LICENCE GENERATION] Delete Active Licence';
export const DELETE_ACTIVE_LICENCE_SUCCESS = '[SDMS - LICENCE GENERATION] Delete Active Licence Success';
export const DELETE_ACTIVE_LICENCE_FAIL = '[SDMS - LICENCE GENERATION] Delete Active Licence Fail';

export class DeleteActiveLicenceAction implements Action {
    readonly type = DELETE_ACTIVE_LICENCE;
    constructor(public payload: IDeleteActiveLicenceRequest){
    }
}
export class DeleteActiveLicenceSuccessAction implements Action {
    readonly type = DELETE_ACTIVE_LICENCE_SUCCESS;
    constructor(public payload: IActivateLicenceData[]){
    }
}
export class DeleteActiveLicenceFailAction implements Action {
    readonly type = DELETE_ACTIVE_LICENCE_FAIL;
    constructor(public payload: any){
    }
}

//--------------------------Reset Licence---------------------

export const RESET_LICENCE = '[SDMS - LICENCE GENERATION] Reset Licence';


export class ResetLicenceAction implements Action {
    readonly type = RESET_LICENCE;
    constructor(public payload?: any){
    }
}

//--------------------------Get Session Id for Licence---------------------

export const GET_SESSION_ID_LICENCE = '[SDMS - LICENCE GENERATION] Get Session Id for Licence';
export const GET_SESSION_ID_LICENCE_SUCCESS = '[SDMS - LICENCE GENERATION] Get Session Id for Licence Success';
export const GET_SESSION_ID_LICENCE_FAIL = '[SDMS - LICENCE GENERATION] Get Session Id for Licence Fail';

export class GetSessionIdLicenceAction implements Action {
    readonly type = GET_SESSION_ID_LICENCE;
    constructor(public payload?: any){
    }
}
export class GetSessionIdLicenceSuccessAction implements Action {
    readonly type = GET_SESSION_ID_LICENCE_SUCCESS;
    constructor(public payload: any){
    }
}
export class GetSessionIdLicenceFailAction implements Action {
    readonly type = GET_SESSION_ID_LICENCE_FAIL;
    constructor(public payload: any){
    }
}

export type licenceGenerationActions = 
    LoadLicenceCustomersAction |
    LoadLicenceCustomersSuccessAction  |
    LoadLicenceCustomersFailAction |

    LoadLicenceTypesAction|
    LoadLicenceTypesSuccessAction |
    LoadLicenceTypesFailAction|
    
    LoadLicenceKeysAction |
    LoadLicenceKeysSuccessAction |
    LoadLicenceKeysFailAction |

    LoadActivateLicenceAction |
    LoadActivateLicenceSuccessAction |
    LoadActivateLicenceFailAction |
    
    LoadGenerateLicenceAction |
    LoadGenerateLicenceSuccessAction |
    LoadGenerateLicenceFailAction |
    ResetGenerateLicenceAction |

    DeleteActiveLicenceAction |
    DeleteActiveLicenceSuccessAction |
    DeleteActiveLicenceFailAction |

    ResetLicenceAction |

    GetSessionIdLicenceAction |
    GetSessionIdLicenceSuccessAction |
    GetSessionIdLicenceFailAction;