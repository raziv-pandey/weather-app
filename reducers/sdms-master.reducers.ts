import * as fromSdmsMaster from '../actions/sdms-master.actions';
import { ICountriesData, IStatesData, ICitiesData, IGstnTypesData, ICustomerSaveData } from '../../models/sdms-master.interface';
import { IGLName } from '../../../fas/models/fas-report.interface';

export interface ISdmsMasterState{
        loading         : boolean,

        countries               : Array<ICountriesData>,
        states                  : Array<IStatesData>, 
        cities                  : Array<ICitiesData>, 
        gstnTypes               : Array<IGstnTypesData>,
        glCodes                 : Array<IGLName>,
        saveCustomerParam       : any,
        saveCustomerParamLoaded : boolean
    }

const initialState: ISdmsMasterState = {  
      loading                                       : false,
      countries                                     : [],
      states                                        : [],
      cities                                        : [],
      gstnTypes                                     : [],
      glCodes                                       : [],
      saveCustomerParam                              : null,
      saveCustomerParamLoaded                        : false

}
export function reducer(state = initialState, action: fromSdmsMaster.sdmsMasterActions): ISdmsMasterState {
    
  switch (action.type) {
    //------------------Load Countries---------------------------
    case fromSdmsMaster.LOAD_COUNTRIES:
        return { ...state, loading : true };
    case fromSdmsMaster.LOAD_COUNTRIES_SUCCESS :
        let countries = action.payload;
        return { ...state, loading : false, countries };
    case fromSdmsMaster.LOAD_COUNTRIES_FAIL:
        return { ...state, loading : false };
    
    //------------------Load GSTN Types---------------------
    case fromSdmsMaster.LOAD_GSTN_TYPES:
        return { ...state, loading : true };
    case fromSdmsMaster.LOAD_GSTN_TYPES_SUCCESS :
        let gstnTypes = action.payload;
        return { ...state, loading : false, gstnTypes};
    case fromSdmsMaster.LOAD_GSTN_TYPES_FAIL:
        return { ...state, loading : false };

    //------------------Load States---------------------------
    case fromSdmsMaster.LOAD_STATES:
        return { ...state, loading : true };
    case fromSdmsMaster.LOAD_STATES_SUCCESS :
        let states = action.payload;
        return { ...state, loading : false, states };
    case fromSdmsMaster.LOAD_STATES_FAIL:
        return { ...state, loading : false }; 

    //------------------Load Cities---------------------------
    case fromSdmsMaster.LOAD_CITIES:
        return { ...state, loading : true };
    case fromSdmsMaster.LOAD_CITIES_SUCCESS :
        let cities = action.payload;
        return { ...state, loading : false, cities };
    case fromSdmsMaster.LOAD_CITIES_FAIL:
        return { ...state, loading : false };    

    //------------------Load GL Codes---------------------------
    case fromSdmsMaster.LOAD_GL_CODES:
        return { ...state, loading : true };
    case fromSdmsMaster.LOAD_GL_CODES_SUCCESS :
        let glCodes = action.payload;
        return { ...state, loading : false, glCodes };
    case fromSdmsMaster.LOAD_GL_CODES_FAIL:
        return { ...state, loading : false };     
        
    //Get Save Param as a True
    case fromSdmsMaster.SAVE_CUSTOMER_MASTER:
     return { ...state, loading : true };
    case fromSdmsMaster.SAVE_CUSTOMER_MASTER_SUCCESS :
     let saveCustomerParam = action.payload;
     return { ...state, loading : false, saveCustomerParam, saveCustomerParamLoaded :true };
    case fromSdmsMaster.SAVE_CUSTOMER_MASTER_FAIL:
     return { ...state, loading : false };
    case fromSdmsMaster.RESET_CUSTOMER_MASTER:
     return { ...state, loading : false, saveCustomerParam : null, saveCustomerParamLoaded : false} 

    default:
        return state;
}
}

export const getLoading = (state:ISdmsMasterState) => state.loading;

export const getCountries = (state:ISdmsMasterState) => state.countries;
export const getGstnTypes = (state:ISdmsMasterState) => state.gstnTypes;
export const getStates = (state:ISdmsMasterState) => state.states;
export const getCities = (state:ISdmsMasterState) => state.cities;
export const getGLNames = (state:ISdmsMasterState) => state.glCodes;

export const getCustomerParam = (state:ISdmsMasterState) => state.saveCustomerParam;
export const getCustomerParamLoaded = (state:ISdmsMasterState) => state.saveCustomerParamLoaded;