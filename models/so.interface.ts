import { ILocation } from '../../shared/models/location.interface';
import { IEcode } from '../../shared/models/ecode.interface';
export interface IEmplolyeeLocation {
    employeeCode ?: string,
    employeeFirstName ?: string,
    employeeFullName ?: string,
    employeeMailId ?: string,
    employeeMobileNumber ?: string,
    isLinked ?: string,
    isSalFlagReq ?: string,
    locationActiveYn ?: string,
    locationCode ?: string,
    locationDisplayName ?: string,
    locationName ?: string,
    roleCode ?: string,
    roleName ?: string,
    salFlag ?: string,
    tranInd ?: string
}

export interface ICustomerDetailsAsyncRequest {
    paginationDetails ?:IPaginationDetails,
    searchCriteriaDetails ?: ISearchCriteriaDetails,
    locationCode ?: string,
    tranInd ?: string,
    sessionId ?: string,
}
//------------Load Customer for SO and Collection--------------------
export interface ISOColCustomersRequest {
    locationCode ?: string,
    tranInd       ?: string,
    paginationDetails ?:IPaginationDetails,
    searchCriteriaDetails ?: ISearchCriteriaDetails,
    sessionId ?: string
}

export interface ISOCustomer {
    availCreditlimit ?: string,
    companyCode ?: string,
    customerBilladdress ?: string,
    customerCode ?: string,
    customerDisplayname ?: string,
    divisonCode ?: string,
    emailId ?: string,
    groupCode ?: string,
    groupName ?: string,
    maxCreditlimit ?: string,
    mobileNo ?: string,
    notDueamount ?: string,
    openAdvamt ?: string,
    overDueamount ?: string,
    pcName ?: string,
    runDate ?: string,
    saleQty ?: string,
    saleVal ?: string,
    sessionId ?: string,
    srNo ?: string,
    totOutstandamount ?: string
}

export interface IECodeRequest {
    moduleId : string,
    tranIndicator : string,
    locationCode : string,
    transactionPId ?: string
}

export interface IOrderHeader {
    customer : ISOCustomer,
    location : ILocation,
    ecode : IEcode,
    validTo : string,
    loggedInUserInfo ?: any 
}
export interface IDeliverySchedule {
    cartHdrSrNo ?: string,
    cartDtlSrNo ?: string,
    cartDelSchedSrNo ?: string,
    itemcode ?: string,
    toBeDelQty ?: string,
    itemQty ?: string,
    fromDate ?: string,
    toDate ?: string,
    consigneeCode ?: string,
    consigneeAddCode ?: string,
    jobNo ? : string
}
export interface ICart {
    cartDtlSrNo ?: string,
    cartHdrSrNo ?: string,
    companyCode ?: string,
    divisonCode ?: string,
    locationCode ?: string,
    itemCode ?: string,
    itemDisplayName ?: string,
    itemQty ?: string,
    itemFcVal ?: string,
    itemFcRate ?: string,
    discRate ?: string,
    discUOM ?: string,
    eppsMobSaleCartHdr ?: string,
    runDate ?: string,
    billUom ?: string,
    billUomDesc ?: string,
    b2iUomConv ?: string,
    mobileSaleDelSchedlist ?: IDeliverySchedule[],
    cartDelSchedSrNo ?: string,
    priceDtlSrNo ?: string,
    availStock ?: string,
    isOpenFromDelievrySchdule?:boolean,
    soQtyIssueUom ?:string,
    listDMDiscout ?: Array<IDmDiscount>,
    isUserChangedProduct ?:boolean,
    hsnSrNo ? : string,
    isOpenFromCart?:boolean,
    manualRateFlag ?: boolean,
    addToCartFlag ?: boolean
}

export interface IProduct {
    companyCode ?: string,
    genBatchYn ?: string,
    issueUom ?: string,
    issueUomDesc ?: string,
    itemCode ?: string,
    itemDisplayName ?: string,
    itemMrpRate ?: string,
    pcName ?: string,
    purchaseUom ?: string,
    purchaseUomDesc ?: string,
    runDate ?: string,
    sessionId ?: string,
    splitNoOfPcs ?: string,
    srNo ?: string,
    supplierItemCode ?: string,
    uomConvFactor ?: string,
    whCode ?: string,
    hsnSrNo ?: string,
    displayName?:string
}

