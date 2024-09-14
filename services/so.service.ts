import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { of } from 'rxjs/Observable/of';
import { Observable } from 'rxjs/Observable';

import { AppSettingsModel } from '../../shared/facades/app-settings';
import { IECodeRequest, ICustomerDetailsAsyncRequest, IProductListRquest, IEmplolyeeLocation,IPriceBookHeaderDmDetailsRequest ,IAutoAdvanceRequest, IUOMRequest, IPriceRequest, ISOSaveRequest, IConversionFactorRequest, IDeleteProductRequest, ITaxRequest, ICreditCheckRequest, ISaveSORequest, IItemWiseTaxRequest, ISOUpdateRequest, IDocument, IAddFileDocumentRequest, IDeleteFileDocumentRequest, IUploadFileRequest, IFileSrNoUpdateRequest, ICheckFinancialYearRequest,ICustOutAmutRequest } from '../models/so.interface';
import { switchMap, map } from 'rxjs/operators';
import { OrderByPipe } from '../../shared/pipes/order-by.pipe';

@Injectable()
export class SOService {
  baseUrl: string;
  deviceId: string;
  private tempImageData:any;
  private soConfirmStatus;
  constructor(public http: HttpClient, private appSettings: AppSettingsModel,
     private orderBy : OrderByPipe) {
    appSettings.getBaseUrl().subscribe((url)=>this.baseUrl = url);
    appSettings.getDeviceId().subscribe((id)=>this.deviceId = id);
  }

  getLocationDetailOfLoggedEmp(){
     return this.http.get<any>(this.baseUrl + 'account/getRoleLoactionOfEmployee.do');
  }
  

