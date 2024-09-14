import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as sdmsState from '../store';
import { ILocation } from '../../shared/models/location.interface';
import { IECodeRequest, ICustomerDetailsAsyncRequest, IOrderHeader, ISOColCustomersRequest, IProductListRquest, IAutoAdvanceRequest, IPriceBookHeaderDmDetailsRequest, IUOMRequest, IProduct, IPriceRequest, ICart, ISOSaveRequest, IUOM, IConversionFactorRequest, IDeliverySchedule, IDeleteProductRequest, ITaxRequest, ICreditCheckRequest, ISaveSORequest, IItemWiseTaxRequest, ISOUpdateRequest, IAddFileDocumentRequest, IUploadFileRequest, IDeleteFileDocumentRequest, IFileSrNoUpdateRequest, ICheckFinancialYearRequest, ICustOutAmutRequest } from '../models/so.interface';


@Injectable()
export class SOModel {
    soState: any;
    constructor(private _store: Store<sdmsState.ISdmsState>) {
        this.soState = this._store.select(sdmsState.getSOState);
    }

    public isLoading() {
        return this.soState.pluck('loading');
    }

    getCustomerList() {
        return this._store.select(sdmsState.getCustomerListState);
    }

    getAllCustomerList() {
        return this._store.select(sdmsState.getAllCustomerListState);
    }

    loadLocDetailsOfLoggedEmp(request:string){
        this._store.dispatch(new sdmsState.AddLocationOfEmployeeAsPerRoleAction(request));
    }

    loadCustomerDetailsWithInfinityScroll(request:ICustomerDetailsAsyncRequest){
        this._store.dispatch(new sdmsState.LoadCustomersListWithInfinityScrollAction(request));
    }    
    
    loadCustomers(request: ICustomerDetailsAsyncRequest) {
        this._store.dispatch(new sdmsState.LoadCustomersAction(request));
    }

    getTaxes() {
        return this._store.select(sdmsState.getTaxesState);
    }

    loadTaxes(request: ITaxRequest) {
        this._store.dispatch(new sdmsState.LoadTaxesAction(request));
    }

    resetTaxes() {
        this._store.dispatch(new sdmsState.ResetTaxesAction());
    }

    loadItemWiseTaxes(request: IItemWiseTaxRequest) {
        this._store.dispatch(new sdmsState.LoadItemWiseTaxesAction(request));
    }

    getAllItemWiseTaxes() {
        return this._store.select(sdmsState.getItemWiseTaxesState);
    }

    resetItemWiseTaxes() {
        this._store.dispatch(new sdmsState.ResetItemWiseTaxesAction());
    }
    getLocations() {
        return this._store.select(sdmsState.getLocationsState);
    }

    getEcodes() {
        return this._store.select(sdmsState.getEcodesState);
    }

    loadLocations(moduleId) {
        this._store.dispatch(new sdmsState.LoadLocationsAction(moduleId));
    }

    loadECodes(request: IECodeRequest) {
        // let request:IECodeRequest = {
        //     moduleId : 'SDMS',
        //     tranIndicator : 'SO',
        //     locationCode : '' + location.id
        // }
        this._store.dispatch(new sdmsState.LoadEppsCodesAction(request));
    }


    setOrderHeader(oh: IOrderHeader) {
        this._store.dispatch(new sdmsState.SetOrderHeaderAction(oh));
    }

    getOrderLocation() {
        return this._store.select(sdmsState.getOrderLocationState);
    }

    getOrderEcode() {
        return this._store.select(sdmsState.getOrderEcodeState);
    }

    getOrderCustomer() {
        return this._store.select(sdmsState.getOrderCustomerState);
    }

    getProductList() {
        return this._store.select(sdmsState.getProductListState);
    }

    LoadProductList(request: IProductListRquest) {
        this._store.dispatch(new sdmsState.LoadProductListAction(request))
    }

    getUOMList() {
        return this._store.select(sdmsState.getUOMListState);
    }
    LoadUOMList(request: IUOMRequest) {
        this._store.dispatch(new sdmsState.LoadUomListAction(request))
    }

    getAvailableStock() {
        return this._store.select(sdmsState.getStockState);
    }

    loadAvailableStock(request: IUOMRequest) {
        this._store.dispatch(new sdmsState.LoadAvailableStockAction(request))
    }

    getCustomerPreviousOrders() {
        return this._store.select(sdmsState.getCustomerPreviousOrdersState);
    }
    LoadCustomerPreviousOrders(request: IProductListRquest) {
        this._store.dispatch(new sdmsState.LoadCustomerPreviousOrdersAction(request));
    }

    getCustomerWiseCartDetails() {
        return this._store.select(sdmsState.getCustomerWiseCartDetailsState);
    }
    LoadCustomerWiseCartDetails(request: IProductListRquest) {
        this._store.dispatch(new sdmsState.LoadCustomerWiseCartDetailsAction(request));
    }

