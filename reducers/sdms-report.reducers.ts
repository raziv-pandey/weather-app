import * as fromSdmsReport from '../actions/sdms-report.actions';
import { LOAD_COLLECTION_DETAILS } from '../actions/sdms-report.actions';
import { IProduct } from '../../models/so.interface';
import { ILocation } from '../../../shared/models/location.interface';
import { ICustomer } from '../../../shared/models/customer.interface';
import { IGroupCode, ISubGroupCode, ISubSubGroupCode, IBrandNameData } from '../../../mis/models/group-code.interface';

export interface ISdmsReportState {
    loading: boolean,

    customerWiseReport: any,
    customerWiseReportLoaded: boolean,

    collectionReport: any,
    collectionReportLoaded: boolean,

    collectionDetails: any,
    collectionDetailsLoaded: boolean,

    SoStatusReport: any,
    SoStatusReportLoaded: boolean,

    SoStatusReportDetails: any,
    SoStatusReportDetailsLoaded: boolean,

    customersSoStatusReport: Array<ILocation>,
    customersSoStatusReportLoaded: boolean,

    stockProducts: Array<IProduct>,
    stockReport: any,
    stockReportLoaded: boolean,
    customers: Array<ICustomer>,
    globalProductList: Array<IProduct>,
    productList: Array<IProduct>,

    stockGroupCodes             : Array<IGroupCode>,
    stockSubGroupCodes          : Array<ISubGroupCode>,
    stockSubSubGroupCodes       : Array<ISubSubGroupCode>,
    stockBrandDisplayNames      : Array<IBrandNameData>,
    stockReportViewMode         : string,
}

