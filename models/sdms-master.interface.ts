//--------------Get Countries---------------------------------------
export interface ICountriesData {
    activeYn       : string,
    countryCode     : string,
    countryName     : string,
    removeRecord    : string 
}

//------------------Get GSTN Types and Group Location-------------------
export interface IGstnTypesData {
    anotherId        : string,
    anotherValue     : string,
    code             : string,   
    doubleValue      : string,  
    gstInType        : string,
    id               : string, 
    parentID         : string,
    value            : string
}

//------------------Get States after selecting Country-------------
export interface IStatesRequest {
    countryCode    : string  
}

export interface IStatesData {
    activeYn           : string, 
    countryCode        : string,
    countryName        : string,
    gstStateCode       : string, 
    gstinStateAbbr     : string,   
    gstinType          : string,  
    hiddenGstinType    : string,
    removeRecord       : string, 
    stateCode          : string,  
    stateName          : string  
}

//------------------Get Cities after selecting State-------------

export interface ICitiesRequest {
    countryCode    : string,
    stateCode      : string    
}

export interface ICitiesData {
    activeYn       : string,
    cityCode       : string, 
    cityName       : string, 
    countryCode    : string,
    countryName    : string,
    removeRecord   : string, 
    stateCode      : string,  
    stateName      : string  
}   

//-----------------------Register Partner Location-----------------

export interface ICustomerSaveRequest {
    customerName            ?: string,	
    address1                ?: string,
    address2                ?: string,
    address3                ?: string,
    countryName             ?: string,
    stateName               ?: string,
    cityName                ?: string,
    pinCode                 ?: string,
    telephoneNo             ?: string,
    faxNo                   ?: string,
    customerCode            ?: string,
    activeYn                ?: string,
    locationCode            ?: string,
    locationDisplayName     ?: string,
    gstStateCode            ?: string,
    gstinType               ?: string,
    gstInNo                 ?: string,
    gstinStateType          ?: string,
    panNo                   ?: string,
    customerDisplayName     ?: string,
    customerAddCode         ?: string,
    countryCode             ?: string,
    stateCode               ?: string,
    cityCode                ?: string,
    contactEmail1           ?: string,
    dateOfBirthString       ?: string,
    glSlMessage             ?: string,
    glCode                  ?: string,
    slCode                  ?: string,
    mobileNo                ?: string,
    dob                     ?: string,
    beatCd                  ?: string,
    routeCd                 ?: string,
    id                      ?: string,
    value                   ?: string,
    creditControlFlag       ?: string,
    customerType            ?:string
}

export interface ICustomerSaveData {
    // {"param3":true}
    id                         : string,
    sucess                     : boolean
}    