export interface IUOM {
    anotherId ?: string,
    antoherValue ?: string,
    code ?: string,
    doubleValue ?: string,
    gstInType ?: string,
    id ?: string,
    parentID ?: string,
    value ?: string
}

export interface IPreviousOrder {
    b2iUomConv ?: string,
    companyCode ?: string,
    discRate ?: string,
    divisonCode ?: string,
    itemCode ?: string,
    itemDisplayname ?: string,
    itemQty ?: string,
    itemRate ?: string,
    locationCode ?: string,
    locationName ?: string,
    pcName ?: string,
    runDate ?: string,
    sessionId ?: string,
    soDate ?: string,
    srNo ?: string,
    uomCode ?: string,
    uomDesc ?: string
}

export interface IProductListRquest {
    locationCode : string,
    ecode : string,
    customerCode : string,
    tranInd : string,
    tranDate ?: string,
    paginationDetails ?:IPaginationDetails,
    searchCriteriaDetails ?: ISearchCriteriaDetails,
    groupCode       ?:string,
    subGroupCode    ?:string,
    subSubGroupCode ?:string,
    transIndicatorType ?:string
}

export interface IUOMRequest {
    locationCode : string,
    itemCode    : string,
    eppsCode ?: string
}

export interface IPriceRequest {
    customerCode : string,
    locationCode : string,
    itemCode : string,
    itemQty : string,
    pbHdrSrno : string,
    dmHdrSrno : string,
    eppsCode :string,
    billUom : string,
    isRateEditable ?: boolean,
    itemRate ?:string,
    dmActive ? : string,
}

export interface ICartHeaderRequest {
    locationCode : string,
    locationName : string,
    userId : string,
    userName : string,
    customerCode : string,
    customerName : string,
    roleCode : string,
    eCode : string,
    fromDate : string,
    toDate : string,
    dmHdrSrNo : string,
    outstandingAmt : string,
    pbHdrSrNo ? :string
}
export interface IDmDiscount {
    dmDependency            : string,
    discLogic               : string,
    discUom                 : string,
    calcBase                : string,
    discountBenifit         : string,
    discountName            : string,
    dmClassFlag             : string,
    dmHeaderSrNo            : string,
    dmLimitSrNo             : string,
    eppsSdmsDmDetailSrNo    : string,
    eppsSdDmSubDtlSrNo      : string,
    soHeaderDmSrNo          : string,
    soItemDtlSrNo           : string,
    discFreeitemQty         : string,
    discFreeitemValue       : string,
    discItemCode            : string,
    itemDisplayName         : string,
    issueUOM                : string,
    issueUOMDisplayName     : string,
    packSize                : string          
}
export interface ICartDetailRequest {
    itemCode : string,
    itemDisplayName : string,
    itemQty : string,
    billUom : string,
    billUomDesc : string,
    b2iUomConv : string,
    itemFcRate : string,
    itemFcVal : string,
    discRate : string,
    discUOM : string,
    priceDtlSrNo : string,
    locationCode : string,
    listDMDiscout :Array<IDmDiscount>,
    soQtyIssueUom : string,
    hsnSrNo :  string 
}
export interface IScheduleItemRequest {
    fromDate : string,
    toDate : string,
    toBeDelQty : string,
    itemcode : string,
    itemQty : string,
    consigneeCode : string,
    consigneeAddCode : string,
    jobNo?:string
}
export interface ISOSaveRequest {
    cartHdr : Array<ICartHeaderRequest>,
    cartDtl : Array<ICartDetailRequest>,
    schduleItem : Array<IScheduleItemRequest>
}
export interface ISOUpdateRequest {
    cartDtlSrNo : string,
    cartDtl : Array<ICartDetailRequest>,
    schduleItem : Array<IScheduleItemRequest>
}
export interface ITax {
    cartDtlSrNo ?: string,
    cartHdrSrNo ?: string,
    chargeCode ?: string,
    chargeDispName ?: string,
    chargeRate ?: string,
    chargeVal ?: string,
    chargeFcVal ?: string,
    companyCode ?: string,
    divisionCode ?: string,
    financialYear ?: string,
    itemVal ?: string,
    locationCode ?: string,
    pcName ?: string,
    runDate ?: string,
    sessionId ?: string,
    srNo ?: string,
    uniqueSequenceNo ?: string,
    uomCode ?: string,
    valuationFlag ?: string,
}
export interface ICreditControl {
    CreditLimit ?: string,
    creditDays ?: string
}

