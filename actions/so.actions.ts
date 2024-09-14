import { Action } from '@ngrx/store';
import { IEmplolyeeLocation, ICustomerDetailsAsyncRequest, ISOColCustomersRequest, IECodeRequest, IOrderHeader, IAutoAdvanceRequest, IProductListRquest, IPriceBookHeaderDmDetailsRequest, IUOMRequest, IProduct, IPriceRequest, ICart, IPreviousOrder, IDeliverySchedule, ISOSaveRequest, IUOM, IConversionFactorRequest, IDeleteProductRequest, ITaxRequest, ITax, ICreditCheckRequest, ISaveSORequest, IItemWiseTaxRequest, ISOUpdateRequest, IDocument, IUploadFileRequest, IDeleteFileDocumentRequest, IFileSrNoUpdateRequest, IFileDocuments, ICheckFinancialYearRequest, ISOAdvanceCollectionRequest, ICustOutAmutRequest } from '../../models/so.interface';

export const LOAD_CUSTOMERS = '[SDMS - SO] Load Customers';
export const LOAD_CUSTOMERS_SUCCESS = '[SDMS - SO] Load Customers Success';
export const LOAD_CUSTOMERS_FAIL = '[SDMS - SO] Load Customers Fail';

export const ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE = '[SDMS - SO] Add Location of Logged Employee as per role';
export const ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE_SUCCESS = '[SDMS - SO] Add Location of Logged Employee as per role Success';
export const ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE_FAIL = '[SDMS - SO] Add Location of Logged Employee as per role Fail';

export const LOAD_LOCATIONS = '[SDMS - SO] Load Locations';
export const LOAD_LOCATIONS_SUCCESS = '[SDMS - SO] Load Locations Success';
export const LOAD_LOCATIONS_FAIL = '[SDMS - SO] Load Locations Fail';

export const LOAD_EPPS_CODES = '[SDMS - SO] Load EPPS Codes';
export const LOAD_EPPS_CODES_SUCCESS = '[SDMS - SO] Load EPPS Codes Success';
export const LOAD_EPPS_CODES_FAIL = '[SDMS - SO] Load EPPS Codes Fail';

export const LOAD_PRODUCT_LIST = '[SDMS - SO] Load Product List';
export const LOAD_PRODUCT_LIST_SUCCESS = '[SDMS - SO] Load Product List Success';
export const LOAD_PRODUCT_LIST_FAIL = '[SDMS - SO] Load Product List Fail';

export const LOAD_UOM_LIST = '[SDMS - SO] Load UOM List';
export const LOAD_UOM_LIST_SUCCESS = '[SDMS - SO] Load UOM List Success';
export const LOAD_UOM_LIST_FAIL = '[SDMS - SO] Load UOM List Fail';

export const LOAD_CUSTOMER_PREVIOUS_ORDERS = '[SDMS - SO] Load Customer Prevous Order';
export const LOAD_CUSTOMER_PREVIOUS_ORDERS_SUCCESS = '[SDMS - SO] Load Customer Prevous Order Success';
export const LOAD_CUSTOMER_PREVIOUS_ORDERS_FAIL = '[SDMS - SO] Load Customer Prevous Order Fail';

export const LOAD_CUSTOMER_WISE_CART_DETAILS = '[SDMS - SO] Load Customer Wise Cart Details';
export const LOAD_CUSTOMER_WISE_CART_DETAILS_SUCCESS = '[SDMS - SO] Load Customer Wise Cart Details Success';
export const LOAD_CUSTOMER_WISE_CART_DETAILS_FAIL = '[SDMS - SO] Load Customer Wise Cart Details Fail';

export const LOAD_SALES_ORDER_LINKINGS = '[SDMS - SO] Load Sales Order Linkings';
export const LOAD_SALES_ORDER_LINKINGS_SUCCESS = '[SDMS - SO] Load Sales Order Linkings Success';
export const LOAD_SALES_ORDER_LINKINGS_FAIL = '[SDMS - SO] Load Sales Order Linkings Fail';

export const LOAD_PRICE = '[SDMS - SO] Load Price';
export const LOAD_PRICE_SUCCESS = '[SDMS - SO] Load Price Success';
export const LOAD_PRICE_FAIL = '[SDMS - SO] Load Price Fail';

export const LOAD_AVAILABLE_STOCK = '[SDMS - SO] Load Available Stock';
export const LOAD_AVAILABLE_STOCK_SUCCESS = '[SDMS - SO] Load Available Stock Success';
export const LOAD_AVAILABLE_STOCK_FAIL = '[SDMS - SO] Load Available Stock Fail';

export const LOAD_TAXES = '[SDMS - SO] Load Taxes';
export const LOAD_TAXES_SUCCESS = '[SDMS - SO] Load Taxes Success';
export const LOAD_TAXES_FAIL = '[SDMS - SO] Load Taxes Fail';
export const RESET_TAXES = '[SDMS - SO] RESET Taxes';

export const LOAD_ITEM_WISE_TAXES = '[SDMS - SO] Load Itemwise Taxes';
export const LOAD_ITEM_WISE_TAXES_SUCCESS = '[SDMS - SO] Load Itemwise Taxes Success';
export const LOAD_ITEM_WISE_TAXES_FAIL = '[SDMS - SO] Load Itemwise Taxes Fail';
export const RESET_ITEM_WISE_TAXES = '[SDMS - SO] Reset Itemwise Taxes';

