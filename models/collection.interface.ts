export interface ICustomerDetailRequest {
    customerCode : string,
    locationCode : string,
    glCode ?: string,
    slCode ?: string
}

export interface IPaymentType {
    anotherId ?: string,
    antoherValue ?: string,
    code ?: string,
    doubleValue ?: string,
    gstInType ?: string,
    id ?: string,
    parentID ?: string,
    value ?: string,
}

export interface IGlobalMobPdcHdr {
    customerCode : string,
    custGlCode : string,
    custSlCode : string,
    bankName : string,
    chequeNo : string,
    chequeDt : string,
    amount : string,
    remarks : string,
    receiptType : string,
    paymentMode : string,
    locationCode : string,
    eppsCode : string,
    collectionDate ?: string,
    sessionId ?:string
}

export interface IGlobalMobSalesPdcDtl {
    companyCode : string,
    divisionCode : string,
    locationCode : string,
    invhSrNo : string,
    invhType : string,
    invhDt : string,
    glCode : string,
    slCode : string,
    recieveFcAmnt : string,
    pdcYn : string,
}
export interface ISaveCollectionRequest {
    globalMobPdcHdr : Array<IGlobalMobPdcHdr>,
    globalMobSalesPdcDtl ?: Array<IGlobalMobSalesPdcDtl>
}

// for infinite scroll 
export interface IPaginationDetails{
    page ?: number;
    rows ?: number;
 }
 export interface ISearchRules{
    field ? :string;
    op ? : string;
    data ?:string;
    searchType ?:any;
    dtoField ?: string;
 }
 export interface ISearchCriteriaDetails{
    groupOp ?: string;
    rules ?: Array<ISearchRules>;
 }
 
 export interface ICustomerDetailsAsyncRequest {
    paginationDetails ?:IPaginationDetails;
    searchCriteriaDetails ?: ISearchCriteriaDetails;
 }