  /* getCutomersLocationWise(request: IEmplolyeeLocation){
     return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCustomerDetails.srvc',{},{
        params : new HttpParams().set('locationCode', request.locationCode)
                    .append('deviceId',this.deviceId)
                    .append('tranInd', request.tranInd)
    });
  } */
  getCutomersLocationWise(request:ICustomerDetailsAsyncRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/callProcMobCustListMobile.srvc',{},{
       params : new HttpParams().set('locationCode',request.locationCode)
                   .append('deviceId',this.deviceId)
                   //.append('tranInd',"SO")
                   .append('tranInd',request.tranInd)
                   .append('sessionId',request.sessionId)
   }).pipe(
     switchMap((data:any) => {
       //this.tempImageData = data;       
      let itemDetailsAsync: ICustomerDetailsAsyncRequest = {
          paginationDetails :request.paginationDetails,
          searchCriteriaDetails  : request.searchCriteriaDetails,
          sessionId : data.value
      }
       return this.getCustomerListWithPagination(itemDetailsAsync)
     }),
   )
 }

 getCustomerListWithPagination(request: ICustomerDetailsAsyncRequest){
  let jsonPaginationArrayData = [];
  
  jsonPaginationArrayData.push(request.paginationDetails);
  
  let jsonSearchArrayData = {
    filters : request.searchCriteriaDetails
  };
 
  return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCustomerDetailsForSalesOrderMobile.srvc',{},{
                  params : new HttpParams() .set('deviceId',this.deviceId)
                  .append('paginationVOStr',JSON.stringify(jsonPaginationArrayData))
                  .append('searchVOStr',JSON.stringify(request.searchCriteriaDetails))
                  .append('sessionId', request.sessionId)
  })
}

  getLocationsModuleWise(moduleId){
     return this.http.post<any>(this.baseUrl + 'comboGridController/getLocationsTransactionHomePage.do',{},{
        params : new HttpParams().set('moduleId',moduleId)
    }).map(data => data.rows);
  }
  
  getEppsCodes(request: IECodeRequest){
     return this.http.post<any>(this.baseUrl + 'comboGridController/getEppsCodes.do',{},{
        params : new HttpParams().set('moduleId',request.moduleId)
                    .append('tranIndicator',request.tranIndicator)
                    .append('locationCode',request.locationCode)
                    .append('isForMobile','true')
                    .append('transactionPId', request.transactionPId)
     }).map(data => data.rows);
  }
  
  getProductList(request: IProductListRquest){
      return this.http.post<any>(this.baseUrl + 'mobileReportController/getDataFromEppsGlobalMmsItemList.srvc',{},{
        params : new HttpParams().set('locationCode',request.locationCode)
                    .append('ecode',request.ecode)
                    .append('customerCode',request.customerCode)
                    .append('tranIndType',request.tranInd)
                    .append('deviceId',this.deviceId)
                    .append('tranDate',request.tranDate)
    });
  }

  getUOMForProduct(request: IUOMRequest){
    return this.http.get<any>(this.baseUrl + 'mobileSalesOrderController/getSalesOrderUomsForItem.srvc',{
      params : new HttpParams().set('locationCode',request.locationCode)
                  .append('itemCode',request.itemCode)
                  .append('deviceId',this.deviceId)
      });
  }

  getAvailbleStock(request: IUOMRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getItemWiseAvailbelStockDetails.srvc',{},{
      params : new HttpParams().set('locationCode',request.locationCode)
                  .append('eCode',request.eppsCode)
                  .append('itemCode',encodeURIComponent(request.itemCode))
                  .append('deviceId',this.deviceId)
      }).map(stock => stock != null ? stock : 0);
  }

  getCustomerPreviousOrders(request: IProductListRquest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCustomerWisePrevSOItemDetails.srvc',{},{
      params : new HttpParams().set('locationCode',request.locationCode)
                  .append('ecode',request.ecode)
                  .append('customerCode',request.customerCode)
                  .append('deviceId',this.deviceId)                  
      });
  }

  getCustomerCartDetails(request: IProductListRquest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCustomerWiseCartItemDetails.srvc',{},{
      params : new HttpParams().set('locationCode',request.locationCode)
                  .append('ecode',request.ecode)
                  .append('customerCode',request.customerCode)
                  .append('deviceId',this.deviceId)
                  .append('transIndicatorType',request.transIndicatorType)
      });
  }

  getSalesOrderLinking(request: IProductListRquest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/checkSalesOrderLinking.srvc',{},{
      params : new HttpParams().set('locationCode',request.locationCode)
                  .append('customerCode',request.customerCode)
                  .append('deviceId',this.deviceId)
      });
  }

  getProductPrice(request: IPriceRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getItemPriceDetails.srvc',{},{
       params : new HttpParams().set('customerCode',request.customerCode)
                   .append('locationCode',request.locationCode)
                   .append('eCode',request.eppsCode) // remove HradCode EPPS Code use user selection ecode --12-Jul-2018
                   .append('itemCode',encodeURIComponent(request.itemCode))
                   .append('itemQty',request.itemQty)
                   .append('pbHdrSrno',request.pbHdrSrno)
                   .append('dmHdrSrno',request.dmHdrSrno)
                   .append('billUom',request.billUom)
    });
 }

 getUOMConversionFactor(request: IConversionFactorRequest){
    // return this.http.get<any>(this.baseUrl + 'mmsTransactionController/getUomConvFactorForItem.srvc',{},{
    //    params : new HttpParams().set('fromUom',request.fromUomCode)
    //                .append('toUom',request.toUomCode)
    //                .append('itemCode',request.itemCode)
    //                .append('tranId',request.tranInd)
    // });
    return this.http.get<any>(this.baseUrl + 'mmsTransactionController/getUomConvFactorForItem.srvc',{
      params : new HttpParams().set('fromUom',request.toUomCode)
                                .append('toUom',request.fromUomCode)
                                .append('itemCode',encodeURIComponent(request.itemCode))
                                .append('tranId',request.tranInd)
      });
 }
 
  saveCart(request: ISOSaveRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/saveCartDetails.srvc',{},{
      params : new HttpParams().set('cartHdr', JSON.stringify(request.cartHdr))
                  .append('cartDtl',JSON.stringify(request.cartDtl))
                  .append('schduleItem',JSON.stringify(request.schduleItem))
                  .append('deviceId',this.deviceId)
      });
  }

  updateCart(request: ISOUpdateRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/updateCartDetails.srvc',{},{
      params : new HttpParams().set('cartDtlSrNo', request.cartDtlSrNo)
                  .append('cartDtl',JSON.stringify(request.cartDtl))
                  .append('schduleItem',JSON.stringify(request.schduleItem))
                  .append('deviceId',this.deviceId)
      });
  }

 deleteProduct(request: IDeleteProductRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/removeProductFrmCart.srvc',{},{
      params : new HttpParams().set('itemCode', encodeURIComponent(request.itemCode))
                  .append('cartDtlSrNo',request.cartDtlSrNo)
                  .append('customerCode',request.customerCode)
                  .append('locationCode',request.locationCode)
                  .append('ecode',request.ecode)
                  .append('deviceId',this.deviceId)
      });
  }

  getTaxes(request: ITaxRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCalculatedTaxesDetails.srvc',{},{
      params : new HttpParams().set('customerCode', request.customerCode)
                  .append('locationCode',request.locationCode)
                  .append('ecode',request.ecode)
                  .append('mobileSaleCartHdrSrNo',request.mobileSaleCartHdrSrNo)
                  .append('deviceId',this.deviceId)
      });
    }

  getItemWiseTaxes(request: IItemWiseTaxRequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCalculatedItemWiseTaxesDetails.srvc',{},{
      params : new HttpParams().set('mobileSaleCartDtlSrNo', request.mobileSaleCartDtlSrNo)
                  .append('sessionId',request.sessionId)
                  .append('deviceId',this.deviceId)
      })
      .map(taxes =>{
        return this.orderBy.transform(taxes,'chargeDispName');
      })
    }

  checkCreditControl(request: ICreditCheckRequest){
    if(request.totalSOAmount!=null){
        return this.http.get<any>(this.baseUrl + 'commonController/getCreditLimitAndCreditDays.srvc',{
          params : new HttpParams().set('customerCode', request.custCode)
                      .append('totalSOAmount',request.totalSOAmount)
                      .append('eppsCode' , request.eppsCode)
                      .append('locationCode', request.locationCode)
          });
    }else if(request.totalSOAmount==null){
        return this.http.get<any>(this.baseUrl + 'commonController/getCreditLimitAndCreditDays.srvc',{
          params : new HttpParams().set('customerCode', request.custCode)
                                    .append('eppsCode' , request.eppsCode)
                                    .append('locationCode', request.locationCode)
          });
    }
  }

  getSoPoHeaderSrNo(soNo){
    return this.http.post<any>(this.baseUrl+'mobileSalesOrderController/getSOPOHeaderSrNO.srvc',{},{
      params : new HttpParams().set('soNo',soNo)
    });
  }

  saveFiles(request:IFileSrNoUpdateRequest){
    return this.getSoPoHeaderSrNo(request.orderNumber)
      .pipe(
        switchMap((soPoHdrSrNo:any) => {
          return this.http.get(this.baseUrl + 'commonFileUploadController/updateHderSrNoInImageTable.srvc',{
            params : new HttpParams().set('hdrSrNo',soPoHdrSrNo)
                          .append('sessionId',request.sessionId),
            responseType: 'text'
          })
        }),
        switchMap(()=> this.deleteAllCustomerFileDocuments(request.customerCode))
      );
  }
  saveOrder(request: ISaveSORequest){
    return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/saveMobileSalesOrder.srvc',{},{
      params : new HttpParams().set('cartHdrSrNo', request.cartHdrSrNo)
                  .append('customerCode',request.customerCode)
                  .append('locationCode',request.locationCode)
                  .append('ecode',request.ecode)
                  .append('soDate',request.soDate)
                  .append('deviceId',this.deviceId)
                  .append('sessionId',request.sessionId)
                  .append('creditDays',request.creditDays)
                  .append('creditLimit',request.creditLimit)
                  .append('fileUploadSessionId',request.fileUploadSessionId)
      });
  }
  
  loadFileDocuments(customerId){
    let custDataImgBase= JSON.parse(window.localStorage.getItem('custBaseImgData')) != null ? JSON.parse(window.localStorage.getItem('custBaseImgData')) : {};
    let documents;
    if(custDataImgBase[customerId])
      documents = custDataImgBase[customerId];
    else{
      documents = { sessionId: null, files: []};
      custDataImgBase[customerId] = documents;
      window.localStorage.setItem('custBaseImgData',JSON.stringify(custDataImgBase));
    }
    return Observable.of(documents);
  }

  private addFileDoucment(request:IAddFileDocumentRequest){
    let custWiseImageData = JSON.parse(window.localStorage.getItem('custBaseImgData')) != null ? JSON.parse(window.localStorage.getItem('custBaseImgData')) : {};
    if(custWiseImageData[request.customerId].files.length == 0 && custWiseImageData[request.customerId].sessionId == null){
      custWiseImageData[request.customerId].sessionId = request.sessionId;
    }
    custWiseImageData[request.customerId].files.push(request.document);
    window.localStorage.setItem('custBaseImgData',JSON.stringify(custWiseImageData));
    return Observable.of(custWiseImageData[request.customerId]);
  }

  deleteFileDoucment(request:IDeleteFileDocumentRequest){
    let custWiseImageData = JSON.parse(window.localStorage.getItem('custBaseImgData')) != null ? JSON.parse(window.localStorage.getItem('custBaseImgData')) : {};
    if(custWiseImageData != null){
      custWiseImageData[request.customerId].files.splice(request.index,1);
      window.localStorage.setItem('custBaseImgData',JSON.stringify(custWiseImageData));
      return Observable.of(custWiseImageData[request.customerId]);
    }
  }

  deleteAllCustomerFileDocuments(customerId){
    var custoImgaData = JSON.parse(window.localStorage.getItem('custBaseImgData'));
    if(custoImgaData!=null){
        delete custoImgaData[customerId];
        window.localStorage.setItem('custBaseImgData',JSON.stringify(custoImgaData));
    }
    return Observable.of(custoImgaData);
  }

  uploadFileOnServer(request:IUploadFileRequest){
    let formData = new FormData();
    formData.append('fileSrNo',request.fileSrNo);
    formData.append('name',request.name);
    formData.append('remark',request.remark);
    formData.append('sessionId',request.sessionId);
    formData.append('mtqrFlag',request.mtqrFlag);
    formData.append('companyCode',request.companyCode);
    formData.append('divisionCode',request.divisionCode);
    formData.append('locationCode',request.locationCode);
    formData.append('ecode',request.ecode);
    formData.append('hdrSrNo',request.hdrSrNo);
    formData.append('dtlSrNo',request.dtlSrNo);
    formData.append('subDtlSrNo',request.subDtlSrNo);
    formData.append('employeeCode',request.employeeCode);
    formData.append('ipAddress',this.deviceId);
    formData.append('createrRole',request.createrRole);
    formData.append('fileName',request.fileName);
    formData.append('fileType',request.fileType);
    formData.append('base64Image',request.base64Image);
    

    let headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Content-Type', undefined);
    
    return this.http.post<any>(this.baseUrl + 'commonFileUploadController/uploadImage.srvc',formData,{
      headers : headers     
    })
    .pipe(
      switchMap((data:any) => {
        this.tempImageData = data;
        return this.http.get<any>(this.baseUrl + 'commonFileUploadController/mobileImageDownload.srvc',{
          params : new HttpParams().set('fileName',data.fileName)
        });
      }),
      switchMap(img => {
        let document : IDocument = {
          baseImg : img.base64Encoded,
          fileName : this.tempImageData.fileName,
          fileSrNo : this.tempImageData.fileSrNo
        };
        let addRequest: IAddFileDocumentRequest = {
          document : document,
          customerId : request.customerId,
          sessionId : request.sessionId
        };
        return this.addFileDoucment(addRequest);
      })
    );
    
  }

  deleteCustomerDocument(request:IDeleteFileDocumentRequest){
    return this.http.get<any>(this.baseUrl + 'commonFileUploadController/mobileDeleteImageFromServerAndDatabasePath.srvc',{
      params : new HttpParams().set('fileName',request.fileName)
                  .append('fileSrNo',request.fileSrNo)
      }).pipe(switchMap(d => {
        return this.deleteFileDoucment(request);
      }));
  }

  getSessionIdForCustomer(customerId){
    let custWiseImageData = JSON.parse(window.localStorage.getItem('custBaseImgData')) != null ? JSON.parse(window.localStorage.getItem('custBaseImgData')) : {};
    return Observable.of(custWiseImageData[customerId].sessionId);
  }

  checkValidFinancialYear(request: ICheckFinancialYearRequest){
    return this.http.post(this.baseUrl + 'account/callFunctionCheckDate.srvc', {},{
      params : new HttpParams().set('locationCode', request.locationCode)
                              .append('transDate',request.tranDate)
                              .append('isFromSaveOrUpdate', request.isFromSaveOrUpdate),
      responseType: 'text' 
    });
  }

  //-----------------------PriceBook Header--------------------

   getPriceBookHeaderData(request:IPriceBookHeaderDmDetailsRequest){
    return this.http.get<any>(this.baseUrl + 'sdmsSalesOrderTransactionController/getPriceBookHdrSrNoAndDetails.srvc',{
      params : new HttpParams().set('locationCode', request.locationCode)
                  .append('soType',request.ecode)
                  .append('soDate',request.soDate)
                  .append('customerCode',request.customerCode)
                  .append('itemRateFlag',request.itemRateFlag)
      });
  }

  //------------------DM Details-------------------------------

   getDmDetails(request:IPriceBookHeaderDmDetailsRequest){
    return this.http.get<any>(this.baseUrl + 'sdmsSalesOrderTransactionController/discountMatrixDetails.srvc',{
      params : new HttpParams().set('locationCode', request.locationCode)
                  .append('soType',request.ecode)
                  .append('soDate',request.soDate)
                  .append('customerCode',request.customerCode)
                  .append('itemRateFlag',request.itemRateFlag)
      });
  }

  //-----------GL SL Code Adv----------------------------

   getGlSlCodeAdv(){
    return this.http.post<any>(this.baseUrl+'mobileSalesOrderController/getGlSlCodeForSOAdv.srvc',{});
  }

  //-----------FA Auto Adv----------------------------

   getFaAutoAdv(request:IAutoAdvanceRequest){
     return this.getGlSlCodeAdv()
       .switchMap(data => {
           return this.http.post<any>(this.baseUrl+'sdmsSalesOrderTransactionController/execProcInsFaAutoAdv4so.srvc',{},{
            params : new HttpParams().set('soPoHeaderSrNo', request.soPoHeaderSrNo)
                                     .append('receiptType',request.receiptType)
                                     .append('paymentMode',request.paymentMode)
                                     .append('bankName',request.bankName)
                                     .append('chequeNo',request.chequeNo)
                                     .append('chequeDate',request.chequeDate)
                                     .append('amount',request.amount)
                                     .append('glCode',data[0].accountGlCode)
                                     .append('slCode',data[0].accountSlCode)
                                     .append('tranIndicator', request.tranIndicator)
                                     
          });
       });
    
  }

