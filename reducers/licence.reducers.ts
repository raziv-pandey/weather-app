import * as fromLicenceGeneration from '../actions/licence.actions';
import { ICustomersData, ILicenceTypesData, ILicenceKeysData, IActivateLicenceData, IGenerateLicenceData } from '../../models/licence.interface';

export interface ILicenceGenerationState{
    loading : boolean,

    licenceCustomers:Array<ICustomersData>,
    licenceTypes : Array<ILicenceTypesData>,
    licenceKeys : Array<ILicenceKeysData>,
    activateLicence: Array<IActivateLicenceData>,
    generatedLicenceNo:IGenerateLicenceData,
    sessionId : string

}

const initialState: ILicenceGenerationState = {  
    loading : false,
    licenceCustomers  : [],
    licenceTypes      : [],
    licenceKeys       : [],
    activateLicence   : [],
    generatedLicenceNo: null,     
    sessionId : null
    }

export function reducer(state = initialState, action: fromLicenceGeneration.licenceGenerationActions): ILicenceGenerationState {
    
    switch (action.type) {
        //---------------------Load Licence Customers------------------
        case fromLicenceGeneration.LOAD_LICENCE_CUSTOMERS:
            return { ...state, loading : true };
        case fromLicenceGeneration.LOAD_LICENCE_CUSTOMERS_SUCCESS : 
            let licenceCustomers = action.payload;
            return { ...state, loading : false, licenceCustomers };
        case fromLicenceGeneration.LOAD_LICENCE_CUSTOMERS_FAIL :
            return { ...state, loading : false };

        //--------------------Load Licence Types-----------------------    
        case fromLicenceGeneration.LOAD_LICENCE_TYPES:
                return { ...state, loading : true };
        case fromLicenceGeneration.LOAD_LICENCE_TYPES_SUCCESS : 
            let licenceTypes = Array.isArray(action.payload) ? action.payload : [];
            return { ...state, loading : false, licenceTypes };
        case fromLicenceGeneration.LOAD_LICENCE_TYPES_FAIL :
            return { ...state, loading : false };

        //------------------------Load Licence Key----------------------------    

        case fromLicenceGeneration.LOAD_LICENCE_KEYS:
                return { ...state, loading : true };
        case fromLicenceGeneration.LOAD_LICENCE_KEYS_SUCCESS : 
            let licenceKeys =  Array.isArray(action.payload) ? action.payload : [];
            return { ...state, loading : false, licenceKeys };
        case fromLicenceGeneration.LOAD_LICENCE_KEYS_FAIL :
            return { ...state, loading : false };

        //---------------------Load Activate Licence---------------------
            
       case fromLicenceGeneration.LOAD_ACTIVATE_LICENCE:
                return { ...state, loading : true };
        case fromLicenceGeneration.LOAD_ACTIVATE_LICENCE_SUCCESS : 
            let activateLicence = action.payload;
            return { ...state, loading : false, activateLicence };
        case fromLicenceGeneration.LOAD_ACTIVATE_LICENCE_FAIL :
            return { ...state, loading : false };

        //----------------------Load Generate Licence-----------------------
        case fromLicenceGeneration.LOAD_GENERATE_LICENCE:
                return { ...state, loading : true };
        case fromLicenceGeneration.LOAD_GENERATE_LICENCE_SUCCESS : 
            let generatedLicenceNo = action.payload;
            return { ...state, loading : false, generatedLicenceNo };
        case fromLicenceGeneration.LOAD_GENERATE_LICENCE_FAIL :
            return { ...state, loading : false };
        case fromLicenceGeneration.RESET_GENERATE_LICENCE:
             return { ...state, loading : false, generatedLicenceNo : null}

        //--------------------Delete Active Licence------------------------
        case fromLicenceGeneration.DELETE_ACTIVE_LICENCE:{
            return { ...state, loading : true };
        }
        case fromLicenceGeneration.DELETE_ACTIVE_LICENCE_SUCCESS: {
            let activateLicence = action.payload;
            return { ...state, loading : false, activateLicence };
        }
        case fromLicenceGeneration.DELETE_ACTIVE_LICENCE_FAIL : 
            return { ...state, loading : false };     

        //------------Get Session Id for Licence--------------------
        
        case fromLicenceGeneration.GET_SESSION_ID_LICENCE:{
            return { ...state, loading : true };
        }
        case fromLicenceGeneration.GET_SESSION_ID_LICENCE_SUCCESS: {
            let sessionId = action.payload;
            return { ...state, loading : false, sessionId };
        }
        case fromLicenceGeneration.GET_SESSION_ID_LICENCE_FAIL : 
            return { ...state, loading : false };        

        //----------Reset lincence
        case fromLicenceGeneration.RESET_LICENCE:
             return { ...state, loading : false, generatedLicenceNo : null, activateLicence : [] };
        default:
                return state;
    }
}

export const getLoading = (state:ILicenceGenerationState) => state.loading;

export const getLicenceCustomers = (state:ILicenceGenerationState) => state.licenceCustomers;
export const getLicenceTypes = (state:ILicenceGenerationState) => state.licenceTypes;
export const getLicenceKeys = (state:ILicenceGenerationState) => state.licenceKeys;
export const getActivateLicence = (state:ILicenceGenerationState) => state.activateLicence;
export const getGenerateLicence = (state:ILicenceGenerationState) => state.generatedLicenceNo;
export const resetGenerateLicence = (state:ILicenceGenerationState) => state.generatedLicenceNo;
export const getSessionIdLicence = (state:ILicenceGenerationState) => state.sessionId;







