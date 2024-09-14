import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
//import { of } from 'rxjs/Observable/of';
import 'rxjs/add/observable/throw';

import * as fromLG from '../actions/licence.actions';
import { LGService } from '../../services/licence.service';
import { ICustomersRequest, ILicenceTypesRequest, ILicenceKeysRequest, IActivateLicenceRequest, IGenerateLicenceRequest } from '../../models/licence.interface';
import { SharedApiService } from '../../../shared/services/shared-api.service';


@Injectable()
export class LGEffects {
  constructor(
    private _actions: Actions,
    private _lgService: LGService,
    private _sharedApiService: SharedApiService
  ) { }
  
 @Effect() loadLicenceCustomers$ = this._actions.ofType(fromLG.LOAD_LICENCE_CUSTOMERS)
    .pipe(
        map((action: fromLG.LoadLicenceCustomersAction) => action.payload),
        switchMap(
            (ICustomersRequest) => this._lgService.getLicenceCustomers(ICustomersRequest)
            .pipe(
                map((licenceCustomers) => new fromLG.LoadLicenceCustomersSuccessAction(licenceCustomers) ),
                catchError((e) => Observable.of( new fromLG.LoadLicenceCustomersFailAction(e)))
            )
        )
    )
    
    @Effect() loadLicenceTypes$ = this._actions.ofType(fromLG.LOAD_LICENCE_TYPES)
    .pipe(
        map((action: fromLG.LoadLicenceTypesAction) => action.payload),
        switchMap(
            (ILicenceTypesRequest) => this._lgService.getLicenceTypes(ILicenceTypesRequest)
            .pipe(
                map((licenceTypes) => new fromLG.LoadLicenceTypesSuccessAction(licenceTypes) ),
                catchError((e) => Observable.of( new fromLG.LoadLicenceTypesFailAction(e)))
            )
        )
    )    

    @Effect() loadLicenceKeys$ = this._actions.ofType(fromLG.LOAD_LICENCE_KEYS)
    .pipe(
        map((action: fromLG.LoadLicenceKeysAction) => action.payload),
        switchMap(
            (ILicenceKeysRequest) => this._lgService.getLicenceKeys(ILicenceKeysRequest)
            .pipe(
                map((licenceKeys) => new fromLG.LoadLicenceKeysSuccessAction(licenceKeys) ),
                catchError((e) => Observable.of( new fromLG.LoadLicenceKeysFailAction(e)))
            )
        )
    );

    @Effect() loadActivateLicence$ = this._actions.ofType(fromLG.LOAD_ACTIVATE_LICENCE)
    .pipe(
        map((action: fromLG.LoadActivateLicenceAction) => action.payload),
        switchMap(
            (IActivateLicenceRequest) => this._lgService.getActivateLicence(IActivateLicenceRequest)
            .pipe(
                map((activateLicence) => new fromLG.LoadActivateLicenceSuccessAction(activateLicence) ),
                catchError((e) => Observable.of( new fromLG.LoadActivateLicenceFailAction(e)))
            )
        )
    );

     //----------------------------Delete Active Licence----------------------
    @Effect() deleteActiveLicence$ = this._actions.ofType(fromLG.DELETE_ACTIVE_LICENCE)
        .pipe(
            map((action: fromLG.DeleteActiveLicenceAction) => action.payload),
            switchMap(
                (deleteActiveLicence) => this._lgService.deleteActiveLicence(deleteActiveLicence)
                .pipe(
                    map((result) => new fromLG.DeleteActiveLicenceSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromLG.DeleteActiveLicenceFailAction(e)))
                )
            )
    )
    
    @Effect() getGeneratedLicenceNo$ = this._actions.ofType(fromLG.LOAD_GENERATE_LICENCE)
    .pipe(
        map((action: fromLG.LoadGenerateLicenceAction) => action.payload),
        // switchMap((data) => this._sharedApiService.getSessionId().map(sessionId => {
        //        data.sessionId = <string>sessionId;
        //        return data;
        //   }) ),
        switchMap(
            (generatedLicenceNo) => this._lgService.getGenerateLicence(generatedLicenceNo)
            .pipe(
                map((data) => new fromLG.LoadGenerateLicenceSuccessAction(data) ),
                catchError((e) => Observable.of( new fromLG.LoadGenerateLicenceFailAction(e)))
            )
        )
    );
    

    //----------------------------Delete Active Licence----------------------
    @Effect() getSessionIdLicence$ = this._actions.ofType(fromLG.GET_SESSION_ID_LICENCE)
        .pipe(
            switchMap(
                () => this._sharedApiService.getSessionId()
                .pipe(
                    map((result) => new fromLG.GetSessionIdLicenceSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromLG.GetSessionIdLicenceFailAction(e)))
                )
            )
    )
    
}