// get Customer wise cart Items Count
getCustomerCartItemsCount(request: IProductListRquest){
  return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCustomerWiseCartItemsCount.srvc',{},{
    params : new HttpParams().set('locationCode',request.locationCode)
                .append('ecode',request.ecode)
                .append('customerCode',request.customerCode)
                .append('deviceId',this.deviceId)
    }).map(data => data);;
}


// Get Discountt Matrix Details

getDiscountMatrixDetails(request: IPriceRequest){
  return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getDiscountMatrixDetails.srvc',{},{
     params : new HttpParams().set('customerCode',request.customerCode)
                 .append('ecode',request.eppsCode) // remove HradCode EPPS Code use user selection ecode --12-Jul-2018
                 .append('itemCode',request.itemCode)
                 .append('billQty',request.itemQty)
                 .append('itemPrice',request.itemRate)
                 .append('dmHdrSrNo',request.dmHdrSrno)
                 .append('billUomCode',request.billUom)
                 .append('dmActive',request.dmActive)
                 .append('pbHdrSrno',request.pbHdrSrno)
                 .append('locationCode',request.locationCode)
  });
}

getCustomerOSAmountDetails(request:ICustOutAmutRequest ){
  return this.http.post<any>(this.baseUrl + 'mobileSalesOrderController/getCustomerOutStandingAmt.srvc',{},{
     params : new HttpParams().set('customerCode',request.customerCode)
                              .append('locationCode', request.locationCode)
                              .append('deviceId' , this.deviceId)
  });
}