    getSalesOrderLinkings() {
        return this._store.select(sdmsState.getSalesOrderLinkingsState);
    }
    LoadSalesOrderLinkings(request: IProductListRquest) {
        this._store.dispatch(new sdmsState.LoadSalesOrderLinkingsAction(request));
    }

    SetProductSelected(product: IProduct) {
        this._store.dispatch(new sdmsState.SetProductSelectedAction(product));
    }
    getCart() {
        return this._store.select(sdmsState.getCartState);
    }
    getSelectedItem() {
        return this._store.select(sdmsState.getCartState)
            .distinctUntilChanged((x: ICart, y: ICart) => x.itemCode === y.itemCode)
            .map(cart => cart.itemCode);
    }
    getSelectedUOM() {
        return this._store.select(sdmsState.getCartState)
            .distinctUntilChanged((x: ICart, y: ICart) => x.billUom === y.billUom)
            .map(cart => cart.billUom);
    }
    setSelectedUOM(uom: IUOM) {
        this._store.dispatch(new sdmsState.SetUOMSelectedAction(uom));
    }

    LoadProductPrice(request: IPriceRequest) {
        if (request && (request.isRateEditable == false || request.dmHdrSrno == "0")) {
            this._store.dispatch(new sdmsState.LoadPriceAction(request));
        } else if (request.isRateEditable == true && request.dmHdrSrno != "0") {
            this._store.dispatch(new sdmsState.LoadManualDiscountMatrixDetailsAction(request));
        }
    }

    getOrderHeader() {
        return this._store.select(sdmsState.getOrderHeaderState);
    }
    getQuantity() {
        return this._store.select(sdmsState.getQuantityState).distinctUntilChanged();
    }
    updateQuantity(quantity) {
        this._store.dispatch(new sdmsState.UpdateProductQuantityAction(quantity))
    }

    setPreviousOrder(order) {
        this._store.dispatch(new sdmsState.SetPreviousOrderAsCurrentOrderAction(order));
    }

    getDeliverySchedule() {
        return this._store.select(sdmsState.getDeliveryScheduleState);
    }
    setDeliverySchedule(data: IDeliverySchedule[]) {
        this._store.dispatch(new sdmsState.SetDeliveryScheduleAction(data));
    }
    getOrderDetails() {
        return this._store.select(sdmsState.getOrderDetailsState);
    }

    loadUOMConversionFactor(request: IConversionFactorRequest) {
        this._store.dispatch(new sdmsState.LoadUOMConversionFactorAction(request));
    }
    addToCart(data: ISOSaveRequest) {
        this._store.dispatch(new sdmsState.AddToCartAction(data));
    }

    updateCart(data: ISOUpdateRequest) {
        this._store.dispatch(new sdmsState.UpdateCartAction(data));
    }

    resetOrder() {
        this._store.dispatch(new sdmsState.ResetOrderDetailsAction());
    }

    setCurrentOrder(order: ICart) {
        this._store.dispatch(new sdmsState.SetCurrentOrderAction(order));
    }

    deleteProduct(request: IDeleteProductRequest) {
        this._store.dispatch(new sdmsState.DeleteProductAction(request));
    }

    checkCreditControl(request: ICreditCheckRequest) {

        this._store.dispatch(new sdmsState.CheckCreditControlAction(request));
    }

    getCreditControl() {
        return this._store.select(sdmsState.getCreditControlState).distinctUntilChanged();
    }

    resetCreditControl() {
        this._store.dispatch(new sdmsState.ResetCreditControlAction());
    }
    saveSalesOrder(request: ISaveSORequest) {
        this._store.dispatch(new sdmsState.SaveSalesOrderAction(request));
    }

    getSavedOrder() {
        return this._store.select(sdmsState.getSavedOrderState);
    }
    getDidFileUploaded() {
        return this._store.select(sdmsState.getDidFileUploadedState);
    }
    saveFiles(request: IFileSrNoUpdateRequest) {
        this._store.dispatch(new sdmsState.SaveFileDocumentAction(request));
    }

    getLocationDetailOfLoggedEmp() {
        return this._store.select(sdmsState.getLocationDetailOfLoggedEmpState);
    }

    clearProductRates() {
        this._store.dispatch(new sdmsState.ClearProductRateAction());
    }

    LoadCustomerDocuments(customerId) {
        this._store.dispatch(new sdmsState.LoadFileDocumentsAction(customerId));
    }
    getCustomerDocuments() {
        return this._store.select(sdmsState.getFileDocumentsState);
    }

    uploadDocument(request: IUploadFileRequest) {
        this._store.dispatch(new sdmsState.AddFileDocumentAction(request));
    }

