import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators';
//import { of } from 'rxjs/Observable/of';
import 'rxjs/add/observable/throw';

import * as fromSdmsReport from '../actions/sdms-report.actions';
import { SdmsReportService } from '../../services/sdms-report.service';
import { SharedApiService } from '../../../shared/services/shared-api.service';
import { IBrandNameData } from '../../../mis/models/group-code.interface';

@Injectable()
export class SdmsReportEffects {
     constructor(
          private _actions: Actions,
          private _sdmsReportService: SdmsReportService,
          private _sharedApiService: SharedApiService
          ) { }

     //-----------------------Customerwise Report-----------------------------------
     @Effect() loadCustomerWiseReport$ = this._actions.ofType(fromSdmsReport.LOAD_CUSTOMER_WISE_REPORT)
     .pipe(
          map((action: fromSdmsReport.LoadCustomerWiseReportAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getCustomerWiseReport(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadCustomerWiseReportSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadCustomerWiseReportFailAction(e)))
                    )
               )
          );

     //-------------------------Collection Report------------------------------------
     @Effect() loadCollectionReport$ = this._actions.ofType(fromSdmsReport.LOAD_COLLECTION_REPORT)
     .pipe(
          map((action: fromSdmsReport.LoadCollectionReportAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getCollectionReport(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadCollectionReportSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadCollectionReportFailAction(e)))
                    )
               )
          );

     //--------------------------Collection Details Report---------------------------
     @Effect() loadCollectionDetails$ = this._actions.ofType(fromSdmsReport.LOAD_COLLECTION_DETAILS)
     .pipe(
          map((action: fromSdmsReport.LoadCollectionDetailsAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getCollectionDetails(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadCollectionDetailsSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadCollectionDetailsFailAction(e)))
                    )
               )
          );

     //-------------Get Customers in So Status Report on Location Select-------------
      @Effect() loadCustomersSoStatusReport$ = this._actions.ofType(fromSdmsReport.LOAD_CUSTOMERS_SO_STATUS_REPORT)
     .pipe(
          map((action: fromSdmsReport.LoadCustomersSoStatusReportAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getCustomersSoStatusReport(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadCustomersSoStatusReportSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadCustomersSoStatusReportFailAction(e)))
                    )
               )
          );


     //------------------SO Status Report-------------------------------
     @Effect() loadSoStatusReport$ = this._actions.ofType(fromSdmsReport.LOAD_SO_STATUS_REPORT)
     .pipe(
          map((action: fromSdmsReport.LoadSoStatusReportAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getSoStatusReport(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadSoStatusReportSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadSoStatusReportFailAction(e)))
                    )
               )
          );

     //------------------SO Status Details Report-------------------------------
     @Effect() loadSoStatusReportDetails$ = this._actions.ofType(fromSdmsReport.LOAD_SO_STATUS_REPORT_DETAILS)
     .pipe(
          map((action: fromSdmsReport.LoadSoStatusReportDetailsAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getSoStatusReportDetails(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadSoStatusReportDetailsSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadSoStatusReportDetailsFailAction(e)))
                    )
               )
          );   

     //------------------Get Product in Stock Report-------------------------------
     @Effect() loadStockProducts$ = this._actions.ofType(fromSdmsReport.LOAD_STOCK_PRODUCTS)
     .pipe(
          map((action: fromSdmsReport.LoadStockProductsAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getStockProducts(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadStockProductsSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadStockProductsFailAction(e)))
                    )
               )
          );     
     
     //------------------Get Product in Stock Report-------------------------------
     @Effect() loadStockProductsWithFilter$ = this._actions.ofType(fromSdmsReport.LOAD_STOCK_PRODUCTS_FILTER)
     .pipe(
          map((action: fromSdmsReport.LoadStockProductsFilterAction) => action.payload),
          switchMap((data) => this._sdmsReportService.getStockProductsList(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadStockProductsFilterSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadStockProductsFilterFailAction(e)))
                    )
               )
          );  

      //------------------Stock Report-------------------------------
     @Effect() loadStockReport$ = this._actions.ofType(fromSdmsReport.LOAD_STOCK_REPORT)
     .pipe(
          map((action: fromSdmsReport.LoadStockReportAction) => action.payload),
          switchMap((data) => this._sharedApiService.getSessionId().map(sessionId => {
               data.sessionId = <string>sessionId;
               return data;
          }) ),
          switchMap((data) => this._sdmsReportService.getStockReport(data)
               .pipe(
                    map((result) => new fromSdmsReport.LoadStockReportSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadStockReportFailAction(e)))
                    )
               )
          );  
        
     //------------------Customers For Customer Wise Sales Report-------------------------------     
    @Effect() loadCustomers$ = this._actions.ofType(fromSdmsReport.LOAD_CUST_WISE_CUSTOMERS)
          .pipe(
                  switchMap(() => this._sdmsReportService.getCustomers()
                      .pipe(
                          map((customers) => new fromSdmsReport.LoadCustomersCustWiseSalesSuccessAction(customers) ),
                          catchError((e) => Observable.of( new fromSdmsReport.LoadCustomersCustWiseSalesFailAction(e)))
                      )
                  )
          );

     //------------------Get Group Codes in Stock Report-------------------------------
     @Effect() loadStockGroupCodes$ = this._actions.ofType(fromSdmsReport.LOAD_STOCK_GROUP_CODES)
     .pipe(
          map((action: fromSdmsReport.LoadStockGroupCodesAction) => action.payload),
          switchMap(() => this._sdmsReportService.getStockGroupCodes()
               .pipe(
                    map((result) => new fromSdmsReport.LoadStockGroupCodesSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadStockGroupCodesFailAction(e)))
                    )
               )
          );     
          
  //------------------Get Sub Group Codes in Stock Report-------------------------------
  @Effect() loadStockSubGroupCodes$ = this._actions.ofType(fromSdmsReport.LOAD_STOCK_SUB_GROUP_CODES)
  .pipe(
       map((action: fromSdmsReport.LoadStockSubGroupCodesAction) => action.payload),
       switchMap((groupCode) => this._sdmsReportService.getStockSubGroupCodes(groupCode)
            .pipe(
                 map((subGroupCodes) => new fromSdmsReport.LoadStockSubGroupCodesSuccessAction(subGroupCodes) ),
                 catchError((e) => Observable.of( new fromSdmsReport.LoadStockSubGroupCodesFailAction(e)))
                 )
            )
       );    
      
  //------------------Get Sub Sub Group Codes in Stock Report-------------------------------
  @Effect() loadStockSubSubGroupCodes$ = this._actions.ofType(fromSdmsReport.LOAD_STOCK_SUB_SUB_GROUP_CODES)
  .pipe(
       map((action: fromSdmsReport.LoadStockSubSubGroupCodesAction) => action.payload),
       switchMap((groupCodes) => this._sdmsReportService.getStockSubSubGroupCodes(groupCodes.groupCode,groupCodes.subGroupCode)
            .pipe(
                 map((subSubGroupCodes) => new fromSdmsReport.LoadStockSubSubGroupCodesSuccessAction(subSubGroupCodes) ),
                 catchError((e) => Observable.of( new fromSdmsReport.LoadStockSubSubGroupCodesFailAction(e)))
                 )
            )
       ); 
       
     //------------------Get Display Names in Stock Report-------------------------------
     @Effect() loadStockBrandDisplayNames$ = this._actions.ofType(fromSdmsReport.LOAD_STOCK_BRAND_DISPLAY_NAMES)
     .pipe(
          map((action: fromSdmsReport.LoadStockBrandDisplayNamesAction) => action.payload),
          switchMap(() => this._sdmsReportService.getStockBrandDisplayNames()
               .pipe(
                    map((result) => new fromSdmsReport.LoadStockBrandDisplayNamesSuccessAction(result) ),
                    catchError((e) => Observable.of( new fromSdmsReport.LoadStockBrandDisplayNamesFailAction(e)))
                    )
               )
          );      
}
