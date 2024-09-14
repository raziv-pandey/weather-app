import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { of } from 'rxjs/Observable/of';
import { Observable } from 'rxjs/Observable';

import { AppSettingsModel } from '../../shared/facades/app-settings';
import { ISdmsReportRequest, ISoStatusReportRequest, ICustomerSOStatusReportRequest, ISoStatusReportDetailsRequest, IStockProductsRequest, IStockReportRequest } from '../models/sdms-report.interface';
import { ICustomer } from '../../shared/models/customer.interface';
import { ISubGroupCode, ISubSubGroupCode, IGroupCode, IBrandNameData } from '../../mis/models/group-code.interface';
import { switchMap, map ,delay} from 'rxjs/operators';
import { IProduct } from '../models/so.interface';

@Injectable()
export class SdmsReportService {
     baseUrl: string;
     deviceId: string;
     constructor(public http: HttpClient, private appSettings: AppSettingsModel) {
          appSettings.getBaseUrl().subscribe((url)=>this.baseUrl = url);
          appSettings.getDeviceId().subscribe((id)=>this.deviceId = id);
     }

     //-----------------Customerwise Report-----------------------------------
     getCustomerWiseReport(data :ISdmsReportRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/getDataForSales4SalesReport.srvc',{},{
               params : new HttpParams().set('dateData',JSON.stringify(data.dateData))
               .append('customerCode',data.customerCode)
               .append('locationCode',data.locationCode)
               .append('deviceId',this.deviceId)
          });
     }

     //----------------------Collection Report---------------------------------------
     getCollectionReport(data :ISdmsReportRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/getDataForSales4collectionReport.srvc',{},{
               params : new HttpParams().set('dateData',JSON.stringify(data.dateData))
               .append('customerCode',data.customerCode)
               .append('locationCode',data.locationCode)
               .append('deviceId',this.deviceId)
          });
     }

     //----------------------Collection Details Report(On Popup)---------------------------------------
     getCollectionDetails(data :ISdmsReportRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/getCollectionDetailsDrillDownReport.srvc',{},{
               params : new HttpParams().set('dateData',JSON.stringify(data.dateData))
               .append('customerCode',data.customerCode)
               .append('locationCode',data.locationCode)
               .append('deviceId',this.deviceId)
               .append('sessionId',data.sessionId)
          });
     }

     //----------Get Customer in So Status Report------------------------

     getCustomersSoStatusReport(request: ICustomerSOStatusReportRequest){
         return this.http.get<any>(this.baseUrl + 'dropDownController/getPartyForExcelSoStatusReports.do',{
         params : new HttpParams().set('locationCode',request.locationCode)
                  .append('eCode',request.eCode)
                  .append('isFromMobile',request.isFromMobile)
      });
     }

     //------------------SO Status Report-------------------------------
     getSoStatusReport(data :ISoStatusReportRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/getSoStatusHdrDetails.srvc',{},{
               params : new HttpParams().set('dateData',JSON.stringify(data.dateData))
               .append('locationCode',data.locationCode)
               .append('soTypes', data.soTypes)
               .append('customerCode',data.customerCode)
               .append('deviceId',this.deviceId)
          });
     }
     //------------------SO Status Details Report-------------------------------
     getSoStatusReportDetails(data :ISoStatusReportDetailsRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/getSoStatusDtlDetails.srvc',{},{
               params : new HttpParams().set('soHdrSrNo',data.SoHdrSrNo)
               .append('deviceId',this.deviceId)
               .append('sessionId',data.sessionId)
          });
     }
     //------------------Get Product in Stock Report-------------------------------
      getStockProducts(data :IStockProductsRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/callForItemsListForStockReport.srvc',{},{
               params : new HttpParams().set('locationCode',data.locationCode)  
               .append('tranIndType',data.tranInd)           
               .append('deviceId',this.deviceId)

          }).pipe(
               switchMap((response:IProduct) => {
                    //response.sessionId
               if(response!=undefined){
                    let request:IStockProductsRequest={
                         groupCode:data.groupCode,
                         subGroupCode: data.subGroupCode,
                         subSubGroupCode : data.subSubGroupCode,
                         sessionId:  response.sessionId,
                         deviceId : data.deviceId,
                         locationCode:data.locationCode
                     }
                        return this.getStockProductsList(request)
               }
                
                 }),
               );
      }

     getStockProductsList(data :IStockProductsRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/getItemListForStockReport.srvc',{},{
               params : new HttpParams().set('groupCode',data.groupCode!=undefined?data.groupCode:'') 
               .append('locationCodes',data.locationCode) 
               .append('subGroupCode',data.subGroupCode!=undefined?data.subGroupCode:'')   
               .append('subSubGroupCode',data.subSubGroupCode!=undefined?data.subSubGroupCode:'')        
               .append('deviceId',this.deviceId)
          });
          // .map(response=>{
          //      if(response && response.length){
          //           response[0].sessionId=data.sessionId;
          //           return response;
          //      }
              
          // });
     }

     //------------------Stock Report-------------------------------
     getStockReport(data :IStockReportRequest){
          return this.http.post<any>(this.baseUrl + 'mobileReportController/getItemStockForReport.srvc',{},{
               params : new HttpParams().set('itemCode',data.ItemCode)
               .append('transactionFlag',data.transactionFlag)
               .append('locationCode',data.locationCode)
               .append('deviceId',this.deviceId)
               .append('sessionId',data.sessionId)
          });
     }

     getCustomers(){
        return this.http.post<Array<ICustomer>>(this.baseUrl + 'mobileReportController/getCustomersForCustWiseSales.do',{})
          .map((data:any) => data.rows);
      }

           //------------------Get Group Codes in Stock Report-------------------------------
     getStockGroupCodes(){
          return this.http.post<Array<IGroupCode>>(this.baseUrl + 'comboGridController/getItemGroupsForStockReport.do',{});
     }
     
     getStockSubGroupCodes(groupCode) {
         return this.http.post<Array<ISubGroupCode>>(this.baseUrl + 'comboGridController/getSubGroupCodes.do',{},{
          params : new HttpParams().set('groupCode',groupCode)
      });
     }

     //------------------Get Sub Sub Group Codes in Stock Report-------------------------------   
     getStockSubSubGroupCodes(groupCode,subGroupCode){
          return this.http.post<Array<ISubSubGroupCode>>(this.baseUrl + 'comboGridController/getSubSubGroupCodes.do',{},{
             params : new HttpParams().set('groupCode',groupCode).append('subGroupCode',subGroupCode)
         });
       }
  
     //------------------Get Display Name in Stock Report-------------------------------   
     getStockBrandDisplayNames() {
          return this.http.post<Array<IBrandNameData>>(this.baseUrl + 'mmsItemMasterController/getBrandNameListForItemMaster.do',{});

     }

}