const initialState: ISdmsReportState = {
    loading: false,

    customerWiseReport: null,
    customerWiseReportLoaded: false,

    collectionReport: null,
    collectionReportLoaded: false,

    collectionDetails: [],
    collectionDetailsLoaded: false,

    SoStatusReport: null,
    SoStatusReportLoaded: false,

    SoStatusReportDetails: [],
    SoStatusReportDetailsLoaded: false,

    customersSoStatusReport: [],
    customersSoStatusReportLoaded: false,

    stockProducts: [],
    stockReport: null,
    stockReportLoaded: false,
    customers: [],
    globalProductList: [],
    productList: [],

    stockGroupCodes         : [],
    stockSubGroupCodes      : [],
    stockSubSubGroupCodes   : [],
    stockBrandDisplayNames  : [],
    stockReportViewMode     : "I",
}
export function reducer(state = initialState, action: fromSdmsReport.sdmsReportActions): ISdmsReportState {

    switch (action.type) {
        case fromSdmsReport.LOAD_CUSTOMER_WISE_REPORT:
            return { ...state, loading: true, customerWiseReportLoaded: false };
        case fromSdmsReport.LOAD_CUSTOMER_WISE_REPORT_SUCCESS:
            let customerWiseReport = action.payload;
            return { ...state, loading: false, customerWiseReportLoaded: true, customerWiseReport };
        case fromSdmsReport.LOAD_CUSTOMER_WISE_REPORT_FAIL:
            return { ...state, loading: false, customerWiseReportLoaded: false };
        case fromSdmsReport.RESET_CUSTOMER_WISE_REPORT:
            return { ...state, loading: false, customerWiseReportLoaded: false, customerWiseReport: null };

        case fromSdmsReport.LOAD_COLLECTION_REPORT:
            return { ...state, loading: true, collectionReportLoaded: false };
        case fromSdmsReport.LOAD_COLLECTION_REPORT_SUCCESS:
            let collectionReport = action.payload;
            return { ...state, loading: false, collectionReportLoaded: true, collectionReport };
        case fromSdmsReport.LOAD_COLLECTION_REPORT_FAIL:
            return { ...state, loading: false, collectionReportLoaded: false };
        case fromSdmsReport.RESET_COLLECTION_REPORT:
            return { ...state, loading: false, collectionReportLoaded: false, collectionReport: null };

        case fromSdmsReport.LOAD_COLLECTION_DETAILS:
            return { ...state, loading: true, collectionDetailsLoaded: false };
        case fromSdmsReport.LOAD_COLLECTION_DETAILS_SUCCESS:
            let collectionDetails = action.payload;
            return { ...state, loading: false, collectionDetailsLoaded: true, collectionDetails };
        case fromSdmsReport.LOAD_COLLECTION_DETAILS_FAIL:
            return { ...state, loading: false, collectionDetailsLoaded: false };
        case fromSdmsReport.RESET_COLLECTION_DETAILS:
            return { ...state, loading: false, collectionDetailsLoaded: false, collectionDetails: null };

        // -----------------------------Load Customer So Status Report---------------------------
        case fromSdmsReport.LOAD_CUSTOMERS_SO_STATUS_REPORT:
            return { ...state, loading: true, SoStatusReportLoaded: false };
        case fromSdmsReport.LOAD_CUSTOMERS_SO_STATUS_REPORT_SUCCESS:
            let customersSoStatusReport = action.payload;
            return { ...state, loading: false, customersSoStatusReportLoaded: true, customersSoStatusReport };
        case fromSdmsReport.LOAD_CUSTOMERS_SO_STATUS_REPORT_FAIL:
            return { ...state, loading: false, customersSoStatusReportLoaded: false };

        // -----------------------------So Status Report---------------------------
        case fromSdmsReport.LOAD_SO_STATUS_REPORT:
            return { ...state, loading: true, SoStatusReportLoaded: false };
        case fromSdmsReport.LOAD_SO_STATUS_REPORT_SUCCESS:
            let SoStatusReport = action.payload;
            return { ...state, loading: false, SoStatusReportLoaded: true, SoStatusReport };
        case fromSdmsReport.LOAD_SO_STATUS_REPORT_FAIL:
            return { ...state, loading: false, SoStatusReportLoaded: false };
        case fromSdmsReport.RESET_SO_STATUS_REPORT:
            return { ...state, loading: false, SoStatusReportLoaded: false, SoStatusReport: null };

        //---------------------So Status Report Details----------------------------    
        case fromSdmsReport.LOAD_SO_STATUS_REPORT_DETAILS:
            return { ...state, loading: true, SoStatusReportDetailsLoaded: false };
        case fromSdmsReport.LOAD_SO_STATUS_REPORT_DETAILS_SUCCESS:
            let SoStatusReportDetails = action.payload;
            return { ...state, loading: false, SoStatusReportDetailsLoaded: true, SoStatusReportDetails };
        case fromSdmsReport.LOAD_SO_STATUS_REPORT_DETAILS_FAIL:
            return { ...state, loading: false, SoStatusReportDetailsLoaded: false };
        case fromSdmsReport.RESET_SO_STATUS_REPORT_DETAILS:
            return { ...state, loading: false, SoStatusReportDetailsLoaded: false, SoStatusReportDetails: null };

        //----------------------Stock Products-------------------------------------    
        case fromSdmsReport.LOAD_STOCK_PRODUCTS:
            return { ...state, loading: true };
        case fromSdmsReport.LOAD_STOCK_PRODUCTS_SUCCESS:
            let stockProducts = action.payload;
            let stockproductsWithRange = [];
            if (action.payload != null) {
                let noOfRecords = action.payload.length > 20 ? 20 : action.payload.length;
                for (var i = 0; i < noOfRecords; i++)

                    stockproductsWithRange.push(stockProducts[i]);
            }
            let totalPages = action.payload != null ? Math.ceil(action.payload.length / 20) : 0;
            // let productDetails = { productList: stockproductsWithRange, totalPageCount: totalPages, globalProductList: stockProducts, productListLoaded: true };
            return { ...state, loading: false, productList: stockproductsWithRange, globalProductList: stockProducts, };
        case fromSdmsReport.LOAD_STOCK_PRODUCTS_FAIL:
            return { ...state, loading: false };
        case fromSdmsReport.RESET_STOCK_PRODUCTS:
            return { ...state, loading: false, stockProducts: null };

        //----------------------Stock Report-------------------------------------    
        case fromSdmsReport.LOAD_STOCK_REPORT:
            return { ...state, loading: true, stockReportLoaded: false };
        case fromSdmsReport.LOAD_STOCK_REPORT_SUCCESS:
            //let stockReport = action.payload;
            let gridData=action.payload!=null ? action.payload : [];
            var codes = [],
            arr   = [];
            if(gridData.length>0){
                if(state.stockReportViewMode==="I"){
                    for(var i = 0; i < gridData.length; i++) {
                        if(arr.indexOf(gridData[i].itemCode) == -1) {
                            codes.push({
                                itemDisplayName: gridData[i].itemDisplayName,
                                itemCode: gridData[i].itemCode,
                                locations: [gridData[i].locationDisplayName],
                                stock: {
                                    [gridData[i].locationDisplayName]: {
                                        groundStock: Number(gridData[i].groundStock),
                                        reserveStock: Number(gridData[i].reserveStock),
                                        freeStock: Number(gridData[i].freeStock)
                                    }
                                }
                            });
                            arr.push(gridData[i].itemCode);
                        } else {
                            for(var j = 0; j < codes.length; j++) {
                                if(codes[j].itemCode === gridData[i].itemCode) {
                                    var locations = codes[j].locations;
                                    if(codes[j].locations.indexOf(gridData[i].locationDisplayName) == -1) {
                                        codes[j].locations.push(gridData[i].locationDisplayName);
                                        codes[j].stock[gridData[i].locationDisplayName] = {
                                            groundStock: Number(gridData[i].groundStock),
                                            reserveStock: Number(gridData[i].reserveStock),
                                            freeStock: Number(gridData[i].freeStock)
                                        }
                                    } else {
                                        codes[j].stock[gridData[i].locationDisplayName].groundStock += Number(gridData[i].groundStock);
                                        codes[j].stock[gridData[i].locationDisplayName].reserveStock += Number(gridData[i].reserveStock);
                                        codes[j].stock[gridData[i].locationDisplayName].freeStock += Number(gridData[i].freeStock);
                                    }
                                }
                            }
                        }
                    }
                }else if(state.stockReportViewMode==="B"){
                    codes=gridData
                }
               
            }
            return { ...state, loading: false, stockReportLoaded: true, stockReport : codes};
        case fromSdmsReport.LOAD_STOCK_REPORT_FAIL:
            return { ...state, loading: false, stockReportLoaded: false };
        case fromSdmsReport.RESET_STOCK_REPORT:
            return { ...state, loading: false, stockReportLoaded: false, stockReport: null };

        //----------------------Customers for Customer Wise Sales Report------------------------------------- 
        case fromSdmsReport.LOAD_CUST_WISE_CUSTOMERS:
            return { ...state, loading: true };
        case fromSdmsReport.LOAD_CUST_WISE_CUSTOMERS_SUCCESS:
            let customers: Array<ICustomer> = action.payload;
            return { ...state, loading: false, customers };
        case fromSdmsReport.LOAD_CUST_WISE_CUSTOMERS_FAIL:
            return { ...state, loading: false };
        
            
        //----------------------Stock Group Codes-------------------------------------    

        case fromSdmsReport.LOAD_STOCK_GROUP_CODES:
            return { ...state, loading : true };

        case fromSdmsReport.LOAD_STOCK_GROUP_CODES_SUCCESS:
            let stockGroupCodes: Array<IGroupCode> = action.payload.rows;
            return { ...state, loading : false, stockGroupCodes };

        case fromSdmsReport.LOAD_STOCK_GROUP_CODES_FAIL:    
            return { ...state, loading : false };
        
        //----------------------Stock Sub Group Codes------------------------------------- 
        case fromSdmsReport.LOAD_STOCK_SUB_GROUP_CODES:
            return { ...state, loading : true };

        case fromSdmsReport.LOAD_STOCK_SUB_GROUP_CODES_SUCCESS:
            let stockSubGroupCodes: Array<ISubGroupCode> = action.payload.rows;
            return { ...state, loading : false, stockSubGroupCodes }; 
            
        case fromSdmsReport.LOAD_STOCK_SUB_GROUP_CODES_FAIL:   
            return { ...state, loading : false };

        //----------------------Stock Sub Sub Group Codes------------------------------------- 
        case fromSdmsReport.LOAD_STOCK_SUB_SUB_GROUP_CODES:
            return { ...state, loading : true };
     
        case fromSdmsReport.LOAD_STOCK_SUB_SUB_GROUP_CODES_SUCCESS:
            let stockSubSubGroupCodes: Array<ISubSubGroupCode> = action.payload.rows;
            return { ...state, loading : false, stockSubSubGroupCodes }; 
        
        case fromSdmsReport.LOAD_STOCK_SUB_SUB_GROUP_CODES_FAIL:   
            return { ...state, loading : false };

        case fromSdmsReport.RESET_STOCK_SUB_GROUP_CODES:{
                let stockSubGroupCodes: Array<ISubGroupCode> = [];
                return { ...state, stockSubGroupCodes };
                }   
        case fromSdmsReport.RESET_STOCK_SUB_SUB_GROUP_CODES:{
            let stockSubSubGroupCodes: Array<ISubSubGroupCode> = [];
            return { ...state, stockSubSubGroupCodes };
            }    
        
        //----------------------Stock Display Names-------------------------------------
        case fromSdmsReport.LOAD_STOCK_BRAND_DISPLAY_NAMES:
            return { ...state, loading : true };
            
        case fromSdmsReport.LOAD_STOCK_BRAND_DISPLAY_NAMES_SUCCESS:
            let stockBrandDisplayNames: Array<IBrandNameData> = action.payload.rows;
            return { ...state, loading : false, stockBrandDisplayNames };     

        case fromSdmsReport.LOAD_STOCK_BRAND_DISPLAY_NAMES_FAIL:
            return { ...state, loading : false };
            
        case fromSdmsReport.SET_STOCK_REPORT_VIEW: {
                let stockReportViewMode=action.payload
                return { ...state, stockReportViewMode };
            }    

        //----------------------Stock Products-------------------------------------    
        case fromSdmsReport.LOAD_STOCK_PRODUCTS_FILTER:
            return { ...state, loading: true };
        case fromSdmsReport.LOAD_STOCK_PRODUCTS_FILTER_SUCCESS:
            let stockFilterdProducts = action.payload;
            let stockFilteredProductsWithRange = [];
            if (action.payload != null) {
                let noOfRecords=0;
                if( action.payload.length<20){
                    noOfRecords=action.payload.length;
                }else{
                    noOfRecords= action.payload.length > 20 ? 20 : action.payload.length;
                }
                 
                for (var i = 0; i < noOfRecords; i++)
                    stockFilteredProductsWithRange.push(stockFilterdProducts[i]);
            }
            return { ...state, loading: false, productList: stockFilterdProducts, globalProductList: stockFilterdProducts };
        case fromSdmsReport.LOAD_STOCK_PRODUCTS_FILTER_FAIL:
            return { ...state, loading: false };

        case fromSdmsReport.RESET_STOCK_REPORT_DATA:{
                let stockReport=null;
                let productList=[];
                let stockGroupCodes: Array<IGroupCode>=[];
                let stockSubGroupCodes: Array<ISubGroupCode> = [];
                let stockSubSubGroupCodes: Array<ISubSubGroupCode> = [];
                let stockReportViewMode="I";
                return { ...state, stockReport,productList,stockGroupCodes,stockSubGroupCodes,stockSubSubGroupCodes,stockReportViewMode};
                } 
        default:
            return state;
    }
}

