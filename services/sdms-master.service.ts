import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { of } from 'rxjs/Observable/of';
import { Observable } from 'rxjs/Observable';

import { AppSettingsModel } from '../../shared/facades/app-settings';
import { IStatesRequest, IStatesData, ICitiesRequest, ICitiesData, ICustomerSaveRequest } from '../models/sdms-master.interface';
import { switchMap, map, delay } from 'rxjs/operators';

@Injectable()
export class SdmsMasterService {
     baseUrl: string;
     deviceId: string;
     constructor(public http: HttpClient, private appSettings: AppSettingsModel) {
          appSettings.getBaseUrl().subscribe((url)=>this.baseUrl = url);
          appSettings.getDeviceId().subscribe((id)=>this.deviceId = id);
     }

    //--------------------Get Countries--------------------------------
 getCountries(){
     return this.http.post(this.baseUrl + 'comboGridController/getCountries.do',{})
       .map((data:any) => data.rows);
   }
 
   //--------------------Get GSTN ----------------------
   getGstnTypes() {
    // return this.http.post<Array<IGstnTypesData>>(this.baseUrl + 'mobileSalesOrderController/getGstnTypeForMobile.srvc',{})

     return this.http.post(this.baseUrl + 'mobileSdmsCustomerMasterController/getGstnTypeForMobile.srvc',{})
   }
 
  //---------------------Get States----------------------------------------
   getStates(request:IStatesRequest){
     return this.http.post<Array<IStatesData>>(this.baseUrl + 'comboGridController/getStates.do',{},{
         params : new HttpParams().set('countryCode',request.countryCode)
     }).map((data:any) => data.rows);
   }
 
   //--------------------- Get Cities---------------------------------------
   getCities(request:ICitiesRequest){
     return this.http.post<Array<ICitiesData>>(this.baseUrl + 'comboGridController/getCities.do',{},{
         params : new HttpParams().set('countryCode',request.countryCode)
                                  .append('stateCode',request.stateCode)
     }).map((data:any) => data.rows);
   }

   //---------------------Get GL Code--------------------

   getGLNames(){
      let glTypes = "DR,BRANCH_ACCOUNTS";
      return this.http.get<any>(this.baseUrl + 'comboGridController/getGLNames.do',{
        params : new HttpParams().set('glType',glTypes)
      }).map((data:any) => data.rows);
    }
 
   //--------------------------Save Form---------------------
   saveCustomer(request: ICustomerSaveRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSdmsCustomerMasterController/saveCustomerDetailForMobile.srvc',{
      customerName              : request.customerName,
      address1                  : request.address1,
      address2                  : request.address2,
      address3                  : request.address3,
      countryName               : request.countryName,
      pinCode                   : request.pinCode,
      telephoneNo               : request.telephoneNo,
      faxNo                     : request.faxNo,
      customerCode              : request.customerCode,
      activeYn                  : request.activeYn,
      locationCode              : request.locationCode,
      locationDisplayName       : request.locationDisplayName,
      gstStateCode              : request.gstStateCode,
      gstinType                 : request.gstinType,
      gstInNo                   : request.gstInNo,
      gstinStateType            : request.gstinStateType,
      panNo                     : request.panNo,
      customerDisplayName       : request.customerDisplayName,
      customerAddCode           : request.customerAddCode,
      countryCode               : request.countryCode,
      stateCode                 : request.stateCode,
      cityCode                  : request.cityCode,
      contactEmail1             : request.contactEmail1,
      dateOfBirthString         : request.dateOfBirthString,
      glSlMessage               : request.glSlMessage,
      glCode                    : request.glCode,
      slCode                    : request.slCode,
      mobileNo                  : request.mobileNo,
      dob                       : request.dob,
      beatCd                    : request.beatCd,
      routeCd                   : request.routeCd,
      id                        : request.id,
      value                     : request.value,
      creditControlFlag         : request.creditControlFlag,
      deviceId                  : this.deviceId,
      customerType              : request.customerType,
    },
    // {
    //   params : new HttpParams().set('locationCode',request.locationCode)
    // });
     )};

}
