export interface IDateData {
    fromDate : string,
    toDate : string
}

export interface ISdmsReportRequest {
    locationCode : string,
    customerCode : string,
    dateData : IDateData,
    deviceId ?:string,
    sessionId ?: string
}

export interface ICustomerWiseReportData {
    srNo ?: string,
    companyCode ?: string,
    divisionCode ?: string,
    locationCode ?: string,
    financialYear ?: string,
    customerCode ?: string,
    customerDispName ?: string,
    salesQty ?: string,
    salesValue ?: string,
    invRatio ?: string,
    pcName ?: string,
    sessionId ?: string,
    runDate ?: string
}

export interface ICollectionReportData {
    srNo ?: string,
    companyCode ?: string,
    divisionCode ?: string,
    locationCode ?: string,
    customerCode ?: string,
    customerDispName : string,
    recievedAmnt : string,
    pcName ?: string,
    sessionId ?: string,
    runDate ?: string
}

//----------------Get Customer on Location Select So Status Report---------------

export interface ICustomerSOStatusReportRequest {
    locationCode    : string,
    eCode           : string,
    isFromMobile    : string
}


export interface ISoStatusReportRequest {
    locationCode : string,
    soTypes: string,
    dateData : IDateData,
    customerCode : string,
    deviceId ?:string
}

export interface ISoStatusReportDetailsRequest {
    SoHdrSrNo : string,
    sessionId ?: string,
    deviceId ?: string,
    
}

export interface IStockProductsRequest {
    locationCode ?: string,
    deviceId ?: string,
    tranInd ?: string,
    groupCode       ?:string,
    subGroupCode    ?:string,
    subSubGroupCode ?:string,
    sessionId ?:string
    
}

export interface IStockReportRequest {
    ItemCode : string,
    transactionFlag: string,
    locationCode: string,
    sessionId ?: string,
    deviceId ?: string,
    
}