export const LOAD_UOM_CONVERSION_FACTOR = '[SDMS - SO] Load UOM Conversion Factor Stock';
export const LOAD_UOM_CONVERSION_FACTOR_SUCCESS = '[SDMS - SO] Load UOM Conversion Factor Stock Success';
export const LOAD_UOM_CONVERSION_FACTOR_FAIL = '[SDMS - SO] Load UOM Conversion Factor Stock Fail';

export const ADD_TO_CART = '[SDMS - SO]  Add to cart';
export const ADD_TO_CART_SUCCESS = '[SDMS - SO]  Add to cart Success';
export const ADD_TO_CART_FAIL = '[SDMS - SO]  Add to cart Fail';

export const UPDATE_CART = '[SDMS - SO]  Update Cart';
export const UPDATE_CART_SUCCESS = '[SDMS - SO]  Update Cart Success';
export const UPDATE_CART_FAIL = '[SDMS - SO]  Update Cart Fail';

export const DELETE_PRODUCT = '[SDMS - SO] Delete product';
export const DELETE_PRODUCT_SUCCESS = '[SDMS - SO] Delete product Success';
export const DELETE_PRODUCT_FAIL = '[SDMS - SO] Delete product Fail';

export const SET_ORDER_HEADER = '[SDMS - SO] Set Order Header';
export const SET_DELIVERY_SCHEDULE = '[SDMS - SO] Set Delivery Schedule';
export const SET_CURRENT_ORDER = '[SDMS - SO] Set Current Order';
export const SET_PREVIOUS_ORDER_AS_CURRENT_ORDER = '[SDMS - SO] Set Previous Order as Current Order';
export const SET_PRODUCT_SELECTED = '[SDMS - SO] Set Product Selected';
export const SET_UOM_SELECTED = '[SDMS - SO] Set UOM Selected';
export const UPDATE_PRODUCT_QUANTITY = '[SDMS - SO] Update Product Quantity';
export const RESET_ORDER_DETAILS = '[SDMS - SO] Reset Order';

export const CHECK_CREDIT_CONTROL = '[SDMS - SO] Check Credit Control';
export const CHECK_CREDIT_CONTROL_SUCCESS = '[SDMS - SO] Check Credit Control Success';
export const CHECK_CREDIT_CONTROL_FAIL = '[SDMS - SO] Check Credit Control Fail';
export const RESET_CREDIT_CONTROL = '[SDMS - SO] Reset Credit Control Fail';

export const SAVE_SALES_ORDER = '[SDMS - SO] Save Sales Order';
export const SAVE_SALES_ORDER_SUCCESS = '[SDMS - SO] Save Sales Order Success';
export const SAVE_SALES_ORDER_FAIL = '[SDMS - SO] Save Sales Order Fail';

export const CLEAR_PRODUCT_RATE = '[SDMS - SO] Clear product Rate';

export const LOAD_FILE_DOCUMENTS = '[SDMS - SO] Load File Documents';
export const LOAD_FILE_DOCUMENTS_SUCCESS = '[SDMS - SO] Load File Documents Success';
export const LOAD_FILE_DOCUMENTS_FAIL = '[SDMS - SO] Load File Documents Fail';

export const DELETE_FILE_DOCUMENT = '[SDMS - SO] Delete File Documents';
export const DELETE_FILE_DOCUMENT_SUCCESS = '[SDMS - SO] Delete File Documents Success';
export const DELETE_FILE_DOCUMENT_FAIL = '[SDMS - SO] Delete File Documents Fail';

export const ADD_FILE_DOCUMENT = '[SDMS - SO] Add File Documents';
export const ADD_FILE_DOCUMENT_SUCCESS = '[SDMS - SO] Add File Documents Success';
export const ADD_FILE_DOCUMENT_FAIL = '[SDMS - SO] Add File Documents Fail';

export const SAVE_FILE_DOCUMENT = '[SDMS - SO] Save File Documents';
export const SAVE_FILE_DOCUMENT_SUCCESS = '[SDMS - SO] Save File Documents Success';
export const SAVE_FILE_DOCUMENT_FAIL = '[SDMS - SO] Save File Documents Fail';

export const LOAD_SESSION_FOR_FILES = '[SDMS - SO] Load Sessions for files';
export const LOAD_SESSION_FOR_FILES_SUCCESS = '[SDMS - SO] Load Sessions for files Success';
export const LOAD_SESSION_FOR_FILES_FAIL = '[SDMS - SO] Load Sessions for files Fail';

export const CHECK_VALID_FINANCIAL_YEAR = '[SDMS - SO] Check Valid Financial Year';
export const CHECK_VALID_FINANCIAL_YEAR_SUCCESS = '[SDMS - SO] Check Valid Financial Year Success';
export const CHECK_VALID_FINANCIAL_YEAR_FAIL = '[SDMS - SO] Check Valid Financial Year Fail';

export const LOAD_SOPO_HEADER_SR_NO = '[SDMS - SO] Load SOPO Header Sr. No.';
export const LOAD_SOPO_HEADER_SR_NO_SUCCESS = '[SDMS - SO] Load SOPO Header Sr. No. Success';
export const LOAD_SOPO_HEADER_SR_NO_FAIL = '[SDMS - SO] Load SOPO Header Sr. No. Fail';

