import { ILocation } from '../../shared/models/location.interface';
import { IEcode } from '../../shared/models/ecode.interface';
import { ISOCustomer } from '../../sdms/models/so.interface';
import { ITax } from './so.interface';


export interface ICustomerAddressRequest {
  customerCode: string;
}

export interface IConsigneeNameRequest {
  customerCode: string;
  activeYn: string;
}

export interface IConsigneeAddressRequest {
  customerCode: string;
}

export interface IDeliverChalanHeaderDTORequest {
  locationCode: string;
  tranIndicator: string;
  ecodeName: string;
  tranIndicatorType: string;

}
export interface ICustomerAddress {
  id ? : number,
    value ? : string
}

export interface IIssueList {
  id ? : number,
    value ? : string,
    code ? : string
}

export interface IDCHeader{
    location:ILocation,
    ecode:IEcode,
    issue:IIssueList,
    customer:ISOCustomer,
    customerAddress: ICustomerAddress,
    validTo : string
}

export interface IDCProduct {
  srNo ? : string,
    itemCode ? : string,
    itemDisplayName ? : string,
    hsnCode ? : string,
    mivHdrSrNo ? : string,
    mivDocNo ? : string,
    mivDocDt ? : string,
    issueUOM ? : string,
    issueUOMDesc ? : string,
    mivDtlSrNo ? : string,
    balQty ? : string,
    itemRate ? : string,
    mivSubDtlSrNo ? : string,
    batchNo ? : string,
    ipBatchNo ? : string,
    opBatchNo ? : string,
    pgrnDtlSrNo ? : string,
    dgrnDtlSrNo ? : string,
    srtDtlSrNo ? : string,
    opngSrNo ? : string,
    fgrOpDtlSrNo ? : string
}
export interface IDCCart extends IDCProduct {
  cartItem ? : {
    rate: string,
    quantity: string
  }
}
export interface IDCDetails {
  dcHeader: IDCHeader,
    dcProductList: Array < IDCProduct > ,
    dcProductListLoaded: boolean,
    cart: IDCCart,
    customerWiseCartDetails: any,
    infoForTaxes: any,
    infoForTaxesLoaded : boolean,
    orderTaxes: Array<ITax>,
    orderTaxesLoaded: boolean,
    itemWiseTaxes: any,
    savedOrder: any
}

export interface IDCIssueItemDetailsRequest {
  locationCode: string;
  dcType: string;
  mivHdrSrNo: number;
  mivDocNo: string;
}

export interface IDCSaveHeader {
    locationCode: string,
    customerCode: string,
    customerName: string,
    consigneeCode: string,
    consigneeName: string,
    consigneeAddressCode: string,
    eppsCode: string,
    empCode: string,
    roleCode: string,
    toDate: string
}

export interface IDCSaveRequest {
    header: IDCSaveHeader,
    itemDetails: Array < IDCSaveDetail >
}

export interface IDCSaveDetail {
    dcDtlSrNo: string,
    dcHdrSrNo: string,
    companyCode: string,
    divisonCode: string,
    locationCode: string,
    batchNo: string,
    itemCode: string,
    itemDisplayName: string,
    itemQty: string,
    balQty: string,
    billUom: string,
    billUomDesc: string,
    b2iUomConv: string,
    itemFcVal: string,
    itemFcRate: string,
    discRate: string,
    discUOM: string,
    mivHdrSrNo: string,
    mivDtlSrNo: string,
    mivSubDtlSrNo: string,
    pgrnDtlSrNo: string,
    dgrnDtlSrNo: string,
    srtDtlSrNo: string,
    opngSrNo: string,
    fgrOpDtlSrNo: string


}


export interface IDCTaxRequest{
  customerCode : string,
  locationCode : string,
  ecode : string,
  mobileSaleDcHdrSrNo : string,
  deviceId ?: string
}

export interface IDCItemWiseTaxRequest {
  mobileSaleDCDtlSrNo : string,
  sessionId ?: string,
  deviceId ?: string
}