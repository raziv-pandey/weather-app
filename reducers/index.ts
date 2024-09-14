import { ActionReducerMap, ActionReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable } from "rxjs";

import * as fromSdmsReports from './sdms-report.reducers';
import * as fromSO from './so.reducers';
import * as fromCollection from './collection.reducers';
import * as fromLicenceGeneration from './licence.reducers';
import * as fromSdmsMasters from './sdms-master.reducers';

export interface ISdmsState {
    reports: fromSdmsReports.ISdmsReportState,
    so: fromSO.ISOState,
    collection: fromCollection.ICollectionState,
    lg: fromLicenceGeneration.ILicenceGenerationState,
    masters : fromSdmsMasters.ISdmsMasterState
}

export const reducers: ActionReducerMap<ISdmsState> = {
    reports: fromSdmsReports.reducer,
    so: fromSO.reducer,
    collection: fromCollection.reducer,
    lg: fromLicenceGeneration.reducer,
    masters : fromSdmsMasters.reducer
};

//users selectors
export const getSdmsState = createFeatureSelector<ISdmsState>('sdms');
export const getReportsState = createSelector(getSdmsState, (state: ISdmsState) => state.reports);

export const getCustomerWiseReportState = createSelector(getReportsState, fromSdmsReports.getCustomerWiseReport);
export const getCustomerWiseReportLoadedState = createSelector(getReportsState, fromSdmsReports.getCustomerWiseReportLoaded);

export const getCollectionReportState = createSelector(getReportsState, fromSdmsReports.getCollectionReport);
export const getCollectionReportLoadedState = createSelector(getReportsState, fromSdmsReports.getCollectionReportLoaded);

export const getCollectionDetailsState = createSelector(getReportsState, fromSdmsReports.getCollectionDetails);
export const getCollectionDetailsLoadedState = createSelector(getReportsState, fromSdmsReports.getCollectionDetailsLoaded);

export const getCustomersSoStatusReportState = createSelector(getReportsState, fromSdmsReports.getCustomersSoStatusReport);
export const getCustomersSoStatusReportLoadedState = createSelector(getReportsState, fromSdmsReports.getCustomersSoStatusReportLoaded);

export const getSoStatusReportState = createSelector(getReportsState, fromSdmsReports.getSoStatusReport);
export const getSoStatusReportLoadedState = createSelector(getReportsState, fromSdmsReports.getSoStatusReportLoaded);

export const getSoStatusReportDetailsState = createSelector(getReportsState, fromSdmsReports.getSoStatusReportDetails);
export const getSoStatusReportDetailsLoadedState = createSelector(getReportsState, fromSdmsReports.getSoStatusReportDetailsLoaded);

export const getStockProductsState = createSelector(getReportsState, fromSdmsReports.getStockProducts);
export const getStockReportState = createSelector(getReportsState, fromSdmsReports.getStockReport);
export const getStockReportLoadedState = createSelector(getReportsState, fromSdmsReports.getStockReportLoaded);

export const getSOState = createSelector(getSdmsState, (state: ISdmsState) => state.so);

export const getLocationDetailOfLoggedEmpState = createSelector(getSOState, fromSO.getLocationDetailOfLoggedEmp);
export const getCustomerListState = createSelector(getSOState, fromSO.getCustomerList);
export const getAllCustomerListState = createSelector(getSOState, fromSO.getAllCustomerList);

export const getEcodesState = createSelector(getSOState, fromSO.getEcodes);
export const getLocationsState = createSelector(getSOState, fromSO.getLocations);

export const getOrderDetailsState = createSelector(getSOState, fromSO.getOrderDetails);
export const getOrderHeaderState = createSelector(getSOState, fromSO.getOrderHeader);
export const getOrderLocationState = createSelector(getSOState, fromSO.getOrderLocation);
export const getOrderEcodeState = createSelector(getSOState, fromSO.getOrderEcode);
export const getOrderCustomerState = createSelector(getSOState, fromSO.getOrderCustomer);
export const getProductListState = createSelector(getSOState, fromSO.getProductList);
export const getUOMListState = createSelector(getSOState, fromSO.getUOMList);
export const getCustomerPreviousOrdersState = createSelector(getSOState, fromSO.getCustomerPreviousOrders);
export const getCustomerWiseCartDetailsState = createSelector(getSOState, fromSO.getCustomerWiseCartDetails);
export const getSalesOrderLinkingsState = createSelector(getSOState, fromSO.getSalesOrderLinkings);
export const getCartState = createSelector(getSOState, fromSO.getCart);
export const getStockState = createSelector(getSOState, fromSO.getStock);
export const getQuantityState = createSelector(getSOState, fromSO.getQuantity);
export const getDeliveryScheduleState = createSelector(getSOState, fromSO.getDeliverySchedule);
export const getTaxesState = createSelector(getSOState, fromSO.getTaxes);
export const getItemWiseTaxesState = createSelector(getSOState, fromSO.getItemWiseTaxes);
export const getCreditControlState = createSelector(getSOState, fromSO.getCreditControl);
export const getSavedOrderState = createSelector(getSOState, fromSO.getSavedOrder);
export const getDidFileUploadedState = createSelector(getSOState, fromSO.getDidFileUploaded);
export const getFileDocumentsState = createSelector(getSOState, fromSO.getFileDocuments);
export const getIsValidFinancialYearState = createSelector(getSOState, fromSO.getIsValidFinancialYear);
export const getIsValidFinancialYearLoadedState = createSelector(getSOState, fromSO.getIsValidFinancialYearLoaded);
export const getPriceBookHeaderDataState = createSelector(getSOState, fromSO.getPriceBookHeaderData);
export const getDMDetailsState = createSelector(getSOState, fromSO.getDMDetails);
export const getFaAutoAdvState = createSelector(getSOState, fromSO.getFaAutoAdv);

