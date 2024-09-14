import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import * as fromCollection from '../actions/collection.actions';
import { SharedApiService } from '../../../shared/services/shared-api.service';
import { CollectionService } from '../../services/collection.service';
import { SOService } from '../../services/so.service';
import { IEmplolyeeLocation } from '../../models/so.interface';
import * as fromSO from '../actions/so.actions';

@Injectable()
export class CollectionEffects {
    constructor(
        private _actions: Actions,
        private _collectionService: CollectionService,
        private _sharedApiService: SharedApiService,
        private _soService: SOService,
    ) { }


    @Effect() loadCustomerDetails$ = this._actions.ofType(fromCollection.LOAD_CUSTOMER_ADDRESS_DETAIL)
        .pipe(
            map((action: fromCollection.LoadCustomerAddressDetailAction) => action.payload),
            switchMap(
                (data) => this._collectionService.getCustomerDetail(data)
                    .pipe(
                        map((detail) => new fromCollection.LoadCustomerAddressDetailSuccessAction(detail)),
                        catchError((e) => Observable.of(new fromCollection.LoadCustomerAddressDetailFailAction(e)))
                    )
            )
        )

    @Effect() loadInvoices$ = this._actions.ofType(fromCollection.LOAD_INVOICES)
        .pipe(
            map((action: fromCollection.LoadInvoicesAction) => action.payload),
            switchMap(
                (data) => this._collectionService.getInvoices(data)
                    .pipe(
                        map((invoices) => new fromCollection.LoadInvoicesSuccessAction(invoices)),
                        catchError((e) => Observable.of(new fromCollection.LoadInvoicesFailAction(e)))
                    )
            )
        )

    @Effect() loadPaymentTypes$ = this._actions.ofType(fromCollection.LOAD_PAYMENT_TYPES)
        .pipe(
            switchMap(
                (data) => this._collectionService.getPaymentTypes()
                    .pipe(
                        map((paymentTypes) => new fromCollection.LoadPaymentTypesSuccessAction(paymentTypes)),
                        catchError((e) => Observable.of(new fromCollection.LoadPaymentTypesFailAction(e)))
                    )
            )
        )

    @Effect() saveCollection$ = this._actions.ofType(fromCollection.SAVE_COLLECTION)
        .pipe(
            map((action: fromCollection.SaveCollectionAction) => action.payload),
            switchMap(
                (data) => this._collectionService.savePayments(data)
                    .pipe(
                        map((status) => new fromCollection.SaveCollectionSuccessAction(status)),
                        catchError((e) => Observable.of(new fromCollection.SaveCollectionFailAction(e)))
                    )
            )
        )

    /**    Upadted By : Pravin B       Date : 06/08/2018    
    *     Description : Added For Partial Collection Functionality Bug No 13749
    */
    @Effect() savePartialCollection$ = this._actions.ofType(fromCollection.SAVE_PARTIAL_COLLECTION)
        .pipe(
            map((action: fromCollection.SavePartialCollectionAction) => action.payload),
            switchMap(
                (data) => this._collectionService.savePartialCollection(data)
                    .pipe(
                        map((status) => new fromCollection.SavePartialCollectionSuccessAction(status)),
                        catchError((e) => Observable.of(new fromCollection.SavePartialCollectionFailAction(e)))
                    )
            )
        )

    //---------------------- Load Customers-----------------------------------
    @Effect() loadCustomers$ = this._actions.ofType(fromCollection.LOAD_CUSTOMERS_COLLECTION)
        .pipe(
            map((action: fromCollection.LoadCustomersForCollectionAction) => action.payload),
            switchMap((data) => this._sharedApiService.getSessionId().map(sessionId => {
                data.sessionId = <string>sessionId;
                return data;
            }) ),
            switchMap(
                (data) => this._soService.getCutomersLocationWise(data)
                    .pipe(
                        map((customers) => new fromCollection.LoadCustomersForCollectionSuccessAction(customers)),
                        catchError((e) => Observable.of(new fromCollection.LoadCustomersForCollectionFailAction(e)))
                    )
            )
        );

    //------------------------ load Locations As Per Role----------------------------------------
    @Effect() locationLoaded$ = this._actions.ofType(fromCollection.ADD_COLLECTION_LOCATION_OF_EMPLOYEE_AS_PER_ROLE)
        .pipe(
            map((action: fromCollection.AddLocationOfEmployeeAsPerRoleCollectionAction) => action.payload),
            switchMap(
                (data) => this._soService.getCutomersLocationWise(data)
                    .pipe(
                        map((customers) => new fromCollection.LoadCustomersForCollectionSuccessAction(customers)),
                        catchError((e) => Observable.of(new fromCollection.LoadCustomersForCollectionFailAction(e)))
                    )
            )
        )

    //---------------------- Load Colection Customers-----------------------------------
    @Effect() loadLoggedEmployeeLocationCollection$ = this._actions.ofType(fromCollection.LOAD_LOGGED_EMPLOYEE_LOCATION_COLLECTION)
        .pipe(
            map((action: fromCollection.LoadLoggedEmployeeLocationCollectionAction) => action.payload),
            switchMap((data) => this._soService.getLocationDetailOfLoggedEmp()
                .pipe(
                    map((data) => new fromCollection.LoadLoggedEmployeeLocationCollectionSuccessAction(data)),
                    catchError((e) => Observable.of(new fromCollection.LoadLoggedEmployeeLocationCollectionFailAction(e)))
                )
            )
        );
    
    //--------------------------Load CustomerList With Pagination and Async--------------------------------------
    @Effect() loadCustomerListAsync$ = this._actions.ofType(fromCollection.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_COLLECTION)
        .pipe(
            map((action: fromCollection.LoadCustomersListWithInfinityCollectionScrollAction) => action.payload),
            switchMap((data) => this._soService.getCustomerListWithPagination(data)
                .pipe(
                    map((result) => new fromCollection.LoadCustomersListWithInfinityCollectionScrollSuccessAction(result)),
                    catchError((e) => Observable.of(new fromCollection.LoadCustomersListWithInfinityCollectionScrollFailAction(e)))
                )
            )
        );

}