    deleteCustomerDocument(request: IDeleteFileDocumentRequest) {
        this._store.dispatch(new sdmsState.DeleteFileDocumentAction(request));
    }

    loadSessionForFiles() {
        this._store.dispatch(new sdmsState.LoadSessionForFilesAction());
    }

    checkValidFinancialYear(request: ICheckFinancialYearRequest) {
        this._store.dispatch(new sdmsState.CheckValidFinancialYearAction(request));
    }

    getValidFinancialYearStatus() {
        return this._store.select(sdmsState.getIsValidFinancialYearState);
    }

    getValidFinancialYearStatusLoaded() {
        return this._store.select(sdmsState.getIsValidFinancialYearLoadedState);
    }

    //-------------------PriceBook Header----------------------------------

    getPriceBookHeaderData() {
        return this._store.select(sdmsState.getPriceBookHeaderDataState);
    }

    loadPriceBookHeaderData(request: IPriceBookHeaderDmDetailsRequest) {
        this._store.dispatch(new sdmsState.LoadPriceBookHeaderAction(request));
    }


    //-------------------DM Details----------------------------------

    getDmDetails() {
        return this._store.select(sdmsState.getDMDetailsState);
    }

    loadDmDetails(request: IPriceBookHeaderDmDetailsRequest) {
        this._store.dispatch(new sdmsState.LoadDmDetailsAction(request));
    }



    //-------------------FA Code Adv----------------------------------

    getFaAutoAdv() {
        return this._store.select(sdmsState.getFaAutoAdvState);
    }

    loadFaAutoAdv(request: IAutoAdvanceRequest) {
        this._store.dispatch(new sdmsState.LoadFaAutoAdvAction(request));
    }

    // ----------------------------Get Customer Wise Cart Item Count --------------------------

    getCustomerWiseCartItemCount() {
        return this._store.select(sdmsState.getCustomerWiseCartItemsCountState);
    }

    loadCustomerWiseCartItemCount(request: IProductListRquest) {
        this._store.dispatch(new sdmsState.LoadCustomerWiseCartItemsCountAction(request));
    }


    // --------------------- Update Product Rate Manually Enter-----------------

    getProductRate() {
        return this._store.select(sdmsState.getProductRateState).distinctUntilChanged();
    }

    getProductDiscount() {
        return this._store.select(sdmsState.getProductDiscountState).distinctUntilChanged();
    }

    updateProductRate(itemRate) {
        this._store.dispatch(new sdmsState.UpdateProductRateAction(itemRate))
    }

    updateProductDiscount(itemDiscount) {
        this._store.dispatch(new sdmsState.UpdateProductDiscountAction(itemDiscount))
    }

    SetOpenDeliveryScheduler(deliverySchduleOpen) {
        this._store.dispatch(new sdmsState.SetDeliveryScheduleOpenAction(deliverySchduleOpen));
    }


    SetRateEditableFlag(isRateEditable) {
        this._store.dispatch(new sdmsState.SetRateEditableAction(isRateEditable));
    }

    SetDiscountEditableFlag(isDiscountEditable) {
        this._store.dispatch(new sdmsState.SetDiscountEditableAction(isDiscountEditable));
    }
    
    SetDiscountTypeFlag(isDiscountType){
        this._store.dispatch(new sdmsState.SetDiscountTypeAction(isDiscountType));
    }


    checkCreditControlBeforeBO(request: ICreditCheckRequest) {
        this._store.dispatch(new sdmsState.CheckCreditControlBeforSOAction(request));
    }

    getCreditControlBeforSO() {
        return this._store.select(sdmsState.getCreditControlBeforBOState).distinctUntilChanged();
    }

    resetCreditControlBeforeSO() {
        this._store.dispatch(new sdmsState.ResetCreditControlBeforSOAction());
    }

    getcustomerOutStandAmount() {
        return this._store.select(sdmsState.getCustomerOutStandAmountState).distinctUntilChanged();
    }

    loadCustomerOutStandAmount(request: ICustOutAmutRequest) {
        this._store.dispatch(new sdmsState.LoadCustOutStandingAmountAction(request));
    }

    /** Delete Customer Wise Image From Local Storage */

    deleteCustWiseImage(request: IDeleteFileDocumentRequest) {
        this._store.dispatch(new sdmsState.DeleteImgStorageAction(request));
    }
    // disable add to card
    SetAddToCartFlag(isAddToCartDisabled) {
        this._store.dispatch(new sdmsState.AddToCartDisabledButtonAction(isAddToCartDisabled));
    }

    getAllProductsList() {
        return this._store.select(sdmsState.getAllProductsListState);
    }
    //LoadCustomersAction
    resetCustomerList(){
        this._store.dispatch(new sdmsState.resetCustomer());
    }
}