export interface IItemRateData {
    dMDiscountsIWise             ?: string,
    discValue                     : string,
    discountRate                  : string,
    discountUom                   : string,  
    dmActive                      : string  
    itemMaxDiscount               : string, 
    itemMaxRate                   : string, 
    itemMinDiscount               : string,
    itemMinRate                   : string, 
    itemMrpRate                   : string, 
    itemRate                      : string,
    listDMDiscout                ?: Array<IDmDiscount>,
    maxRange                      : string,  
    maxRangeUom                   : string, 
    minRange                      : string,  
    minRangeUom                   : string, 
    packSize                      : string,  
    plAttached                    : string,
    priceDetailSrNo               : string, 
    priceHeaderSrNo               : string  
}

export interface IOrderDetails {
    orderHeader : IOrderHeader,
    cart : ICart,
    productList : Array<IProduct>,
    productListLoaded : boolean,
    UOMList : Array<IUOM>,
    UOMListLoaded : boolean,
    customerPreviousOrders : Array<IPreviousOrder>,
    customerPreviousOrdersLoaded : boolean,
    customerWiseCartDetails : Array<ICart>,
    customerWiseCartDetailsLoaded : boolean,
    salesOrderLinkings: Array<any>,
    salesOrderLinkingsLoaded : boolean,
    itemPriceInfo : IItemRateData,
    itemPriceSaved : IItemRateData,
    orderTaxes: Array<ITax>,
    orderTaxesLoaded: boolean,
    isValidFinancialYear : any,
    isValidFinancialYearLoaded: boolean,
    creditControl: ICreditControl,
    creditControlLoaded: boolean,
    savedOrder :string,
    didFileUploaded:boolean
    itemWiseTaxes: any,
    fileDocuments: IFileDocuments,
    priceBookHeaderData :IUOM,
    dmDetails : IDMDetailsData,
    faAutoAdv    : IAutoAdvanceData,
    cartItemCount : number,
    customerWiseCartItemCountLoaded : boolean,
    isEditablePrice ?: boolean,
    isManualRateEntered ? :boolean,
    isManualDiscountEntered ? :boolean,
    discountType ? : string,
    creditControlBeforeBO: ICreditControl,
    creditControlBeforeBOLoaded: boolean,
    outStandingAmount : number,
    outStandAmountLoaded : boolean,
    isdisableCard : boolean,
    totalPageCount : number,
    globalProductList:Array<IProduct>,
    isEditableDiscount : boolean
}
export interface IFileDocuments{
    sessionId:string,
    files : Array<IDocument>
}
export interface IConversionFactorRequest {
    fromUomCode : string,
    toUomCode : string,
    itemCode : string,
    tranInd : string
}

export interface IDeleteProductRequest {
    itemCode : string,
    cartDtlSrNo : string,
    customerCode : string,
    locationCode : string,
    ecode : string,
}

export interface ITaxRequest{
    customerCode : string,
    locationCode : string,
    ecode : string,
    mobileSaleCartHdrSrNo : string,
}

export interface IItemWiseTaxRequest {
    mobileSaleCartDtlSrNo : string,
    sessionId : string
}
export interface ICreditCheckRequest {
    custCode : string,
    totalSOAmount ?: string,
    eppsCode ?: string,
    locationCode ?: string
}

export interface ISaveSORequest {
    cartHdrSrNo : string,
    customerCode : string,
    locationCode : string,
    ecode : string,
    soDate : string,
    sessionId : string,
    creditDays : string,
    creditLimit : string,
    fileUploadSessionId : string
}

export interface IDocument {
    baseImg: string,
    fileName : string,
    fileSrNo : string
}

