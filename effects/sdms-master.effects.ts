import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators';
//import { of } from 'rxjs/Observable/of';
import 'rxjs/add/observable/throw';
import * as fromSdmsMaster from '../actions/sdms-master.actions';
import { SdmsMasterService } from '../../services/sdms-master.service';
import { SharedApiService } from '../../../shared/services/shared-api.service';
import { IGstnTypesData } from '../../models/sdms-master.interface';

@Injectable()
export class SdmsMasterEffects {
     constructor(
          private _actions: Actions,
          private _sdmsMasterService: SdmsMasterService,
          private _sharedApiService: SharedApiService
          ) { }

     //------------------------Load Countries-----------------------------------------------
  @Effect() loadCountries$ = this._actions.ofType(fromSdmsMaster.LOAD_COUNTRIES)
  .pipe(
          map((action: fromSdmsMaster.LoadCountriesAction ) => action.payload),
          switchMap(() => this._sdmsMasterService.getCountries()
              .pipe(
                  map((countries) => new fromSdmsMaster.LoadCountriesSuccessAction(countries) ),
                  catchError((e) => Observable.of( new fromSdmsMaster.LoadCountriesFailAction(e)))
              )
          )
  );

//----------------------Load GSTN Types-------------------------------------------------  
@Effect() loadGstnTypes$ = this._actions.ofType(fromSdmsMaster.LOAD_GSTN_TYPES)
  .pipe(
          switchMap(() => this._sdmsMasterService.getGstnTypes()
              .pipe(
                  map((gstnTypes) => new fromSdmsMaster.LoadGstnTypesSuccessAction(gstnTypes) ),
                  catchError((e) => Observable.of( new fromSdmsMaster.LoadGstnTypesFailAction(e)))
              )
          )
  );

//------------------------------- Load States--------------------------------------------
@Effect() loadStates$ = this._actions.ofType(fromSdmsMaster.LOAD_STATES)
  .pipe(
          map((action: fromSdmsMaster.LoadStatesAction ) => action.payload),
          switchMap((request) => this._sdmsMasterService.getStates(request)
              .pipe(
                  map((states) => new fromSdmsMaster.LoadStatesSuccessAction(states) ),
                  catchError((e) => Observable.of( new fromSdmsMaster.LoadStatesFailAction(e)))
              )
          )
  );  
//------------------------------- Load Cities--------------------------------------------
@Effect() loadCities$ = this._actions.ofType(fromSdmsMaster.LOAD_CITIES)
  .pipe(
          map((action: fromSdmsMaster.LoadCitiesAction ) => action.payload),
          switchMap((request) => this._sdmsMasterService.getCities(request)
              .pipe(
                  map((cities) => new fromSdmsMaster.LoadCitiesSuccessAction(cities) ),
                  catchError((e) => Observable.of( new fromSdmsMaster.LoadCitiesFailAction(e)))
              )
          )
  ); 

  //------------------------------- Load GL Codes--------------------------------------------
    @Effect() loadGLTypes$ = this._actions.ofType(fromSdmsMaster.LOAD_GL_CODES)
    .pipe(
            map((action: fromSdmsMaster.LoadGlCodesAction ) => action.payload),
            switchMap(() => this._sdmsMasterService.getGLNames()
                .pipe(
                    map((glnames) => new fromSdmsMaster.LoadGlCodesSuccessAction(glnames) ),
                    catchError((e) => Observable.of( new fromSdmsMaster.LoadGlCodesFailAction(e)))
                )
            )
    );; 

//    ----------------Save Customer Master-----------------------------
 @Effect() saveCreateCustomer$ = this._actions.ofType(fromSdmsMaster.SAVE_CUSTOMER_MASTER)
 .pipe(
        map((action: fromSdmsMaster.SaveCustomerMasterAction) => action.payload),    
        switchMap((request) => this._sdmsMasterService.saveCustomer(request)
             .pipe(
                 map((result) => new fromSdmsMaster.SaveCustomerMasterSuccessAction(result)),
                 catchError((e) => Observable.of( new fromSdmsMaster.SaveCustomerMasterFailAction(e)))
             )
         )
 );

}

