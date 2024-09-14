import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
//import { of } from 'rxjs/Observable/of';
import 'rxjs/add/observable/throw';

import * as fromSO from '../actions/so.actions';
import { SOService } from '../../services/so.service';
import { IEmplolyeeLocation } from '../../models/so.interface';
import { LOAD_UOM_CONVERSION_FACTOR, ADD_FILE_DOCUMENT, DeleteFileDocumentAction, LOAD_SESSION_FOR_FILES } from '../actions/so.actions';
import { SharedApiService } from '../../../shared/services/shared-api.service';

@Injectable()
export class SOEffects {
  constructor(
    private _actions: Actions,
    private _soService: SOService,
    private _sharedApiService: SharedApiService
  ) { }
 
 //---------------------- Load Customers-----------------------------------
 @Effect() loadCustomers$ = this._actions.ofType(fromSO.LOAD_CUSTOMERS)
    .pipe(
            map((action: fromSO.LoadCustomersAction) => action.payload),
            switchMap((data) => this._sharedApiService.getSessionId().map(sessionId => {
                data.sessionId = <string>sessionId;
                return data;
            }) ),
            switchMap((data) => this._soService.getCutomersLocationWise(data)
                .pipe(
                    map((data) =>  new fromSO.LoadCustomersSuccessAction(data)),
                    catchError((e) => Observable.of( new fromSO.LoadCustomersFailAction(e)))
                )
            )
    );

//------------------------ load Locations As Per Role----------------------------------------
 @Effect() locationLoaded$ = this._actions.ofType(fromSO.ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE)
    .pipe(
        map((action: fromSO.AddLocationOfEmployeeAsPerRoleAction) => action.payload),
        switchMap((data) => this._soService.getLocationDetailOfLoggedEmp()
            .pipe(
                map((data) =>  new fromSO.AddLocationOfEmployeeAsPerRoleSuccessAction(data)),
                catchError((e) => Observable.of( new fromSO.AddLocationOfEmployeeAsPerRoleFailAction(e)))
            )   
        )
    )

//--------------------------Load CustomerList With Pagibation and Async--------------------------------------
@Effect() loadCustomerListAsync$ = this._actions.ofType(fromSO.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL)
.pipe(
        map((action: fromSO.LoadCustomersListWithInfinityScrollAction) => action.payload),
        switchMap((data) => this._soService.getCustomerListWithPagination(data)
            .pipe(
                map((result) => new fromSO.LoadCustomersListWithInfinityScrollSuccessAction(result)),
                catchError((e) => Observable.of( new fromSO.LoadCustomersListWithInfinityScrollFailAction(e)))
            )
        )
);    
 
 //--------------------------- Load Locations-----------------------------------------------   
 @Effect() loadLocations$ = this._actions.ofType(fromSO.LOAD_LOCATIONS)
    .pipe(
        map((action: fromSO.LoadLocationsAction) => action.payload),
        switchMap(
            (moduleId) => this._soService.getLocationsModuleWise(moduleId)
            .pipe(
                map((locations) => new fromSO.LoadLocationsSuccessAction(locations) ),
                catchError((e) => Observable.of( new fromSO.LoadLocationsFailAction(e)))
            )
        )
    )
 
 //----------------------- Load Ecodes--------------------------------------------
 @Effect() loadEcodes$ = this._actions.ofType(fromSO.LOAD_EPPS_CODES)
    .pipe(
        map((action: fromSO.LoadEppsCodesAction) => action.payload),
        switchMap(
            (data) => this._soService.getEppsCodes(data)
            .pipe(
                map((eppsCodes) => new fromSO.LoadEppsCodesSuccessAction(eppsCodes) ),
                catchError((e) => Observable.of( new fromSO.LoadEppsCodesFailAction(e)))
            )
        )
    )

