import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as licenceGenerationState from '../store';
import { ILocation } from '../../shared/models/location.interface';
import { ICustomersRequest, IDeleteActiveLicenceRequest, ILicenceTypesRequest, ILicenceKeysRequest, IActivateLicenceRequest, IGenerateLicenceRequest } from '../models/licence.interface';
import * as sdmsState from '../store';

@Injectable()
export class LGModel {
    licenceState :any ;
    constructor(private _store :Store<sdmsState.ISdmsState>) {
        this.licenceState = this._store.select(sdmsState.getLicenceGenerationState);
    }
    
    public isLoading() {
        return this.licenceState.pluck('loading');
    }

    //----------------Get Customers-------------------------------
    getLicenceCustomers() {
        return this._store.select(sdmsState.getLicenceCustomersState);
    }

    loadLicenceCustomers(request:ICustomersRequest) {
       // this._store.dispatch(new sdmsState.load);
       this._store.dispatch(new sdmsState.LoadLicenceCustomersAction(request));
    }

    //----------------Get Licence Types-------------------------------
    getLicenceTypes() {
        return this._store.select(sdmsState.getLicenceTypesState);
    }

    loadLicenceTypes(request:ILicenceTypesRequest){
        this._store.dispatch(new sdmsState.LoadLicenceTypesAction(request));
    }

    //----------------Get Licence Keys-------------------------------    
    getLicenceKeys() {
        return this._store.select(sdmsState.getLicenceKeysState);
    }

    loadLicenceKeys(request:ILicenceKeysRequest){
        this._store.dispatch(new sdmsState.LoadLicenceKeysAction(request));
    }

    //----------------Get Activate Licence -------------------------------  
    getActivateLicence() {
        return this._store.select(sdmsState.getActivateLicenceState);
    }

    loadActivateLicence(request:IActivateLicenceRequest){
        this._store.dispatch(new sdmsState.LoadActivateLicenceAction(request));
    }

    //----------------Get Generate Licence No-------------------------------  
    getGenerateicence() {
        return this._store.select(sdmsState.getGenerateLicenceState);
    }

    loadGenerateLicence(request:IGenerateLicenceRequest){
        this._store.dispatch(new sdmsState.LoadGenerateLicenceAction(request));
    }

    resetGenerateLicence() {
        this._store.dispatch(new sdmsState.ResetGenerateLicenceAction());
    }

    //-----------------Delete Active Licence---------------------------
    deleteActiveLicence(request: IDeleteActiveLicenceRequest){
        this._store.dispatch(new sdmsState.DeleteActiveLicenceAction(request));
    }

     //-----------------Reset Active Licence---------------------------
    resetActiveLicence(){
        this._store.dispatch(new sdmsState.ResetLicenceAction());
    }

    //----------------Get Session Id Licence-------------------------------  
    getSessionIdLicence() {
        return this._store.select(sdmsState.getSessionIdLicenceState);
    }

    loadSessionIdLicence(){
        this._store.dispatch(new sdmsState.GetSessionIdLicenceAction());
    }
}
