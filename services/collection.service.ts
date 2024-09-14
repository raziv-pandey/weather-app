import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppSettingsModel } from '../../shared/facades/app-settings';
import { ICustomerDetailRequest, ISaveCollectionRequest } from '../models/collection.interface';


@Injectable()
export class CollectionService {
  baseUrl: string;
  deviceId: string;
  constructor(public http: HttpClient, private appSettings: AppSettingsModel) {
    appSettings.getBaseUrl().subscribe((url)=>this.baseUrl = url);
    appSettings.getDeviceId().subscribe((id)=>this.deviceId = id);
  }

  
  
  getCustomerDetail(request: ICustomerDetailRequest){
     return this.http.post<any>(this.baseUrl + 'mobileCollectionEntryController/callProcGlobalMobSalesGetCustDetails.srvc',{},{
        params : new HttpParams().set('customerCode',request.customerCode)
                    .append('locationCode',request.locationCode)
                    .append('deviceId',this.deviceId)
                    .append('glCode',request.glCode)
                    .append('slCode',request.slCode)
     });
  }
  
  getInvoices(request: ICustomerDetailRequest){
     return this.http.post<any>(this.baseUrl + 'mobileCollectionEntryController/callProcGlobalMobSalesInvPend2Adj.srvc',{},{
        params : new HttpParams().set('customerCode',request.customerCode)
                    .append('locationCode',request.locationCode)
                    .append('deviceId',this.deviceId)
     });
  }

  getPaymentTypes(){
     return this.http.post<any>(this.baseUrl + 'mobileCollectionEntryController/getPaymentTypeInfo.srvc',{});
  }
  
  savePayments(request:ISaveCollectionRequest){
    return this.http.post<any>(this.baseUrl + 'mobileCollectionEntryController/savePdcEntry.srvc',{},{
      params : new HttpParams().set('globalMobPdcHdr',JSON.stringify(request.globalMobPdcHdr))
                  .append('globalMobSalesPdcDtl',JSON.stringify(request.globalMobSalesPdcDtl))
                  .append('deviceId',this.deviceId)
   });
  }

  /**    Upadted By : Pravin B       Date : 03/08/2018    
    *     Description : Added For Partial Collection Functionality Bug No 13749
  */

 savePartialCollection(request:ISaveCollectionRequest){
  return this.http.post<any>(this.baseUrl + 'mobileCollectionEntryController/savePdcEntryHeader.srvc',{},{
    params : new HttpParams().set('globalMobPdcHdr',JSON.stringify(request.globalMobPdcHdr))
                             .append('deviceId',this.deviceId)
 });
 
}
  
}