 //------------------------------Load Products--------------------------------------
 @Effect() loadProducts$ = this._actions.ofType(fromSO.LOAD_PRODUCT_LIST)
    .pipe(
        map((action: fromSO.LoadProductListAction) => action.payload),
        switchMap(
            (data) => this._soService.getProductList(data)
            .pipe(
                map((products) => new fromSO.LoadProductListSuccessAction(products) ),
                catchError((e) => Observable.of( new fromSO.LoadProductListFailAction(e)))
            )
        )
    )

 //-----------------------------Load UOM of Products--------------------------
 @Effect() loadUOMProduct$ = this._actions.ofType(fromSO.LOAD_UOM_LIST)
    .pipe(
        map((action: fromSO.LoadUomListAction) => action.payload),
        switchMap(
            (data) => this._soService.getUOMForProduct(data)
            .pipe(
                map((uoms) => new fromSO.LoadUomListSuccessAction(uoms) ),
                catchError((e) => Observable.of( new fromSO.LoadUomListFailAction(e)))
            )
        )
    )

 //-------------------------- Load Available Stock---------------------------------
 @Effect() loadAvailableStock$ = this._actions.ofType(fromSO.LOAD_AVAILABLE_STOCK)
    .pipe(
        map((action: fromSO.LoadAvailableStockAction) => action.payload),
        switchMap(
            (data) => this._soService.getAvailbleStock(data)
            .pipe(
                map((stock) => new fromSO.LoadAvailableStockSuccessAction(stock) ),
                catchError((e) => Observable.of( new fromSO.LoadAvailableStockFailAction(e)))
            )
        )
    )

 //--------------------------Load Previous Order-----------------------------------
 @Effect() loadCustomerPreviousOrders$ = this._actions.ofType(fromSO.LOAD_CUSTOMER_PREVIOUS_ORDERS)
    .pipe(
        map((action: fromSO.LoadCustomerPreviousOrdersAction) => action.payload),
        switchMap(
            (data) => this._soService.getCustomerPreviousOrders(data)
            .pipe(
                map((orders) => new fromSO.LoadCustomerPreviousOrdersSuccessAction(orders) ),
                catchError((e) => Observable.of( new fromSO.LoadCustomerPreviousOrdersFailAction(e)))
            )
        )
    )

 //----------------------------Load Customer Cart Details------------------------------
 @Effect() loadCustomerCartDetails$ = this._actions.ofType(fromSO.LOAD_CUSTOMER_WISE_CART_DETAILS)
    .pipe(
        map((action: fromSO.LoadCustomerWiseCartDetailsAction) => action.payload),
        switchMap(
            (data) => this._soService.getCustomerCartDetails(data)
            .pipe(
                map((productList) => new fromSO.LoadCustomerWiseCartDetailsSuccessAction(productList) ),
                catchError((e) => Observable.of( new fromSO.LoadCustomerWiseCartDetailsFailAction(e)))
            )
        )
    )

 //--------------------------Load Sales Order Linking------------------------------------
 @Effect() loadSalesOrderLinking$ = this._actions.ofType(fromSO.LOAD_SALES_ORDER_LINKINGS)
    .pipe(
        map((action: fromSO.LoadSalesOrderLinkingsAction) => action.payload),
        switchMap(
            (data) => this._soService.getSalesOrderLinking(data)
            .pipe(
                map((linkings) => new fromSO.LoadSalesOrderLinkingsSuccessAction(linkings) ),
                catchError((e) => Observable.of( new fromSO.LoadSalesOrderLinkingsFailAction(e)))
            )
        )
    )

 //------------------------Load Product Price-------------------------------------------
 @Effect() loadProductPrice$ = this._actions.ofType(fromSO.LOAD_PRICE)
    .pipe(
        map((action: fromSO.LoadPriceAction) => action.payload),
        switchMap(
            (data) => this._soService.getProductPrice(data)
            .pipe(
                map((price) => new fromSO.LoadPriceSuccessAction(price) ),
                catchError((e) => Observable.of( new fromSO.LoadPriceFailAction(e)))
            )
        )
    )

