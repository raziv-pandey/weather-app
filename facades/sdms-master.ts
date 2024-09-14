import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as sdmsState from '../store';
import { IStatesRequest, ICitiesRequest, ICustomerSaveRequest } from '../models/sdms-master.interface';

@Injectable()
export class SdmsMasterModel {
    sdmsState :any ;
    constructor(private _store :Store<sdmsState.ISdmsState>) {
        this.sdmsState = this._store.select(sdmsState.getMastersState);
    }
    
    public isLoading() {
        return this.sdmsState.pluck('loading');
    }
        //--------------------Countries--------------------------------
        public loadCountries(){
            this._store.dispatch(new sdmsState.LoadCountriesAction());
        }

        public getCountries() {
            return this._store.select(sdmsState.getCountriesState);
        }

        //--------------------GSTN Types--------------------------------
        public loadGstnTypes(){
            this._store.dispatch(new sdmsState.LoadGstnTypesAction());
        }

        public getGstnTypes() {
            return this._store.select(sdmsState.getGstnTypesState);
        }

        //--------------------States--------------------------------
        public loadStates(request:IStatesRequest){
            this._store.dispatch(new sdmsState.LoadStatesAction(request));
        }

        public getStates() {
            return this._store.select(sdmsState.getStatesState);
        }

        //--------------------Cities--------------------------------
        public loadCities(request:ICitiesRequest){
            this._store.dispatch(new sdmsState.LoadCitiesAction(request));
        }

        public getCities() {
            return this._store.select(sdmsState.getCitiesState);
        }

         //--------------------GL Codes--------------------------------
         public loadGlCodes(){
            this._store.dispatch(new sdmsState.LoadGlCodesAction());
        }

        public getGlCodes() {
            return this._store.select(sdmsState.getGlCodesState);
        }

       
        //---------------Save Customer----------------

        saveCustomers(request :ICustomerSaveRequest ){
            this._store.dispatch(new sdmsState.SaveCustomerMasterAction(request));
        }

        public getCustomerParam() {
            return this._store.select(sdmsState.getCustomerParamState);
        }
    
        public resetForm() {
            this._store.dispatch(new sdmsState.ResetCustomerMasterAction);
        }


}
