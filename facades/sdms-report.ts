import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as sdmsState from '../store';

import { ISdmsReportRequest, ICustomerSOStatusReportRequest, ISoStatusReportRequest, ISoStatusReportDetailsRequest, IStockProductsRequest, IStockReportRequest } from '../models/sdms-report.interface';
import { ICustomer } from '../../shared/models/customer.interface';

@Injectable()
export class SdmsModel {
    sdmsState: any;
    constructor(private _store: Store<sdmsState.ISdmsState>) {
        this.sdmsState = this._store.select(sdmsState.getReportsState);
    }

    public isLoading() {
        return this.sdmsState.pluck('loading');
    }
    //-------------Customerwise Report--------------------------------
    public getCustomerWiseReport() {
        return this._store.select(sdmsState.getCustomerWiseReportState);
    }

    public getCustomerWiseReportLoaded() {
        return this._store.select(sdmsState.getCustomerWiseReportLoadedState);
    }

    public loadCustomerWiseReport(data: ISdmsReportRequest) {
        this._store.dispatch(new sdmsState.LoadCustomerWiseReportAction(data));
    }

    public resetCustomerWiseReport() {
        this._store.dispatch(new sdmsState.ResetCustomerWiseReportAction());
    }

    //---------------------------Collection Report-----------------------
    public getCollectionReport() {
        return this._store.select(sdmsState.getCollectionReportState);
    }

    public getCollectionReportLoaded() {
        return this._store.select(sdmsState.getCollectionReportLoadedState);
    }

    public loadCollectionReport(data: ISdmsReportRequest) {
        this._store.dispatch(new sdmsState.LoadCollectionReportAction(data));
    }

    public resetCollectionReport() {
        this._store.dispatch(new sdmsState.ResetCollectionReportAction());
    }

    //-------------------Collection Details Report-------------------------
    public getCollectionDetails() {
        return this._store.select(sdmsState.getCollectionDetailsState);
    }

    public getCollectionDetailsLoaded() {
        return this._store.select(sdmsState.getCollectionDetailsLoadedState);
    }

    public loadCollectionDetails(data: ISdmsReportRequest) {
        this._store.dispatch(new sdmsState.LoadCollectionDetailsAction(data));
    }

    public resetCollectionDetails() {
        this._store.dispatch(new sdmsState.ResetCollectionDetailsAction());
    }

    //----------Load and Get Customers in So Status Report on Location select-----

    public loadCustomersSoStatusReport(data: ICustomerSOStatusReportRequest) {
        this._store.dispatch(new sdmsState.LoadCustomersSoStatusReportAction(data));
    }

    public getCustomersSoStatusReport() {
        return this._store.select(sdmsState.getCustomersSoStatusReportState);
    }

    //-----------------So Status Report-------------------------------

    public getSoStatusReport() {
        return this._store.select(sdmsState.getSoStatusReportState);
    }

    public getSoStatusReportLoaded() {
        return this._store.select(sdmsState.getSoStatusReportLoadedState);
    }

    public loadSoStatusReport(data: ISoStatusReportRequest) {
        this._store.dispatch(new sdmsState.LoadSoStatusReportAction(data));
    }

    public resetSoStatusReport() {
        this._store.dispatch(new sdmsState.ResetSoStatusReportAction());
    }

    //-----------------So Status Report Details-------------------------------

    public getSoStatusReportDetails() {
        return this._store.select(sdmsState.getSoStatusReportDetailsState);
    }

    public getSoStatusReportDetailsLoaded() {
        return this._store.select(sdmsState.getSoStatusReportDetailsLoadedState);
    }

    public loadSoStatusReportDetails(data: ISoStatusReportDetailsRequest) {
        this._store.dispatch(new sdmsState.LoadSoStatusReportDetailsAction(data));
    }

    public resetSoStatusReportDetails() {
        this._store.dispatch(new sdmsState.ResetSoStatusReportDetailsAction());
    }

    //-----------------Stock Products-------------------------------

    public getStockProducts() {
        return this._store.select(sdmsState.getStockProductListState);
    }

    public getAllStockProducts() {
        return this._store.select(sdmsState.getAllStockProductListState);
    }

    public loadStockProducts(data: IStockProductsRequest) {
        this._store.dispatch(new sdmsState.LoadStockProductsAction(data));
    }

    public resetStockProducts() {
        this._store.dispatch(new sdmsState.ResetStockProductsAction());
    }

    //-----------------Stock Reports-------------------------------

    public getStockReport() {
        return this._store.select(sdmsState.getStockReportState);
    }

    public getSoStockReportLoaded() {
        return this._store.select(sdmsState.getStockReportLoadedState);
    }

    public loadStockReport(data: IStockReportRequest) {
        this._store.dispatch(new sdmsState.LoadStockReportAction(data));
    }

    public resetStockReport() {
        this._store.dispatch(new sdmsState.ResetStockReportAction());
    }

    //------Customer Request For get Customer Wise Sales report -------------------------
    public getCustWiseCustomers(): Observable<ICustomer[]> {
        return this._store.select(sdmsState.getCustomerState);
    }

    public loadCustWiseCustomers() {
        this._store.dispatch(new sdmsState.LoadCustomersCustWiseSalesAction());
    }

    //-----------------Stock Group Codes-------------------------------

    public getStockGroupCodes(){
        return this._store.select(sdmsState.getStockGroupCodesState);
    }

    public loadStockGroupCodes(){
        this._store.dispatch(new sdmsState.LoadStockGroupCodesAction());
    }

    public resetStockGroupCodes(){
        this._store.dispatch(new sdmsState.ResetStockGroupCodesAction());
    }

    //-----------------Stock Sub Group Codes-------------------------------

    public getStockSubGroupCodes(){
        return this._store.select(sdmsState.getStockSubGroupCodesState);
    }
    
    public loadStockSubGroupCodes(groupCode){
        this._store.dispatch(new sdmsState.LoadStockSubGroupCodesAction(groupCode));
    }

    public resetStockSubGroupCodes(){
        this._store.dispatch(new sdmsState.ResetStockSubGroupCodesAction());
    }

     //-----------------Stock Sub Sub Group Codes-------------------------------

     public getStockSubSubGroupCodes(){
        return this._store.select(sdmsState.getStockSubSubGroupCodesState);
    }

    public loadStockSubSubGroupCodes(request){
        this._store.dispatch(new sdmsState.LoadStockSubSubGroupCodesAction(request));
    }

    public resetStockSubSubGroupCodes(){
        this._store.dispatch(new sdmsState.ResetStockSubSubGroupCodesAction());
    }

     //-----------------Stock Brand Display Names-------------------------------

     public getStockBrandDisplayNames(){
        return this._store.select(sdmsState.getStockBrandDisplayNamesState);
    }

    public loadStockBrandDisplayNames(){
        this._store.dispatch(new sdmsState.LoadStockBrandDisplayNamesAction());
    }

    public resetStockBrandDisplayNames(){
        this._store.dispatch(new sdmsState.ResetStockBrandDisplayNamesAction());
    }

    public setStockReportView(request:string){
        this._store.dispatch(new sdmsState.SetStockReportViewAction(request))
    }

    public loadStockProductsWithFilter(data: IStockProductsRequest) {
        this._store.dispatch(new sdmsState.LoadStockProductsFilterAction(data));
    }

    public getStockProductList(){
        return this._store.select(sdmsState.getStockProductListState);
    }

    public resetStockReportData(){
        this._store.dispatch(new sdmsState.ResetStockReportDataAction());
    }

}