export const getLoading = (state: ISdmsReportState) => state.loading;

export const getCustomerWiseReport = (state: ISdmsReportState) => state.customerWiseReport;
export const getCustomerWiseReportLoaded = (state: ISdmsReportState) => state.customerWiseReportLoaded;

export const getCollectionReport = (state: ISdmsReportState) => state.collectionReport;
export const getCollectionReportLoaded = (state: ISdmsReportState) => state.collectionReportLoaded;

export const getCollectionDetails = (state: ISdmsReportState) => state.collectionDetails;
export const getCollectionDetailsLoaded = (state: ISdmsReportState) => state.collectionDetailsLoaded;

export const getCustomersSoStatusReport = (state: ISdmsReportState) => state.customersSoStatusReport;
export const getCustomersSoStatusReportLoaded = (state: ISdmsReportState) => state.customersSoStatusReportLoaded;

export const getSoStatusReport = (state: ISdmsReportState) => state.SoStatusReport;
export const getSoStatusReportLoaded = (state: ISdmsReportState) => state.SoStatusReportLoaded;

export const getSoStatusReportDetails = (state: ISdmsReportState) => state.SoStatusReportDetails;
export const getSoStatusReportDetailsLoaded = (state: ISdmsReportState) => state.SoStatusReportDetailsLoaded;

export const getStockProducts = (state: ISdmsReportState) => state.stockProducts;

export const getStockReport = (state: ISdmsReportState) => state.stockReport;
export const getStockReportLoaded = (state: ISdmsReportState) => state.stockReportLoaded;

export const getCustomers = (state: ISdmsReportState) => state.customers;

export const getStockProductList = (state: ISdmsReportState) => state.productList;
export const getAllStockProductList = (state: ISdmsReportState) => state.globalProductList;

//------- Group Code, Sub Group Code, Sub Sub Group Code, and BrandDisplay Name-----------
export const getStockGroupCodes = (state:ISdmsReportState) => state.stockGroupCodes;
export const getStockSubGroupCodes = (state:ISdmsReportState) => state.stockSubGroupCodes;
export const getStockSubSubGroupCodes = (state:ISdmsReportState) => state.stockSubSubGroupCodes;
export const getStockBrandDisplayNames = (state:ISdmsReportState) => state.stockBrandDisplayNames;