 //-------------------------Load UOM Converstion Factor-------------------------------------
 @Effect() loadConversionFactor$ = this._actions.ofType(fromSO.LOAD_UOM_CONVERSION_FACTOR)
    .pipe(
        map((action: fromSO.LoadUOMConversionFactorAction) => action.payload),
        switchMap(
            (data) => this._soService.getUOMConversionFactor(data)
            .pipe(
                map((factor) => new fromSO.LoadUOMConversionFactorSuccessAction(factor) ),
                catchError((e) => Observable.of( new fromSO.LoadUOMConversionFactorFailAction(e)))
            )
        )
    )

 //-----------------------------Add to Cart----------------------------------------
 @Effect() addToCart$ = this._actions.ofType(fromSO.ADD_TO_CART)
    .pipe(
        map((action: fromSO.AddToCartAction) => action.payload),
        switchMap(
            (data) => this._soService.saveCart(data)
            .pipe(
                map((result) => new fromSO.AddToCartSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.AddToCartFailAction(e)))
            )
        )
    )

 //-----------------------------Update Cart----------------------------------
 @Effect() updateCart$ = this._actions.ofType(fromSO.UPDATE_CART)
    .pipe(
        map((action: fromSO.UpdateCartAction) => action.payload),
        switchMap(
            (data) => this._soService.updateCart(data)
            .pipe(
                map((result) => new fromSO.UpdateCartSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.UpdateCartFailAction(e)))
            )
        )
    )

 //----------------------------Delete Product from Cart----------------------
 @Effect() deleteProduct$ = this._actions.ofType(fromSO.DELETE_PRODUCT)
    .pipe(
        map((action: fromSO.DeleteProductAction) => action.payload),
        switchMap(
            (data) => this._soService.deleteProduct(data)
            .pipe(
                map((result) => new fromSO.DeleteProductSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.DeleteProductFailAction(e)))
            )
        )
    )

 //----------------------------Load Taxes----------------------------------------
 @Effect() loadTaxes$ = this._actions.ofType(fromSO.LOAD_TAXES)
    .pipe(
        map((action: fromSO.LoadTaxesAction) => action.payload),
        switchMap(
            (data) => this._soService.getTaxes(data)
            .pipe(
                map((result) => new fromSO.LoadTaxesSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.LoadTaxesFailAction(e)))
            )
        )
    )

 //-----------------------------Load Item Wise Taxes-----------------------------------
 @Effect() loadItemWiseTaxes$ = this._actions.ofType(fromSO.LOAD_ITEM_WISE_TAXES)
    .pipe(
        map((action: fromSO.LoadItemWiseTaxesAction) => action.payload),
        switchMap(
            (data) => this._soService.getItemWiseTaxes(data)
            .pipe(
                map((result) => new fromSO.LoadItemWiseTaxesSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.LoadItemWiseTaxesFailAction(e)))
            )
        )
    )

 //-------------------------Check Credit Limit------------------------------------------
 @Effect() checkCredit$ = this._actions.ofType(fromSO.CHECK_CREDIT_CONTROL)
    .pipe(
        map((action: fromSO.CheckCreditControlAction) => action.payload),
        switchMap(
            (data) => this._soService.checkCreditControl(data)
            .pipe(
                map((result) => new fromSO.CheckCreditControlSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.CheckCreditControlFailAction(e)))
            )
        )
    )

 //------------------------Save Sales Order------------------------------------------
 @Effect() saveOrder$ = this._actions.ofType(fromSO.SAVE_SALES_ORDER)
    .pipe(
            map((action: fromSO.SaveSalesOrderAction) => action.payload),
            switchMap((data) => this._soService.saveOrder(data)
                .pipe(
                    map((result) => new fromSO.SaveSalesOrderSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.SaveSalesOrderFailAction(e)))
                )
            )
    );

 //-----------------------Load Profile Pic on Menu--------------------------------------
 @Effect() LoadCustomerImages$ = this._actions.ofType(fromSO.LOAD_FILE_DOCUMENTS)
    .pipe(
            map((action: fromSO.LoadFileDocumentsAction) => action.payload),
            switchMap((customerId) => this._soService.loadFileDocuments(customerId)
                .pipe(
                    map((result) => new fromSO.LoadFileDocumentsSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.LoadFileDocumentsFailAction(e)))
                )
            )
    );

 //-------------------- Add Files(File Upload)-----------------------------------------
 @Effect() addFile$ = this._actions.ofType(fromSO.ADD_FILE_DOCUMENT)
    .pipe(
            map((action: fromSO.AddFileDocumentAction) => action.payload),
            switchMap((request) => this._soService.uploadFileOnServer(request)
                .pipe(
                    map((result) => new fromSO.AddFileDocumentSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.AddFileDocumentFailAction(e)))
                )
            )
    );

 //--------------------------Delete uploaded File--------------------------------------
 @Effect() deleteFile$ = this._actions.ofType(fromSO.DELETE_FILE_DOCUMENT)
    .pipe(
            map((action: fromSO.DeleteFileDocumentAction) => action.payload),
            switchMap((request) => this._soService.deleteCustomerDocument(request)
                .pipe(
                    map((result) => new fromSO.DeleteFileDocumentSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.DeleteFileDocumentFailAction(e)))
                )
            )
    );

 //---------------------------Save Upload Files-----------------------------
 @Effect() saveFiles$ = this._actions.ofType(fromSO.SAVE_FILE_DOCUMENT)
    .pipe(
            map((action: fromSO.SaveFileDocumentAction) => action.payload),
            switchMap((request) => this._soService.saveFiles(request)
                .pipe(
                    map((result) => new fromSO.SaveFileDocumentSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.SaveFileDocumentFailAction(e)))
                )
            )
    );

 //----------------Load Session Id for Xn. Save As a Draft-----------------------------
 @Effect() loadSessionIdForFiles$ = this._actions.ofType(fromSO.LOAD_SESSION_FOR_FILES)
    .pipe(
            map((action: fromSO.LoadSessionForFilesAction) => action.payload),
            switchMap((request) => this._sharedApiService.getSessionId()
                .pipe(
                    map((result) => new fromSO.LoadSessionForFilesSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.LoadSessionForFilesFailAction(e)))
                )
            )
    );

 //----------------Check financial Year-----------------------------
 @Effect() checkFinancialYear$ = this._actions.ofType(fromSO.CHECK_VALID_FINANCIAL_YEAR)
    .pipe(
            map((action: fromSO.CheckValidFinancialYearAction) => action.payload),
            switchMap((request) => this._soService.checkValidFinancialYear(request)
                .pipe(
                    map((result) => new fromSO.CheckValidFinancialYearSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.CheckValidFinancialYearFailAction(e)))
                )
            )
    );

 //----------------Load PriceBook Header-----------------------------
 @Effect() loadPriceBookHeaderData$ = this._actions.ofType(fromSO.LOAD_PRICE_BOOK_HEADER)
    .pipe(
            map((action: fromSO.LoadPriceBookHeaderAction) => action.payload),
            switchMap((request) => this._soService.getPriceBookHeaderData(request)
                .pipe(
                    map((result) => new fromSO.LoadPriceBookHeaderSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.LoadPriceBookHeaderFailAction(e)))
                )
            )
    );

 //----------------Load DM Details-----------------------------
 @Effect() loadDmDetails$ = this._actions.ofType(fromSO.LOAD_DM_DETAILS)
    .pipe(
            map((action: fromSO.LoadDmDetailsAction) => action.payload),
            switchMap((request) => this._soService.getDmDetails(request)
                .pipe(
                    map((result) => new fromSO.LoadDmDetailsSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.LoadDmDetailsFailAction(e)))
                )
            )
    );  

