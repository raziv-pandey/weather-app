import * as fromCollection from '../actions/collection.actions';
import { IPaymentType } from '../../models/collection.interface';
import { SAVE_COLLECTION } from '../actions/collection.actions';
import { IEmplolyeeLocation, ISOCustomer } from '../../models/so.interface';

export interface ICollectionState {
    loading: boolean,
    customer: any,
    customerAdreess: any,
    invoices: Array<any>,
    paymentTypes: Array<IPaymentType>,
    selectedInvoces: Array<any>,
    collectionSaved: any,
    partialCollectionSaved: any,
    customerList: Array<ISOCustomer>,
    globalCustomerList: Array<ISOCustomer>,
    locationDetailOfLoggedEmp: IEmplolyeeLocation,
}

const initialState: ICollectionState = {
    loading: false,
    customer: null,
    customerAdreess: null,
    invoices: [],
    paymentTypes: [],
    selectedInvoces: [],
    collectionSaved: null,
    partialCollectionSaved: null,
    customerList: [],
    globalCustomerList: [],
    locationDetailOfLoggedEmp: null,

}
export function reducer(state = initialState, action: fromCollection.collectionActions): ICollectionState {

    switch (action.type) {
        case fromCollection.SET_CUSTOMER_DETAIL:
            return { ...state, customer: action.payload };

        case fromCollection.LOAD_CUSTOMER_ADDRESS_DETAIL:
            return { ...state, loading: true };
        case fromCollection.LOAD_CUSTOMER_ADDRESS_DETAIL_SUCCESS:
            return { ...state, loading: false, customerAdreess: action.payload };
        case fromCollection.LOAD_CUSTOMER_ADDRESS_DETAIL_FAIL:
            return { ...state, loading: false };

        case fromCollection.LOAD_INVOICES:
            return { ...state, loading: true };
        case fromCollection.LOAD_INVOICES_SUCCESS:
            return { ...state, loading: false, invoices: action.payload };
        case fromCollection.LOAD_INVOICES_FAIL:
            return { ...state, loading: false };

        case fromCollection.LOAD_PAYMENT_TYPES:
            return { ...state, loading: true };
        case fromCollection.LOAD_PAYMENT_TYPES_SUCCESS:
            return { ...state, loading: false, paymentTypes: action.payload };
        case fromCollection.LOAD_PAYMENT_TYPES_FAIL:
            return { ...state, loading: false };

        case fromCollection.SAVE_COLLECTION:
            return { ...state, loading: true };
        case fromCollection.SAVE_COLLECTION_SUCCESS:
            return { ...state, loading: false, collectionSaved: action.payload };
        case fromCollection.SAVE_COLLECTION_FAIL:
            return { ...state, loading: false };

        case fromCollection.SET_SELECTED_INVOICES:
            return { ...state, selectedInvoces: action.payload };

        case fromCollection.RESET_COLLECTION:
            return { ...state, invoices: [], selectedInvoces: [], collectionSaved: null, partialCollectionSaved: null };

        case fromCollection.SAVE_PARTIAL_COLLECTION:
            return { ...state, loading: true };
        case fromCollection.SAVE_PARTIAL_COLLECTION_SUCCESS:
            return { ...state, loading: false, partialCollectionSaved: action.payload };
        case fromCollection.SAVE_PARTIAL_COLLECTION_FAIL:
            return { ...state, loading: false };

        case fromCollection.LOAD_CUSTOMERS_COLLECTION:
            return { ...state, loading: true, customerList: [] };
        case fromCollection.LOAD_CUSTOMERS_COLLECTION_SUCCESS:
        let customerList = action.payload.gridRecords;
        return { ...state, loading : false, customerList: customerList };

            /* let customers = action.payload;
            let ListCustomerWithRange = [];

            if (action.payload != null) {
                let noOfRecords = action.payload.length > 20 ? 20 : action.payload.length;
                for (var i = 0; i < noOfRecords; i++) {
                    ListCustomerWithRange.push(customers[i]);
                }
            }
            return { ...state, loading: false, customerList: ListCustomerWithRange, globalCustomerList: customers }; */
        case fromCollection.LOAD_CUSTOMERS_COLLECTION_FAIL:
            return { ...state, loading: false };

            //----------Load Logged Empoyee Location------

        case fromCollection.LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION:
            return { ...state, loading: true };
        case fromCollection.LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION_SUCCESS:
            return { ...state, loading: false, locationDetailOfLoggedEmp: action.payload };
        case fromCollection.LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION_FAIL:
            return { ...state, loading: false };
        
         /*Customer List With Pagination*/
         case fromCollection.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_COLLECTION:
            return { ...state, loading : true, customerList: []};
        case fromCollection.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_SUCCESS_COLLECTION :
            let customerListwithPagination = action.payload.gridRecords;
            return { ...state, loading : false, customerList : customerListwithPagination};

        case fromCollection.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_FAIL_COLLECTION :
            return { ...state, loading : false };    

        default:
            return state;
    }
}

export const getLoading = (state: ICollectionState) => state.loading;

export const getCustomerDetails = (state: ICollectionState) => state.customer;
export const getCustomerAddress = (state: ICollectionState) => state.customerAdreess;
export const getInvoices = (state: ICollectionState) => state.invoices;
export const getPaymentTypes = (state: ICollectionState) => state.paymentTypes;
export const getSelectedInvoices = (state: ICollectionState) => state.selectedInvoces;
export const getCollectionSaved = (state: ICollectionState) => state.collectionSaved;

export const getPartialCollectionSaved = (state: ICollectionState) => state.partialCollectionSaved;


export const getCustomerCollectionList = (state: ICollectionState) => state.customerList;
export const getAllCustomerCollectionList = (state: ICollectionState) => state.globalCustomerList;
export const getCollectionLocationDetailOfLoggedEmp = (state: ICollectionState) => state.locationDetailOfLoggedEmp;