//Customer Visit Services
// Get Customer
getCVRCustomers(){
  return this.http.post<any>(this.baseUrl+'comboGridController/getCustomerNameForSoStatusProcwiseReport.do',{});
}
//Get CVR Employee
getCVREmployees(request: any){
  return this.http.post<any>(this.baseUrl + 'comboGridController/getEmployeeNames.do',{},{
    params : new HttpParams().set('activeYn',request.activeYn)
                             .append('employeeType', request.employeeType)
 });
}
//Get CVR Previous Purpose
getCVRPreviousPurpose(request: any){
  return this.http.post<any>(this.baseUrl + 'sdmsCustomerVisitReportTransactionController/listPurposeOfVisitPrevData.srvc',{},{
    params : new HttpParams().set('distinctColumn',request.distinctColumn)
                             .append('queryFlag', request.queryFlag)
 });
}
//Get CVR Previous Action
getCVRPreviousAction(request: any){
  return this.http.post<any>(this.baseUrl + 'sdmsCustomerVisitReportTransactionController/listPurposeOfVisitPrevData.srvc',{},{
    params : new HttpParams().set('distinctColumn',request.distinctColumn)
                             .append('queryFlag', request.queryFlag)
 });
}
// Save CVR Transaction
   saveCvr(request: any){    
      return this.http.post<any>(this.baseUrl + 'sdmsCustomerVisitReportTransactionController/saveSdmsCustomerVisitReportForMob.do',request,{   
      })

   }
}