// //----------------Load GL SL Code Adv ----------------------------
//  @Effect() loadGlSlCodeAdv$ = this._actions.ofType(fromSO.LOAD_GL_SL_CODE_ADV)
//     .pipe(
//             map((action: fromSO.LoadGlSlCodeAction) => action.payload),
//             switchMap(() => this._soService.getGlSlCodeAdv()
//                 .pipe(
//                     map((result) => new fromSO.LoadGlSlCodeSuccessAction(result)),
//                     catchError((e) => Observable.of( new fromSO.LoadGlSlCodeFailAction(e)))
//                 )
//             )
//     ); 

//----------------Load FA Auto Adv ----------------------------
 @Effect() loadFaAutoAdv$ = this._actions.ofType(fromSO.LOAD_FA_AUTO_ADV)
    .pipe(
            map((action: fromSO.LoadFaAutoAdvAction) => action.payload),
            switchMap((request) => this._soService.getFaAutoAdv(request)
                .pipe(
                    map((result) => new fromSO.LoadFaAutoAdvSuccessAction(result)),
                    catchError((e) => Observable.of( new fromSO.LoadFaAutoAdvFailAction(e)))
                )
            )
    );   
    
//----------------------------Load Customer Cart Item Counts------------------------------
@Effect() loadCustomerCartItemCount$ = this._actions.ofType(fromSO.LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT)
.pipe(
    map((action: fromSO.LoadCustomerWiseCartItemsCountAction) => action.payload),
    switchMap(
        (data) => this._soService.getCustomerCartItemsCount(data)
        .pipe(
            map((totalItemsCount) => new fromSO.LoadCustomerWiseCartItemsCountSuccessAction(totalItemsCount) ),
            catchError((e) => Observable.of( new fromSO.LoadCustomerWiseCartItemsCountFailAction(e)))
        )
    )
)

