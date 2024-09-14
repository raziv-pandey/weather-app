import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { of } from 'rxjs/Observable/of';
import { Observable } from 'rxjs/Observable';

import { AppSettingsModel } from '../../shared/facades/app-settings';
import { ICustomersRequest, ILicenceTypesRequest, IDeleteActiveLicenceRequest, ILicenceKeysRequest, IActivateLicenceRequest, IGenerateLicenceRequest } from '../models/licence.interface';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class LGService {
  baseUrl: string;
  deviceId: string;
  
  constructor(public http: HttpClient, private appSettings: AppSettingsModel) {
    appSettings.getBaseUrl().subscribe((url)=>this.baseUrl = url);
    appSettings.getDeviceId().subscribe((id)=>this.deviceId = id);
  }



  getLicenceCustomers(request:ICustomersRequest){
     return this.http.post<any>(this.baseUrl + 'mobileLicenceController/getCustomerDetails.srvc',{},{
        params : new HttpParams().set('locationCode',request.locationCode)
                 
    });
  }


  getLicenceTypes(request:ILicenceTypesRequest){
    return this.http.post<any>(this.baseUrl + 'mobileLicenceController/getLicenceTypes.srvc',{},{
       params : new HttpParams().set('locationCode',request.locationCode)
                                .append('subGroupCode',request.subGroupCode)
                
   }).map(data => data.gridRecords);
 }

 
 getLicenceKeys(request:ILicenceKeysRequest){
    return this.http.post<any>(this.baseUrl + 'mobileLicenceController/getItemBatcheDetails.srvc',{},{
       params : new HttpParams().set('locationCode',request.locationCode)
                                .append('itemCode', request.itemCode) 
                                .append('customerCode', request.customerCode)
                                .append('deviceId',this.deviceId )
                
   });
 }
 
 getActivateLicence(request:IActivateLicenceRequest){
   let formData = new FormData();
    formData.append('dtlSrNo',request.dtlSrNo);
    formData.append('locationCode',request.locationCode);
    formData.append('itemCode',request.itemCode);
    formData.append('itemDisplayName',request.itemDisplayName);
    formData.append('itemCostRate',request.itemCostRate);
    formData.append('issueUom',request.issueUom);
    formData.append('batchNo',request.batchNo);
    formData.append('ipBatchNo',request.ipBatchNo);
    formData.append('opBatchNo',request.opBatchNo);
    formData.append('netQtyIssUom',request.netQtyIssUom);
    formData.append('tranIndicator',request.tranIndicator);
    formData.append('tranType',request.tranType);
    formData.append('hsnSacCode',request.hsnSacCode);
    formData.append('suppBatchNo',request.suppBatchNo);
    formData.append('expDateString',request.expDateString);
    
    let headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Content-Type', undefined);

    return this.http.post<any>(this.baseUrl + 'mobileLicenceController/activateLicence.srvc',formData,{
       params : new HttpParams().set('deviceId',this.deviceId)
                                .append('sessionId', request.sessionId)                
   });
 }

 deleteActiveLicence(request: IDeleteActiveLicenceRequest){
    return this.http.post<any>(this.baseUrl + 'mobileLicenceController/deleteLicence.srvc',{},{
      params : new HttpParams().set('licenceKey', request.licenceKey)
                               .append('deviceId',this.deviceId)
                               .append('sessionId', request.sessionId)
      });
  }

  getGenerateLicence(request:IGenerateLicenceRequest){
    return this.http.post<any>(this.baseUrl + 'mobileLicenceController/generateLicence.srvc',{},{
       params : new HttpParams().set('locationCode',request.locationCode)
                                .append('customerCode', request.customerCode)
                                .append('deviceId', this.deviceId)    
                                .append('sessionId', request.sessionId)
                                .append('customerName', request.customerName)
                                .append('locationName', request.locationName)             
   });
 }
}