export const LOAD_GL_SL_CODE = '[SDMS - SO] Load GL SL Code';
export const LOAD_GL_SL_CODE_SUCCESS = '[SDMS - SO] Load GL SL Code Success';
export const LOAD_GL_SL_CODE_FAIL = '[SDMS - SO] Load GL SL Code Fail';

export const SAVE_SO_ADVANCE = '[SDMS - SO] Save SO Advance';
export const SAVE_SO_ADVANCE_SUCCESS = '[SDMS - SO] Save SO Advance Success';
export const SAVE_SO_ADVANCE_FAIL = '[SDMS - SO] Save SO Advance Fail';

export const RESET_CUSTOMERS = '[SDMS - SO] Reset Customer';

export class LoadCustomersAction implements Action {
    readonly type = LOAD_CUSTOMERS;
    constructor(public payload: ISOColCustomersRequest) {
    }
}
export class LoadCustomersSuccessAction implements Action {
    readonly type = LOAD_CUSTOMERS_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadCustomersFailAction implements Action {
    readonly type = LOAD_CUSTOMERS_FAIL;
    constructor(public payload: any){
    }
}
export class resetCustomer implements Action {
    readonly type = RESET_CUSTOMERS;
    constructor(public payload ?: any){
    }
}
export class AddLocationOfEmployeeAsPerRoleAction implements Action {
    readonly type = ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE;
    constructor(public payload?: any){
    }
}
export class AddLocationOfEmployeeAsPerRoleSuccessAction implements Action {
    readonly type = ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE_SUCCESS;
    constructor(public payload: any){
    }
}

export class AddLocationOfEmployeeAsPerRoleFailAction implements Action {
    readonly type = ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE_FAIL;
    constructor(public payload: any){
    }
}

export class LoadLocationsAction implements Action {
    readonly type = LOAD_LOCATIONS;
    constructor(public payload: string) {
    }
}
export class LoadLocationsSuccessAction implements Action {
    readonly type = LOAD_LOCATIONS_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadLocationsFailAction implements Action {
    readonly type = LOAD_LOCATIONS_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadEppsCodesAction implements Action {
    readonly type = LOAD_EPPS_CODES;
    constructor(public payload: IECodeRequest) {
    }
}
export class LoadEppsCodesSuccessAction implements Action {
    readonly type = LOAD_EPPS_CODES_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadEppsCodesFailAction implements Action {
    readonly type = LOAD_EPPS_CODES_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadProductListAction implements Action {
    readonly type = LOAD_PRODUCT_LIST;
    constructor(public payload: IProductListRquest) {
    }
}
export class LoadProductListSuccessAction implements Action {
    readonly type = LOAD_PRODUCT_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadProductListFailAction implements Action {
    readonly type = LOAD_PRODUCT_LIST_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadUomListAction implements Action {
    readonly type = LOAD_UOM_LIST;
    constructor(public payload: IUOMRequest) {
    }
}
export class LoadUomListSuccessAction implements Action {
    readonly type = LOAD_UOM_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadUomListFailAction implements Action {
    readonly type = LOAD_UOM_LIST_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadCustomerPreviousOrdersAction implements Action {
    readonly type = LOAD_CUSTOMER_PREVIOUS_ORDERS;
    constructor(public payload: IProductListRquest) {
    }
}
export class LoadCustomerPreviousOrdersSuccessAction implements Action {
    readonly type = LOAD_CUSTOMER_PREVIOUS_ORDERS_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadCustomerPreviousOrdersFailAction implements Action {
    readonly type = LOAD_CUSTOMER_PREVIOUS_ORDERS_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadCustomerWiseCartDetailsAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_CART_DETAILS;
    constructor(public payload: IProductListRquest) {
    }
}
export class LoadCustomerWiseCartDetailsSuccessAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_CART_DETAILS_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadCustomerWiseCartDetailsFailAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_CART_DETAILS_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadSalesOrderLinkingsAction implements Action {
    readonly type = LOAD_SALES_ORDER_LINKINGS;
    constructor(public payload: IProductListRquest) {
    }
}
export class LoadSalesOrderLinkingsSuccessAction implements Action {
    readonly type = LOAD_SALES_ORDER_LINKINGS_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadSalesOrderLinkingsFailAction implements Action {
    readonly type = LOAD_SALES_ORDER_LINKINGS_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadPriceAction implements Action {
    readonly type = LOAD_PRICE;
    constructor(public payload: IPriceRequest) {
    }
}
export class LoadPriceSuccessAction implements Action {
    readonly type = LOAD_PRICE_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadPriceFailAction implements Action {
    readonly type = LOAD_PRICE_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadAvailableStockAction implements Action {
    readonly type = LOAD_AVAILABLE_STOCK;
    constructor(public payload?: any) {
    }
}
export class LoadAvailableStockSuccessAction implements Action {
    readonly type = LOAD_AVAILABLE_STOCK_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadAvailableStockFailAction implements Action {
    readonly type = LOAD_AVAILABLE_STOCK_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadTaxesAction implements Action {
    readonly type = LOAD_TAXES;
    constructor(public payload: ITaxRequest) {
    }
}
export class LoadTaxesSuccessAction implements Action {
    readonly type = LOAD_TAXES_SUCCESS;
    constructor(public payload: ITax[]) {
    }
}
export class LoadTaxesFailAction implements Action {
    readonly type = LOAD_TAXES_FAIL;
    constructor(public payload: any) {
    }
}
export class ResetTaxesAction implements Action {
    readonly type = RESET_TAXES;
    constructor(public payload?: any) {
    }
}

export class LoadItemWiseTaxesAction implements Action {
    readonly type = LOAD_ITEM_WISE_TAXES;
    constructor(public payload: IItemWiseTaxRequest) {
    }
}
export class LoadItemWiseTaxesSuccessAction implements Action {
    readonly type = LOAD_ITEM_WISE_TAXES_SUCCESS;
    constructor(public payload: ITax[]) {
    }
}
export class LoadItemWiseTaxesFailAction implements Action {
    readonly type = LOAD_ITEM_WISE_TAXES_FAIL;
    constructor(public payload: any) {
    }
}
export class ResetItemWiseTaxesAction implements Action {
    readonly type = RESET_ITEM_WISE_TAXES;
    constructor(public payload?: any) {
    }
}

export class LoadUOMConversionFactorAction implements Action {
    readonly type = LOAD_UOM_CONVERSION_FACTOR;
    constructor(public payload: IConversionFactorRequest) {
    }
}
export class LoadUOMConversionFactorSuccessAction implements Action {
    readonly type = LOAD_UOM_CONVERSION_FACTOR_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadUOMConversionFactorFailAction implements Action {
    readonly type = LOAD_UOM_CONVERSION_FACTOR_FAIL;
    constructor(public payload: any) {
    }
}

export class AddToCartAction implements Action {
    readonly type = ADD_TO_CART;
    constructor(public payload: ISOSaveRequest) {
    }
}
export class AddToCartSuccessAction implements Action {
    readonly type = ADD_TO_CART_SUCCESS;
    constructor(public payload: any) {
    }
}
export class AddToCartFailAction implements Action {
    readonly type = ADD_TO_CART_FAIL;
    constructor(public payload: any) {
    }
}

export class UpdateCartAction implements Action {
    readonly type = UPDATE_CART;
    constructor(public payload: ISOUpdateRequest) {
    }
}
export class UpdateCartSuccessAction implements Action {
    readonly type = UPDATE_CART_SUCCESS;
    constructor(public payload: any) {
    }
}
export class UpdateCartFailAction implements Action {
    readonly type = UPDATE_CART_FAIL;
    constructor(public payload: any) {
    }
}

export class DeleteProductAction implements Action {
    readonly type = DELETE_PRODUCT;
    constructor(public payload: IDeleteProductRequest) {
    }
}
export class DeleteProductSuccessAction implements Action {
    readonly type = DELETE_PRODUCT_SUCCESS;
    constructor(public payload: ICart[]) {
    }
}
export class DeleteProductFailAction implements Action {
    readonly type = DELETE_PRODUCT_FAIL;
    constructor(public payload: any) {
    }
}

export class SetOrderHeaderAction implements Action {
    readonly type = SET_ORDER_HEADER;
    constructor(public payload: IOrderHeader) {
    }
}

export class SetDeliveryScheduleAction implements Action {
    readonly type = SET_DELIVERY_SCHEDULE;
    constructor(public payload: IDeliverySchedule[]) {
    }
}
export class SetCurrentOrderAction implements Action {
    readonly type = SET_CURRENT_ORDER;
    constructor(public payload: ICart) {
    }
}
export class SetPreviousOrderAsCurrentOrderAction implements Action {
    readonly type = SET_PREVIOUS_ORDER_AS_CURRENT_ORDER;
    constructor(public payload: IPreviousOrder) {
    }
}
export class SetProductSelectedAction implements Action {
    readonly type = SET_PRODUCT_SELECTED;
    constructor(public payload: IProduct) {
    }
}

export class SetUOMSelectedAction implements Action {
    readonly type = SET_UOM_SELECTED;
    constructor(public payload: IUOM) {
    }
}
export class UpdateProductQuantityAction implements Action {
    readonly type = UPDATE_PRODUCT_QUANTITY;
    constructor(public payload: number) {
    }
}
export class ResetOrderDetailsAction implements Action {
    readonly type = RESET_ORDER_DETAILS;
    constructor(public payload?: any) {
    }
}

export class CheckCreditControlAction implements Action {
    readonly type = CHECK_CREDIT_CONTROL;
    constructor(public payload: ICreditCheckRequest) {
    }
}
export class CheckCreditControlSuccessAction implements Action {
    readonly type = CHECK_CREDIT_CONTROL_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CheckCreditControlFailAction implements Action {
    readonly type = CHECK_CREDIT_CONTROL_FAIL;
    constructor(public payload: any) {
    }
}
export class ResetCreditControlAction implements Action {
    readonly type = RESET_CREDIT_CONTROL;
    constructor(public payload?: any) {
    }
}

export class SaveSalesOrderAction implements Action {
    readonly type = SAVE_SALES_ORDER;
    constructor(public payload: ISaveSORequest) {
    }
}
export class SaveSalesOrderSuccessAction implements Action {
    readonly type = SAVE_SALES_ORDER_SUCCESS;
    constructor(public payload: any) {
    }
}
export class SaveSalesOrderFailAction implements Action {
    readonly type = SAVE_SALES_ORDER_FAIL;
    constructor(public payload: any) {
    }
}

export class ClearProductRateAction implements Action {
    readonly type = CLEAR_PRODUCT_RATE;
    constructor(public payload?: any) {
    }
}

export class LoadFileDocumentsAction implements Action {
    readonly type = LOAD_FILE_DOCUMENTS;
    constructor(public payload: string) {
    }
}
export class LoadFileDocumentsSuccessAction implements Action {
    readonly type = LOAD_FILE_DOCUMENTS_SUCCESS;
    constructor(public payload: IFileDocuments) {
    }
}
export class LoadFileDocumentsFailAction implements Action {
    readonly type = LOAD_FILE_DOCUMENTS_FAIL;
    constructor(public payload: any) {
    }
}

export class DeleteFileDocumentAction implements Action {
    readonly type = DELETE_FILE_DOCUMENT;
    constructor(public payload: IDeleteFileDocumentRequest) {
    }
}
export class DeleteFileDocumentSuccessAction implements Action {
    readonly type = DELETE_FILE_DOCUMENT_SUCCESS;
    constructor(public payload: any) {
    }
}
export class DeleteFileDocumentFailAction implements Action {
    readonly type = DELETE_FILE_DOCUMENT_FAIL;
    constructor(public payload: any) {
    }
}

export class AddFileDocumentAction implements Action {
    readonly type = ADD_FILE_DOCUMENT;
    constructor(public payload: IUploadFileRequest) {
    }
}
export class AddFileDocumentSuccessAction implements Action {
    readonly type = ADD_FILE_DOCUMENT_SUCCESS;
    constructor(public payload: any) {
    }
}
export class AddFileDocumentFailAction implements Action {
    readonly type = ADD_FILE_DOCUMENT_FAIL;
    constructor(public payload: any) {
    }
}

export class SaveFileDocumentAction implements Action {
    readonly type = SAVE_FILE_DOCUMENT;
    constructor(public payload: IFileSrNoUpdateRequest) {
    }
}
export class SaveFileDocumentSuccessAction implements Action {
    readonly type = SAVE_FILE_DOCUMENT_SUCCESS;
    constructor(public payload: any) {
    }
}
export class SaveFileDocumentFailAction implements Action {
    readonly type = SAVE_FILE_DOCUMENT_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadSessionForFilesAction implements Action {
    readonly type = LOAD_SESSION_FOR_FILES;
    constructor(public payload?: any) {
    }
}
export class LoadSessionForFilesSuccessAction implements Action {
    readonly type = LOAD_SESSION_FOR_FILES_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadSessionForFilesFailAction implements Action {
    readonly type = LOAD_SESSION_FOR_FILES_FAIL;
    constructor(public payload: any) {
    }
}

export class CheckValidFinancialYearAction implements Action {
    readonly type = CHECK_VALID_FINANCIAL_YEAR;
    constructor(public payload: ICheckFinancialYearRequest) {
    }
}
export class CheckValidFinancialYearSuccessAction implements Action {
    readonly type = CHECK_VALID_FINANCIAL_YEAR_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CheckValidFinancialYearFailAction implements Action {
    readonly type = CHECK_VALID_FINANCIAL_YEAR_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadSOPOHeaderSrNoAction implements Action {
    readonly type = LOAD_SOPO_HEADER_SR_NO;
    constructor(public payload: string) {
    }
}
export class LoadSOPOHeaderSrNoSuccessAction implements Action {
    readonly type = LOAD_SOPO_HEADER_SR_NO_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadSOPOHeaderSrNoFailAction implements Action {
    readonly type = LOAD_SOPO_HEADER_SR_NO_FAIL;
    constructor(public payload: any) {
    }
}

export class LoadGlSlCodeAction implements Action {
    readonly type = LOAD_GL_SL_CODE;
    constructor(public payload?: any) {
    }
}
export class LoadGlSlCodeSuccessAction implements Action {
    readonly type = LOAD_GL_SL_CODE_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadGlSlCodeFailAction implements Action {
    readonly type = LOAD_GL_SL_CODE_FAIL;
    constructor(public payload: any) {
    }
}

export class SaveSoAdvanceAction implements Action {
    readonly type = SAVE_SO_ADVANCE;
    constructor(public payload: ISOAdvanceCollectionRequest) {
    }
}
export class SaveSoAdvanceSuccessAction implements Action {
    readonly type = SAVE_SO_ADVANCE_SUCCESS;
    constructor(public payload: any) {
    }
}
export class SaveSoAdvanceFailAction implements Action {
    readonly type = SAVE_SO_ADVANCE_FAIL;
    constructor(public payload: any) {
    }
}

//---------------PriceBook Header-------------------------

export const LOAD_PRICE_BOOK_HEADER = '[SDMS - SO] Load Price Book Header';
export const LOAD_PRICE_BOOK_HEADER_SUCCESS = '[SDMS - SO] Load Price Book Header Success';
export const LOAD_PRICE_BOOK_HEADER_FAIL = '[SDMS - SO] Load Price Book Header Fail';

export class LoadPriceBookHeaderAction implements Action {
    readonly type = LOAD_PRICE_BOOK_HEADER;
    constructor(public payload: IPriceBookHeaderDmDetailsRequest) {
    }
}
export class LoadPriceBookHeaderSuccessAction implements Action {
    readonly type = LOAD_PRICE_BOOK_HEADER_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadPriceBookHeaderFailAction implements Action {
    readonly type = LOAD_PRICE_BOOK_HEADER_FAIL;
    constructor(public payload: any) {
    }
}

//---------------DM Details -------------------------

export const LOAD_DM_DETAILS = '[SDMS - SO] Load DM Details';
export const LOAD_DM_DETAILS_SUCCESS = '[SDMS - SO] Load DM Details Success';
export const LOAD_DM_DETAILS_FAIL = '[SDMS - SO] Load DM Details Fail';

export class LoadDmDetailsAction implements Action {
    readonly type = LOAD_DM_DETAILS;
    constructor(public payload: IPriceBookHeaderDmDetailsRequest) {
    }
}
export class LoadDmDetailsSuccessAction implements Action {
    readonly type = LOAD_DM_DETAILS_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadDmDetailsFailAction implements Action {
    readonly type = LOAD_DM_DETAILS_FAIL;
    constructor(public payload: any) {
    }
}

//---------------GL Sl Code Advance -------------------------

export const LOAD_GL_SL_CODE_ADV = '[SDMS - SO] Load Gl Sl Code Advance';
export const LOAD_GL_SL_CODE_ADV_SUCCESS = '[SDMS - SO] Load Gl Sl Code Advance Success';
export const LOAD_GL_SL_CODE_ADV_FAIL = '[SDMS - SO] Load Gl Sl Code Advance Fail';

export class LoadGlSlCodeAdvAction implements Action {
    readonly type = LOAD_GL_SL_CODE_ADV;
    constructor(public payload?: any) {
    }
}
export class LoadGlSlCodeAdvSuccessAction implements Action {
    readonly type = LOAD_GL_SL_CODE_ADV_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadGlSlCodeAdvFailAction implements Action {
    readonly type = LOAD_GL_SL_CODE_ADV_FAIL;
    constructor(public payload: any) {
    }
}

//---------------FA Auto Advance -------------------------

export const LOAD_FA_AUTO_ADV = '[SDMS - SO] Load FA Auto Advance';
export const LOAD_FA_AUTO_ADV_SUCCESS = '[SDMS - SO] Load FA Auto Advance Success';
export const LOAD_FA_AUTO_ADV_FAIL = '[SDMS - SO] Load FA Auto Advance Fail';

export class LoadFaAutoAdvAction implements Action {
    readonly type = LOAD_FA_AUTO_ADV;
    constructor(public payload: IAutoAdvanceRequest) {
    }
}
export class LoadFaAutoAdvSuccessAction implements Action {
    readonly type = LOAD_FA_AUTO_ADV_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadFaAutoAdvFailAction implements Action {
    readonly type = LOAD_FA_AUTO_ADV_FAIL;
    constructor(public payload: any) {
    }
}

//------------------------get Customer wise Cart Item Count ----------------------------------------
export const LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT = '[SDMS - SO] Get Customer wise Cart Item Count';
export const LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT_SUCCESS = '[SDMS - SO] Get Customer wise Cart Item Count Success';
export const LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT_FAIL = '[SDMS - SO] Get Customer wise Cart Item Count Fail';

export class LoadCustomerWiseCartItemsCountAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT;
    constructor(public payload: IProductListRquest) {
    }
}
export class LoadCustomerWiseCartItemsCountSuccessAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadCustomerWiseCartItemsCountFailAction implements Action {
    readonly type = LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT_FAIL;
    constructor(public payload: any) {
    }
}

/*
        Manual rate change provison Date 13-jul 2018 
*/
export const UPDATE_PRODUCT_RATE = '[SDMS - SO] Update Product Rate';
export class UpdateProductRateAction implements Action {
    readonly type = UPDATE_PRODUCT_RATE;
    constructor(public payload: number) {
    }
}

/*
        Manual discount change provison
*/
export const UPDATE_PRODUCT_DISCOUNT = '[SDMS - SO] Update Product Discount';
export class UpdateProductDiscountAction implements Action {
    readonly type = UPDATE_PRODUCT_DISCOUNT;
    constructor(public payload: number) {
    }
}


export const SET_DELSHEDULE_OPEN = '[SDMS - SO] Set Delivery Schedule Open';
export class SetDeliveryScheduleOpenAction implements Action {
    readonly type = SET_DELSHEDULE_OPEN;
    constructor(public payload: any) {
    }
}

export const SET_RATE_EDITABLE = '[SDMS - SO] Set Item Rate Maunal Entry Editable';
export class SetRateEditableAction implements Action {
    readonly type = SET_RATE_EDITABLE;
    constructor(public payload: any) {
    }
}

export const SET_DISCOUNT_EDITABLE = '[SDMS - SO] Set Item Discount Maunal Entry Editable';
export class SetDiscountEditableAction implements Action {
    readonly type = SET_DISCOUNT_EDITABLE;
    constructor(public payload: any) {
    }
}

export const SET_DISCOUNT_TYPE = '[SDMS - SO] Set Item Discount Type';
export class SetDiscountTypeAction implements Action {
    readonly type = SET_DISCOUNT_TYPE;
    constructor(public payload: any) {
    }
}




//-------------------------Load Discount Matrix Details --------------------------------------

export const LOAD_MANUAL_DISCOUNT_MATRIX = '[SDMS - SO] Load Discount Matrix Details';
export const LOAD_MANUAL_DISCOUNT_MATRIX_SUCCESS = '[SDMS - SO] Load Discount Matrix Success';
export const LOAD_MANUAL_DISCOUNT_MATRIX_FAIL = '[SDMS - SO] Load Discount Matrix Fail';

export class LoadManualDiscountMatrixDetailsAction implements Action {
    readonly type = LOAD_MANUAL_DISCOUNT_MATRIX;
    constructor(public payload: IPriceRequest) {
    }
}
export class LoadManualDiscountMatrixDetailsSuccessAction implements Action {
    readonly type = LOAD_MANUAL_DISCOUNT_MATRIX_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadManualDiscountMatrixDetailsFailAction implements Action {
    readonly type = LOAD_MANUAL_DISCOUNT_MATRIX_FAIL;
    constructor(public payload: any) {
    }
}

export const CHECK_CREDIT_CONTROL_BEFORE_SO = '[SDMS - SO] Check Credit Control Before Book Order';
export const CHECK_CREDIT_CONTROL__BEFORE_SO_SUCCESS = '[SDMS - SO] Check Credit Control Before Book Order Success';
export const CHECK_CREDIT_CONTROL__BEFORE_SO_FAIL = '[SDMS - SO] Check Credit Control Before Book Order Fail';
export const RESET_CREDIT_CONTROL_BEFORE_SO = '[SDMS - SO] Reset Credit Control Before Book Order';


export class CheckCreditControlBeforSOAction implements Action {
    readonly type = CHECK_CREDIT_CONTROL_BEFORE_SO;
    constructor(public payload: ICreditCheckRequest) {
    }
}
export class CheckCreditControlBeforSOSuccessAction implements Action {
    readonly type = CHECK_CREDIT_CONTROL__BEFORE_SO_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CheckCreditControlBeforSOFailAction implements Action {
    readonly type = CHECK_CREDIT_CONTROL__BEFORE_SO_FAIL;
    constructor(public payload: any) {
    }
}
export class ResetCreditControlBeforSOAction implements Action {
    readonly type = RESET_CREDIT_CONTROL_BEFORE_SO;
    constructor(public payload?: any) {
    }
}

export const CUST_OUTSTAND_AMT = '[SDMS - SO] Customer Outstanding Amount';
export const CUST_OUTSTAND_AMT_SUCCESS = '[SDMS - SO] Customer Outstanding Amount Success';
export const CUST_OUTSTAND_AMT_FAIL = '[SDMS - SO] Customer Outstanding Amount Fail';


export class LoadCustOutStandingAmountAction implements Action {
    readonly type = CUST_OUTSTAND_AMT;
    constructor(public payload: ICustOutAmutRequest) {
    }
}
export class LoadCustOutStandingAmountSuccessAction implements Action {
    readonly type = CUST_OUTSTAND_AMT_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoadCustOutStandingAmountFailAction implements Action {
    readonly type = CUST_OUTSTAND_AMT_FAIL;
    constructor(public payload: any) {
    }
}

export const DELETE_IMAGE_STORAGE = '[SDMS - SO] Delete Image From Local Storage';
export const DELETE_IMAGE_STORAGE_SUCCESS = '[SDMS - SO] Delete Image From Local Storage Success';
export const DELETE_IMAGE_STORAGE_FAIL = '[SDMS - SO] Delete Image From Local Storage Fail';

export class DeleteImgStorageAction implements Action {
    readonly type = DELETE_IMAGE_STORAGE;
    constructor(public payload: IDeleteFileDocumentRequest) {
    }
}
export class DeleteImgStorageSuccessAction implements Action {
    readonly type = DELETE_IMAGE_STORAGE_SUCCESS;
    constructor(public payload: any) {
    }
}
export class DeleteImgStorageFailAction implements Action {
    readonly type = DELETE_IMAGE_STORAGE_FAIL;
    constructor(public payload: any) {
    }
}

// cord for add to cart disable
export const IS_ADD_TO_CART_DISABLED = '[SDMS - SO] Is Add To Cart Disabled';

export class AddToCartDisabledButtonAction implements Action {
    readonly type = IS_ADD_TO_CART_DISABLED;
    constructor(public payload: any) { }
}

/* Load customer with Pagination*/

export const LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL = '[SDMS - SO] Load Customers with Infinity Scroll';
export const LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_SUCCESS = '[SDMS - SO] Load Customers with Infinity Scroll Success';
export const LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_FAIL = '[SDMS - SO]Load Customers with Infinity Scroll Fail';

export class LoadCustomersListWithInfinityScrollAction implements Action {
    readonly type = LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL;
    constructor(public payload?: ICustomerDetailsAsyncRequest){
    }
}
export class LoadCustomersListWithInfinityScrollSuccessAction implements Action {
    readonly type = LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_SUCCESS;
    constructor(public payload: any){
    }
}
export class LoadCustomersListWithInfinityScrollFailAction implements Action {
    readonly type = LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_FAIL;
    constructor(public payload: any){
    }
}



export type soActions =
    LoadCustomersAction |
    LoadCustomersSuccessAction |
    LoadCustomersFailAction |

    AddLocationOfEmployeeAsPerRoleAction |
    AddLocationOfEmployeeAsPerRoleSuccessAction |
    AddLocationOfEmployeeAsPerRoleFailAction |

    LoadLocationsAction |
    LoadLocationsSuccessAction |
    LoadLocationsFailAction |

    LoadEppsCodesAction |
    LoadEppsCodesSuccessAction |
    LoadEppsCodesFailAction |

    LoadProductListAction |
    LoadProductListSuccessAction |
    LoadProductListFailAction |

    LoadUomListAction |
    LoadUomListSuccessAction |
    LoadUomListFailAction |

    LoadCustomerPreviousOrdersAction |
    LoadCustomerPreviousOrdersSuccessAction |
    LoadCustomerPreviousOrdersFailAction |

    LoadCustomerWiseCartDetailsAction |
    LoadCustomerWiseCartDetailsSuccessAction |
    LoadCustomerWiseCartDetailsFailAction |

    LoadSalesOrderLinkingsAction |
    LoadSalesOrderLinkingsSuccessAction |
    LoadSalesOrderLinkingsFailAction |

    LoadPriceAction |
    LoadPriceSuccessAction |
    LoadPriceFailAction |

    LoadAvailableStockAction |
    LoadAvailableStockSuccessAction |
    LoadAvailableStockFailAction |

    LoadTaxesAction |
    LoadTaxesSuccessAction |
    LoadTaxesFailAction |
    ResetTaxesAction |

    LoadItemWiseTaxesAction |
    LoadItemWiseTaxesSuccessAction |
    LoadItemWiseTaxesFailAction |
    ResetItemWiseTaxesAction |

    LoadUOMConversionFactorAction |
    LoadUOMConversionFactorSuccessAction |
    LoadUOMConversionFactorFailAction |

    AddToCartAction |
    AddToCartSuccessAction |
    AddToCartFailAction |

    UpdateCartAction |
    UpdateCartSuccessAction |
    UpdateCartFailAction |

    DeleteProductAction |
    DeleteProductSuccessAction |
    DeleteProductFailAction |

    SetOrderHeaderAction |
    SetDeliveryScheduleAction |
    SetCurrentOrderAction |
    SetProductSelectedAction |
    SetUOMSelectedAction |
    UpdateProductQuantityAction |
    SetPreviousOrderAsCurrentOrderAction |
    ResetOrderDetailsAction |

    CheckCreditControlAction |
    CheckCreditControlSuccessAction |
    CheckCreditControlFailAction |
    ResetCreditControlAction |

    SaveSalesOrderAction |
    SaveSalesOrderSuccessAction |
    SaveSalesOrderFailAction |

    ClearProductRateAction |

    LoadFileDocumentsAction |
    LoadFileDocumentsSuccessAction |
    LoadFileDocumentsFailAction |

    DeleteFileDocumentAction |
    DeleteFileDocumentSuccessAction |
    DeleteFileDocumentFailAction |

    AddFileDocumentAction |
    AddFileDocumentSuccessAction |
    AddFileDocumentFailAction |

    SaveFileDocumentAction |
    SaveFileDocumentSuccessAction |
    SaveFileDocumentFailAction |

    LoadSessionForFilesAction |
    LoadSessionForFilesSuccessAction |
    LoadSessionForFilesFailAction |

    CheckValidFinancialYearAction |
    CheckValidFinancialYearSuccessAction |
    CheckValidFinancialYearFailAction |

    LoadSOPOHeaderSrNoAction |
    LoadSOPOHeaderSrNoSuccessAction |
    LoadSOPOHeaderSrNoFailAction |

    LoadGlSlCodeAction |
    LoadGlSlCodeSuccessAction |
    LoadGlSlCodeFailAction |

    SaveSoAdvanceAction |
    SaveSoAdvanceSuccessAction |
    SaveSoAdvanceFailAction |

    LoadPriceBookHeaderAction |
    LoadPriceBookHeaderSuccessAction |
    LoadPriceBookHeaderFailAction |

    LoadDmDetailsAction |
    LoadDmDetailsSuccessAction |
    LoadDmDetailsFailAction |

    LoadGlSlCodeAdvAction |
    LoadGlSlCodeAdvSuccessAction |
    LoadGlSlCodeAdvFailAction |

    LoadFaAutoAdvAction |
    LoadFaAutoAdvSuccessAction |
    LoadFaAutoAdvFailAction |

    LoadCustomerWiseCartItemsCountAction |
    LoadCustomerWiseCartItemsCountSuccessAction |
    LoadCustomerWiseCartItemsCountFailAction |

    UpdateProductRateAction |
    UpdateProductDiscountAction |
    SetDeliveryScheduleOpenAction |
    SetRateEditableAction |
    SetDiscountEditableAction |

    LoadManualDiscountMatrixDetailsAction |
    LoadManualDiscountMatrixDetailsSuccessAction |
    LoadManualDiscountMatrixDetailsFailAction |

    CheckCreditControlBeforSOAction |
    CheckCreditControlBeforSOSuccessAction |
    CheckCreditControlBeforSOFailAction |
    ResetCreditControlBeforSOAction |

    LoadCustOutStandingAmountAction |
    LoadCustOutStandingAmountSuccessAction |
    LoadCustOutStandingAmountFailAction |

    DeleteImgStorageAction |
    DeleteImgStorageSuccessAction |
    DeleteImgStorageFailAction |
    AddToCartDisabledButtonAction |

    LoadCustomersListWithInfinityScrollAction|
    LoadCustomersListWithInfinityScrollSuccessAction|
    LoadCustomersListWithInfinityScrollFailAction |
    resetCustomer;