//------------------------Load Discount Matrix Details-------------------------------------------
@Effect() loadDiscountMatrix$ = this._actions.ofType(fromSO.LOAD_MANUAL_DISCOUNT_MATRIX)
.pipe(
    map((action: fromSO.LoadManualDiscountMatrixDetailsAction) => action.payload),
    switchMap(
        (data) => this._soService.getDiscountMatrixDetails(data)
        .pipe(
            map((price) => new fromSO.LoadManualDiscountMatrixDetailsSuccessAction(price) ),
            catchError((e) => Observable.of( new fromSO.LoadManualDiscountMatrixDetailsFailAction(e)))
        )
    )
)

 //-------------------------Check Credit Limit Before SO------------------------------------------
 @Effect() checkCreditBeforeSO$ = this._actions.ofType(fromSO.CHECK_CREDIT_CONTROL_BEFORE_SO)
    .pipe(
        map((action: fromSO.CheckCreditControlBeforSOAction) => action.payload),
        switchMap(
            (data) => this._soService.checkCreditControl(data)
            .pipe(
                map((result) => new fromSO.CheckCreditControlBeforSOSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.CheckCreditControlBeforSOFailAction(e)))
            )
        )
    )

    @Effect() customerOutStandingAmt$ = this._actions.ofType(fromSO.CUST_OUTSTAND_AMT)
    .pipe(
        map((action: fromSO.LoadCustOutStandingAmountAction) => action.payload),
        switchMap(
            (data) => this._soService.getCustomerOSAmountDetails(data)
            .pipe(
                map((result) => new fromSO.LoadCustOutStandingAmountSuccessAction(result) ),
                catchError((e) => Observable.of( new fromSO.LoadCustOutStandingAmountFailAction(e)))
            )
        )
    )

    //--------------------------Delete uploaded File Customer Wise--------------------------------------
 @Effect() deleteCustomerWiseFile$ = this._actions.ofType(fromSO.DELETE_IMAGE_STORAGE)
 .pipe(
         map((action: fromSO.DeleteImgStorageAction) => action.payload),
         switchMap((request) => this._soService.deleteFileDoucment(request)
             .pipe(
                 map((result) => new fromSO.DeleteImgStorageSuccessAction(result)),
                 catchError((e) => Observable.of( new fromSO.DeleteImgStorageFailAction(e)))
             )
         )
 );


}