//-------------- Get Customer Wise Cart Item Count  13-07-2018--------------------------------------
export const getCustomerWiseCartItemsCountState = createSelector(getSOState, fromSO.getCustomerWiseItemCount);

// ---------------Get Product rate selector for manually rate enterd 13-07-2018 ----------------------
export const getProductRateState = createSelector(getSOState, fromSO.getProductRate);

export const getProductDiscountState = createSelector(getSOState, fromSO.getProductDiscount);

export const getOpenDeliverySchduleState = createSelector(getSOState, fromSO.getOpenDeliverySchedule);

export const getRateEditableState = createSelector(getSOState, fromSO.getRateEditable);

// --------------------------- Get Manual Discount Matrix Details (27 July 2018) ------------------------------------------

export const getManualDMDetailsState = createSelector(getSOState, fromSO.getManualDMDetails);

//------------------------------ Collection Entry -----------------------------------------------------------------------
export const getCollectionState = createSelector(getSdmsState, (state: ISdmsState) => state.collection);
export const getCustomerDetailsState = createSelector(getCollectionState, fromCollection.getCustomerDetails);
export const getCustomerAddressState = createSelector(getCollectionState, fromCollection.getCustomerAddress);
export const getInvoicesState = createSelector(getCollectionState, fromCollection.getInvoices);
export const getPaymentTypesState = createSelector(getCollectionState, fromCollection.getPaymentTypes);
export const getSelectedInvoicesState = createSelector(getCollectionState, fromCollection.getSelectedInvoices);
export const getCollectionSavedState = createSelector(getCollectionState, fromCollection.getCollectionSaved);


//---------------------Licence Generation--------------------------------
export const getLicenceGenerationState = createSelector(getSdmsState, (state: ISdmsState) => state.lg);
export const getLicenceCustomersState = createSelector(getLicenceGenerationState, fromLicenceGeneration.getLicenceCustomers);
export const getLicenceTypesState = createSelector(getLicenceGenerationState, fromLicenceGeneration.getLicenceTypes);
export const getLicenceKeysState = createSelector(getLicenceGenerationState, fromLicenceGeneration.getLicenceKeys);
export const getActivateLicenceState = createSelector(getLicenceGenerationState, fromLicenceGeneration.getActivateLicence);
export const getGenerateLicenceState = createSelector(getLicenceGenerationState, fromLicenceGeneration.getGenerateLicence);
export const getSessionIdLicenceState = createSelector(getLicenceGenerationState, fromLicenceGeneration.getSessionIdLicence);


//------------------------------Partial Collection----------------------------------------------- 
export const getPartialCollectionCollectionSavedState = createSelector(getCollectionState, fromCollection.getPartialCollectionSaved);


export const getCreditControlBeforBOState = createSelector(getSOState, fromSO.getCreditControlBeforBO);

export const getCustomerOutStandAmountState = createSelector(getSOState, fromSO.getCustomerOutAmt);

export const getCustomerState = createSelector(getReportsState, fromSdmsReports.getCustomers);

export const getAllProductsListState = createSelector(getSOState, fromSO.getAllProductsList);
export const getStockProductListState = createSelector(getReportsState, fromSdmsReports.getStockProductList);
export const getAllStockProductListState = createSelector(getReportsState, fromSdmsReports.getAllStockProductList);

export const getCustomerCollectionListState = createSelector(getCollectionState, fromCollection.getCustomerCollectionList);
export const getAllCustomerCollectionListState = createSelector(getCollectionState, fromCollection.getAllCustomerCollectionList);
export const getCollectionLocationDetailOfLoggedEmpState = createSelector(getCollectionState, fromCollection.getCollectionLocationDetailOfLoggedEmp);

export const getStockGroupCodesState = createSelector(getReportsState, fromSdmsReports.getStockGroupCodes);
export const getStockSubGroupCodesState = createSelector(getReportsState, fromSdmsReports.getStockSubGroupCodes);
export const getStockSubSubGroupCodesState = createSelector(getReportsState, fromSdmsReports.getStockSubSubGroupCodes);
export const getStockBrandDisplayNamesState = createSelector(getReportsState, fromSdmsReports.getStockBrandDisplayNames);

//-----------Load Logged Employee Location Collection------------
export const getLoggedEmployeeLocationCollection = createSelector(getCollectionState, fromCollection.getCollectionLocationDetailOfLoggedEmp)

//SDMS-Masters
export const getMastersState = createSelector(getSdmsState, (state:ISdmsState)=>state.masters);

export const getCountriesState = createSelector(getMastersState, fromSdmsMasters.getCountries);
export const getGstnTypesState = createSelector(getMastersState, fromSdmsMasters.getGstnTypes);
export const getStatesState = createSelector(getMastersState, fromSdmsMasters.getStates);
export const getCitiesState = createSelector(getMastersState, fromSdmsMasters.getCities);
export const getGlCodesState = createSelector(getMastersState, fromSdmsMasters.getGLNames);
export const getCustomerParamState = createSelector(getMastersState, fromSdmsMasters.getCustomerParam);
export const getCustomerParamLoadedState = createSelector(getMastersState, fromSdmsMasters.getCustomerParamLoaded);

//End of SDMS - Master