import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as sdmsState from '../store';
import { ICustomerDetailRequest, ISaveCollectionRequest, ICustomerDetailsAsyncRequest } from '../models/collection.interface';
import { ISOColCustomersRequest } from '../models/so.interface';

@Injectable()
export class CollectionModel {
    collectionState: any;
    constructor(private _store: Store<sdmsState.ISdmsState>) {
        this.collectionState = this._store.select(sdmsState.getCollectionState);
    }

    public isLoading() {
        return this.collectionState.pluck('loading');
    }

    getCustomerDetails() {
        return this._store.select(sdmsState.getCustomerDetailsState);
    }
    getCustomerAddressDetails() {
        return this._store.select(sdmsState.getCustomerAddressState);
    }

    loadCustomerAddressDetails(request: ICustomerDetailRequest) {
        this._store.dispatch(new sdmsState.LoadCustomerAddressDetailAction(request));
    }

    getCustomerInvoices() {
        return this._store.select(sdmsState.getInvoicesState);
    }

    loadCustomerInvoices(request: ICustomerDetailRequest) {
        this._store.dispatch(new sdmsState.LoadInvoicesAction(request));
    }

    setCustomerDetails(details: any) {
        this._store.dispatch(new sdmsState.SetCustomerDetailAction(details));
    }

    getPaymentTypes() {
        return this._store.select(sdmsState.getPaymentTypesState);
    }

    loadPaymentTypes() {
        this._store.dispatch(new sdmsState.LoadPaymentTypesAction());
    }

    saveCollection(request: ISaveCollectionRequest) {
        this._store.dispatch(new sdmsState.SaveCollectionAction(request));
    }

    setSelectedInvoices(data: any) {
        this._store.dispatch(new sdmsState.SetSelectedInvoicesAction(data));
    }

    getSelectedInvoices() {
        return this._store.select(sdmsState.getSelectedInvoicesState);
    }
    getCollectionSaved() {
        return this._store.select(sdmsState.getCollectionSavedState);
    }

    resetCollection() {
        this._store.dispatch(new sdmsState.ResetCollectionAction());
    }

    savePartialCollection(request: ISaveCollectionRequest) {
        this._store.dispatch(new sdmsState.SavePartialCollectionAction(request));
    }
    getPartialCollectionSaved() {
        return this._store.select(sdmsState.getPartialCollectionCollectionSavedState);
    }
    
    // resetPartialCollection() {
    //     this._store.dispatch(new sdmsState.ReseResetPartialCollectionAction());
    // }

    getCustomerList() {
        return this._store.select(sdmsState.getCustomerCollectionListState);
    }

    getAllCustomerList() {
        return this._store.select(sdmsState.getAllCustomerCollectionListState);
    }

    loadCustomers(request: ISOColCustomersRequest) {
        this._store.dispatch(new sdmsState.LoadCustomersForCollectionAction(request));
    }

    //-----------Load Logged Employee Location Collection------------
    getLoggedEmployeeLocationCollection() {
        return this._store.select(sdmsState.getCollectionLocationDetailOfLoggedEmpState);
    }

    loadLoggedEmployeeLocationCollection(request:string) {
        this._store.dispatch(new sdmsState.LoadLoggedEmployeeLocationCollectionAction(request));
    }

    loadCustomerDetailsWithInfinityScroll(request:ICustomerDetailsAsyncRequest){
        this._store.dispatch(new sdmsState.LoadCustomersListWithInfinityCollectionScrollAction(request));
    } 

}