export interface IAddFileDocumentRequest {
    document : IDocument,
    customerId: string,
    sessionId : string
}

export interface IDeleteFileDocumentRequest {
    customerId: string,
    index : number,
    fileName : string,
    fileSrNo : string
}

export interface IUploadFileRequest {
    fileSrNo : string,
    name    : string,
    remark  : string,
    mtqrFlag : string,
    companyCode : string,
    divisionCode : string,
    locationCode : string,
    ecode   : string,
    hdrSrNo : string,
    dtlSrNo : string,
    subDtlSrNo  : string,
    employeeCode    : string,
    ipAddress ?: string //deviceId
    sessionId : string
    createrRole : string,
    fileName : string,
    fileType : string,
    base64Image : string,
    customerId : string
}
export interface IFileSrNoUpdateRequest {
    sessionId   : any,
    customerCode : string,
    orderNumber: string
}

export interface ICheckFinancialYearRequest {
    locationCode : string,
    tranDate : string,
    isFromSaveOrUpdate : string
}

export interface ISOAdvanceCollectionRequest {
    soPoHeaderSrNo : string,
    receiptType : string,
    paymentMode : string,
    bankName : string,
    chequeNo : string,
    chequeDate : string,
    amount : string,
    glCode : string,
    slCode : string
}

//-----------------PriceBook Header and DM Details Request-------------

export interface IPriceBookHeaderDmDetailsRequest {
    locationCode    : string,
    soType          : string,
    soDate          : string,
    customerCode    : string,
    itemRateFlag    : string,
    ecode           ?: string
}

//----------------Dm Details Data--------------------------------------

export interface IDMDetailsData {
    dmHdrSrNo       : string,
    dmName          : string  
}

//-----------Get GL SL Code for Adv---------------------------

export interface IGlSlCodeAdvData {
    accountCloseDate            : string,
    accountGlCode               : string, 
    accountName                 : string,
    accountNo                   : string, 
    accountOpenDate             : string,
    accountSlCode               : string, 
    accountType                 : string,
    activeYn                    : string,
    address1                    : string,
    address2                    : string,
    address3                    : string,
    authorDealerCode            : string,
    bankActiveYn                : string,
    bankBranchName              : string,  
    bankCode                    : string,
    bankDisplayName             : string,
    checkPrintFrmt              : string,
    chequePrintFormat           : string, 
    chequePrintFormats          : string,                 
    cityCode                    : string,
    companyCode                 : string,
    countryCode                 : string,
    countryName                 : string,
    currencyCode                : string,
    defaultPayFlag              : string,
    defaultRecvFlag             : string,
    divisionCode                : string,
    emailId                     : string,
    faxNo                       : string,
    glDisplayName               : string,
    gstStateCode                : string,
    gstinNo                     : string,
    headOfficeAddress1          : string,
    headOfficeAddress2          : string,
    headOfficeAddress3          : string,
    headOfficeFaxNo             : string,
    headOfficePinCode           : string,
    headOfficeTelephoneNo       : string,
    headOfficeWebsite           : string,
    headOfficeWorkTimings       : string,
    ifscCode                    : string,
    itaxPan                     : string,
    micrCode                    : string,
    minimumBalToMaintain        : string,
    mobileNo                    : string,
    neftCd                      : string,
    pinCode                     : string,
    remarks                     : string,
    slDisplayName               : string,
    stateCode                   : string,
    stringAccountCloseDate      : string,
    stringAccountOpenDate       : string,
    swiftCd                     : string,
    telephoneNo                 : string,
    updatorRole                 : string,
    website                     : string,
    workTimings                 : string
}

//----------Auto Advance--------------------------

export interface IAutoAdvanceRequest {
    soPoHeaderSrNo     : string,
    receiptType        : string,
    paymentMode        : string,
    bankName           : string,
    chequeNo           : string,
    chequeDate         : string,
    amount             : string,
    glCode            ?: string,
    slCode            ?: string,
    tranIndicator     ?: string  
}  

export interface IAutoAdvanceData {
    voucherNo         : string
    
}  

export interface ICustOutAmutRequest{
    locationCode : string;
    customerCode : string;
}

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