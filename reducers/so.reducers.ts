import * as fromSO from '../actions/so.actions';
import { IEmplolyeeLocation, IAutoAdvanceData, IGlSlCodeAdvData, ISOCustomer, IOrderHeader, ICart, IProduct, IUOM, IPreviousOrder, IOrderDetails } from '../../models/so.interface';
import { IEcode } from '../../../shared/models/ecode.interface';
import { ILocation } from '../../../shared/models/location.interface';
import { state } from '../../../../node_modules/@angular/core';

export interface ISOState {
    loading: boolean,
    locationDetailOfLoggedEmp: IEmplolyeeLocation,
    customerList: Array<ISOCustomer>,
    ecodes: Array<IEcode>,
    locations: Array<ILocation>,
    orderDetails: IOrderDetails,
    customerDetail: any,
    customerDetailLoading: boolean,
    customerDetailSuccessLoading: boolean,
    globalCustomerList: Array<ISOCustomer>
}

const initialState: ISOState = {
    loading: false,
    locationDetailOfLoggedEmp: null,
    customerList: [],
    globalCustomerList: [],
    ecodes: [],
    locations: [],
    customerDetail: null,
    customerDetailLoading: false,
    customerDetailSuccessLoading: false,
    orderDetails: {
        orderHeader: null,
        cart: {
            itemFcRate: '0',
            itemFcVal: '0',
            itemQty: '0',
            itemCode: '',
            billUom: '0',
            isOpenFromDelievrySchdule: false,
            discRate: '0',
            isUserChangedProduct: false,
            mobileSaleDelSchedlist: [],
            isOpenFromCart:false,
            manualRateFlag : false,            
        },
        productList: [],
        productListLoaded: false,
        UOMList: [],
        UOMListLoaded: false,
        customerPreviousOrders: [],
        customerPreviousOrdersLoaded: false,
        customerWiseCartDetails: [],
        customerWiseCartDetailsLoaded: false,
        salesOrderLinkings: [],
        salesOrderLinkingsLoaded: false,
        itemPriceInfo: null,
        itemPriceSaved: null,
        orderTaxes: [],
        orderTaxesLoaded: false,
        creditControl: null,
        creditControlLoaded: false,
        isValidFinancialYear: null,
        isValidFinancialYearLoaded: false,
        savedOrder: null,
        didFileUploaded: false,
        itemWiseTaxes: {},
        fileDocuments: null,
        priceBookHeaderData: null,
        dmDetails: null,
        faAutoAdv: null,
        cartItemCount: 0,
        customerWiseCartItemCountLoaded: false,
        isEditablePrice: true,
        isEditableDiscount: true,
        isManualRateEntered: false,        
        creditControlBeforeBO: null,
        creditControlBeforeBOLoaded: false,
        outStandingAmount: null,
        outStandAmountLoaded: false,
        isdisableCard: true,
        totalPageCount: 0,
        globalProductList: [],
    }

}
export function reducer(state = initialState, action: fromSO.soActions): ISOState {

    switch (action.type) {
        case fromSO.LOAD_CUSTOMERS:
            return { ...state, loading : true, customerList: []};
        case fromSO.LOAD_CUSTOMERS_SUCCESS : 
            let customerList = action.payload.gridRecords;
            return { ...state, loading : false, customerList: customerList };
        case fromSO.LOAD_CUSTOMERS_FAIL :
            return { ...state, loading : false };
        
        case fromSO.ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE:
            return { ...state, loading : true };
        case fromSO.ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE_SUCCESS : 
            let locationDetailOfLoggedEmp = action.payload;
        return {...state, locationDetailOfLoggedEmp: locationDetailOfLoggedEmp, loading : false };
        case fromSO.ADD_LOCATION_OF_EMPLOYEE_AS_PER_ROLE_FAIL :
            return { ...state, loading : false };
        case fromSO.LOAD_LOCATIONS:
            return { ...state, loading: true };
        case fromSO.LOAD_LOCATIONS_SUCCESS:
            let locations = action.payload;
            return { ...state, loading: false, locations };
        case fromSO.LOAD_LOCATIONS_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_EPPS_CODES:
            return { ...state, loading: true };
        case fromSO.LOAD_EPPS_CODES_SUCCESS:
            let ecodes = action.payload;
            return { ...state, loading: false, ecodes };
        case fromSO.LOAD_EPPS_CODES_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_PRODUCT_LIST:
            return { ...state, loading: true };
        case fromSO.LOAD_PRODUCT_LIST_SUCCESS: {
            let productList = action.payload;
            let productsWithRange = [];
            if (action.payload != null) {
                let noOfRecords=0;
                if( action.payload.length<20){
                    noOfRecords=action.payload.length;
                }else{
                    noOfRecords= action.payload.length > 20 ? 20 : action.payload.length;
                }
                 
                for (var i = 0; i < noOfRecords; i++)
                productsWithRange.push(productList[i]);
            }
            let totalPages = action.payload != null ? Math.ceil(action.payload.length / 20) : 0;
            let orderDetails = { ...state.orderDetails, productList: productsWithRange, totalPageCount: totalPages, globalProductList: productList, productListLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_PRODUCT_LIST_FAIL:            
            return { ...state, loading: false };

        case fromSO.LOAD_UOM_LIST:
            return { ...state, loading: true };
        case fromSO.LOAD_UOM_LIST_SUCCESS: {
            let UOMList = action.payload;
            let orderDetails = { ...state.orderDetails, UOMList, UOMListLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_UOM_LIST_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_CUSTOMER_PREVIOUS_ORDERS:
            return { ...state, loading: true };
        case fromSO.LOAD_CUSTOMER_PREVIOUS_ORDERS_SUCCESS: {
            let customerPreviousOrders = action.payload;
            let orderDetails = { ...state.orderDetails, customerPreviousOrders, customerPreviousOrdersLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_CUSTOMER_PREVIOUS_ORDERS_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_CUSTOMER_WISE_CART_DETAILS:
            return { ...state, loading: true };
        case fromSO.LOAD_CUSTOMER_WISE_CART_DETAILS_SUCCESS: {
            let customerWiseCartDetails = action.payload;
            let orderDetails = { ...state.orderDetails, customerWiseCartDetails, customerWiseCartDetailsLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_CUSTOMER_WISE_CART_DETAILS_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_TAXES:
            return { ...state, loading: true };
        case fromSO.LOAD_TAXES_SUCCESS: {
            let orderTaxes = action.payload;
            let orderDetails = { ...state.orderDetails, orderTaxes, orderTaxesLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_TAXES_FAIL:
            return { ...state, loading: false };
        case fromSO.RESET_TAXES: {
            let orderDetails = { ...state.orderDetails, orderTaxes: [], orderTaxesLoaded: false };
            return { ...state, loading: false, orderDetails }
        }

        case fromSO.LOAD_ITEM_WISE_TAXES:
            return { ...state, loading: true };
        case fromSO.LOAD_ITEM_WISE_TAXES_SUCCESS: {
            let tax: any = action.payload;
            //add taxes
            let itemWiseTaxes = { ...state.orderDetails.itemWiseTaxes };
            itemWiseTaxes[tax[0].cartDtlSrNo] = tax;
            let orderDetails = { ...state.orderDetails, itemWiseTaxes };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_ITEM_WISE_TAXES_FAIL:
            return { ...state, loading: false };
        case fromSO.RESET_ITEM_WISE_TAXES: {
            let orderDetails = { ...state.orderDetails, itemWiseTaxes: {} };
            return { ...state, loading: false, orderDetails };
        }

        case fromSO.DELETE_PRODUCT: {
            let orderDetails = { ...state.orderDetails };
            return { ...state, loading: true, orderDetails };
        }
        case fromSO.DELETE_PRODUCT_SUCCESS: {
            let customerWiseCartDetails = action.payload.length > 0 ? action.payload : [];
            let cartItemCount = action.payload.length ? action.payload.length : 0;
            let orderDetails = { ...state.orderDetails, customerWiseCartDetails: customerWiseCartDetails, cartItemCount: cartItemCount };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.DELETE_PRODUCT_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_SALES_ORDER_LINKINGS:
            return { ...state, loading: true };
        case fromSO.LOAD_SALES_ORDER_LINKINGS_SUCCESS: {
            let salesOrderLinkings = action.payload;
            let orderDetails = { ...state.orderDetails, salesOrderLinkings, salesOrderLinkingsLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_SALES_ORDER_LINKINGS_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_PRICE:
            return { ...state, loading: true };
        case fromSO.LOAD_PRICE_SUCCESS: {
            if (!state.orderDetails.cart.isOpenFromDelievrySchdule) {
                if (state.orderDetails.orderHeader.ecode.transIndicatorType != "SO_0_VAL") {
                    if (state.orderDetails.orderHeader.ecode.itemRateFlag != "MA") {
                        let itemPriceInfo = action.payload;
                        let itemPriceSaved = action.payload;                       
                        let discount;
                        if(itemPriceInfo.dmActive=="N"){
                            discount = Number(state.orderDetails.cart.discRate) > 0 ? state.orderDetails.cart.discRate : 0.00;  
                            if(discount > 0){
                                itemPriceInfo.discountUom = "P";
                            }
                        }else{
                            discount = itemPriceInfo.discValue != null ? itemPriceInfo.discValue : 0.00;//changes here
                        }
                        let price = '0';
                        let isDisablecard = true;
                        if (state.orderDetails.isManualRateEntered) {
                            price = state.orderDetails.cart ? state.orderDetails.cart.itemFcRate : '0';
                        } else {
                            if (state.orderDetails.cart.isUserChangedProduct)
                                price = itemPriceInfo.itemMrpRate;
                            else
                                price = (itemPriceInfo.itemMrpRate != 0) ? itemPriceInfo.itemMrpRate : (state.orderDetails.cart ? state.orderDetails.cart.itemFcRate : 0);
                        }
                        if (price == '0')
                            isDisablecard = true;
                        else
                            isDisablecard = false;
                        
                            if (state.orderDetails.isManualRateEntered && state.orderDetails.orderHeader.ecode.itemRateFlag == "PB") {
                                if(Object.keys(itemPriceSaved).length){
                                    if(state.orderDetails.cart.itemFcRate >= itemPriceSaved.itemMinRate && state.orderDetails.cart.itemFcRate <= itemPriceSaved.itemMaxRate){
                                        isDisablecard = false;
                                        state.orderDetails.cart.manualRateFlag = false;
                                    } else {
                                        isDisablecard = true;
                                        state.orderDetails.cart.manualRateFlag = true;    
                                    }
                                }
                            }    
    
                            let noOfItems = Number(state.orderDetails.cart.itemQty);
    
                            let total;
    
                            if(itemPriceInfo.dmActive=="N"){
                                total = (noOfItems * Number(price)) - (noOfItems * Number(price) * discount) / 100;                            
                            }else{
                                total = (noOfItems * Number(price)) - discount;
                            }
    
                            if(itemPriceInfo.dmActive=="N" && Number(state.orderDetails.cart.discRate) > 100){
                                isDisablecard = true;
                            }
    
                            if(total==0){
                                isDisablecard = true;
                            }
                        
                        let cart = { ...state.orderDetails.cart, itemFcRate: (price != undefined || price != '' || price != null ? price.toString() : '0'), itemFcVal: '' + total, discRate: discount, discUOM: itemPriceInfo.discountUom };
                        let orderDetails = { ...state.orderDetails, itemPriceInfo, itemPriceSaved, isdisableCard: isDisablecard, cart, isEditablePrice: true, isEditableDiscount: true };
                        return { ...state, loading: false, orderDetails };
                    } else if (state.orderDetails.orderHeader.ecode.itemRateFlag == "MA") {
                        let itemPriceInfo = action.payload;
                        let discount:any; 
                            discount = itemPriceInfo.discValue != null ? itemPriceInfo.discValue : 0;//changes here
                        if (state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN =="N"){
                            discount = state.orderDetails.cart.discRate;
                            itemPriceInfo.discountUom = "P";
                        }

                        let price = '0';
                        let isDisablecard = true;


                        price = state.orderDetails.cart ? state.orderDetails.cart.itemFcRate : '0';
                        

                        if (price == '0')
                            isDisablecard = true;
                        else
                            isDisablecard = false;

                        let noOfItems = Number(state.orderDetails.cart.itemQty);
                        let total;
                        
                        if (state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN =="N"){
                            total = (noOfItems * Number(price)) - (noOfItems * Number(price) * Number(discount)) / 100;
                        }else{
                            total = (noOfItems * Number(price)) - Number(discount);
                        }

                        if(state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN=="N" && Number(state.orderDetails.cart.discRate) > 100){
                            isDisablecard = true;
                        }
                        
                        if(total==0){
                            isDisablecard = true;
                        }   
                        let cart = { ...state.orderDetails.cart, itemFcRate: (price != undefined || price != '' || price != null ? price.toString() : '0'), itemFcVal: '' + total, discRate: discount, discUOM: itemPriceInfo.discountUom };
                        let orderDetails = { ...state.orderDetails, itemPriceInfo, isdisableCard:isDisablecard, cart, isEditablePrice: true };
                        return { ...state, loading: false, orderDetails };
                    }

                } else {
                    let itemPriceInfo = {
                        dMDiscountsIWise: '',
                        discValue: '',
                        discountRate: '',
                        discountUom: '',
                        dmActive: '',
                        itemMaxDiscount: '',
                        itemMaxRate: '',
                        itemMinDiscount: '',
                        itemMinRate: '',
                        itemMrpRate: '',
                        itemRate: '',
                        listDMDiscout: [],
                        maxRange: '',
                        maxRangeUom: '',
                        minRange: '',
                        minRangeUom: '',
                        packSize: '',
                        plAttached: '',
                        priceDetailSrNo: '',
                        priceHeaderSrNo: ''
                    }

                    let itemPriceSaved  = {
                        dMDiscountsIWise: '',
                        discValue: '',
                        discountRate: '',
                        discountUom: '',
                        dmActive: '',
                        itemMaxDiscount: '',
                        itemMaxRate: '',
                        itemMinDiscount: '',
                        itemMinRate: '',
                        itemMrpRate: '',
                        itemRate: '',
                        listDMDiscout: [],
                        maxRange: '',
                        maxRangeUom: '',
                        minRange: '',
                        minRangeUom: '',
                        packSize: '',
                        plAttached: '',
                        priceDetailSrNo: '',
                        priceHeaderSrNo: ''
                    };

                    let discount = '' + 0;//changes here
                    let price = '' + 0;
                    let noOfItems = Number(state.orderDetails.cart.itemQty);
                    let total;

                    if (state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN =="N"){
                        total = (noOfItems * Number(price)) - (noOfItems * Number(price) * Number(discount)) / 100;
                    }else{
                        total = (noOfItems * Number(price)) - Number(discount);
                    }
                    let isDisablecart = false;
                    let cart = { ...state.orderDetails.cart, itemFcRate: price, itemFcVal: '' + total, discRate: discount, discUOM: itemPriceInfo.discountUom };
                    let orderDetails = { ...state.orderDetails, itemPriceInfo, itemPriceSaved, isdisableCard: isDisablecart, cart, isEditablePrice: true };
                    return { ...state, loading: false, orderDetails };
                }
            } else {
                let orderDetails = { ...state.orderDetails, itemPriceInfo : action.payload, itemPriceSaved : action.payload}
                return { ...state, loading: false, orderDetails};
            }

        }
        case fromSO.LOAD_PRICE_FAIL: {
            let responseData = action.payload != null ? action.payload.error.text : "";
            if (responseData.split(':', 2)[1] == "ERROR") {
                if (!state.orderDetails.cart.isOpenFromDelievrySchdule) {

                    let itemPriceInfo  = {
                        dMDiscountsIWise: '',
                        discValue: '',
                        discountRate: '',
                        discountUom: '',
                        dmActive: '',
                        itemMaxDiscount: '',
                        itemMaxRate: '',
                        itemMinDiscount: '',
                        itemMinRate: '',
                        itemMrpRate: '',
                        itemRate: '',
                        listDMDiscout: [],
                        maxRange: '',
                        maxRangeUom: '',
                        minRange: '',
                        minRangeUom: '',
                        packSize: '',
                        plAttached: '',
                        priceDetailSrNo: '',
                        priceHeaderSrNo: ''
                    }

                   
                    let price = '0';
                    let discount = '0';
                    let isDisablecard = true;
                    if (state.orderDetails.isManualRateEntered) {
                        price = state.orderDetails.cart ? state.orderDetails.cart.itemFcRate : '0';
                        discount = state.orderDetails.cart ? state.orderDetails.cart.discRate : '0';//changes here
                        if(Number(discount) > 0){
                            itemPriceInfo.discountUom = "P"; 
                        }
                    }

                    if (price == '0' || price == '0.00')
                        isDisablecard = true;
                    else
                        isDisablecard = false;

                    let noOfItems = Number(state.orderDetails.cart.itemQty);
                    let total;
                    
                    if (state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN =="N"){
                        total = (noOfItems * Number(price)) - (noOfItems * Number(price) * Number(discount)) / 100;
                    }else{
                        total = (noOfItems * Number(price)) - Number(discount);
                    }

                    if(state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN=="N" && Number(state.orderDetails.cart.discRate) > 100){
                        isDisablecard = true;
                    }
                    
                    if(total==0){
                        isDisablecard = true;
                    }   

                    let cart = { ...state.orderDetails.cart, itemFcRate: (price != undefined || price != '' ? price.toString() : '0'), itemFcVal: '' + total, discRate: discount, discUOM: itemPriceInfo.discountUom };
                    let orderDetails = { ...state.orderDetails, itemPriceInfo, isdisableCard: isDisablecard, cart, isEditablePrice: true };
                    return { ...state, loading: false, orderDetails };

                }
                else {
                    return { ...state, loading: false, orderDetails: state.orderDetails };
                }
            }

        }
        case fromSO.LOAD_AVAILABLE_STOCK:
            return { ...state, loading: true };
        case fromSO.LOAD_AVAILABLE_STOCK_SUCCESS: {
            let cart: ICart = { ...state.orderDetails.cart, availStock: action.payload };
            let orderDetails = { ...state.orderDetails, cart };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_AVAILABLE_STOCK_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_UOM_CONVERSION_FACTOR:
            return { ...state, loading: true };
        case fromSO.LOAD_UOM_CONVERSION_FACTOR_SUCCESS: {
            let cart: ICart = { ...state.orderDetails.cart };
            if (!cart.isOpenFromDelievrySchdule) {
                let product = state.orderDetails.globalProductList.filter(product => product.itemCode == cart.itemCode)[0];
                if (product.issueUom == cart.billUom && cart.b2iUomConv) {
                    cart.soQtyIssueUom = (Number(cart.soQtyIssueUom) / Number(cart.b2iUomConv)).toString();
                } else if (product.issueUom != cart.billUom && cart.b2iUomConv) {
                    cart.soQtyIssueUom = (Number(cart.soQtyIssueUom) * Number(action.payload[0])).toString();
                }

                cart.b2iUomConv = action.payload[0];

                if (state.orderDetails.orderHeader && state.orderDetails.orderHeader.loggedInUserInfo && state.orderDetails.orderHeader.loggedInUserInfo.value.soJobNoYn == '1') {
                    cart.mobileSaleDelSchedlist = [];
                }else{
                    cart.mobileSaleDelSchedlist = [
                        {
                            toDate: new Date().toISOString(),
                            itemQty: cart.itemQty,
                            toBeDelQty: cart.itemQty,
                            itemcode: cart.itemCode
                        }
                    ]
                }
                
                let orderDetails = { ...state.orderDetails, cart };
                return { ...state, loading: false, orderDetails };
            }
        }
        case fromSO.LOAD_UOM_CONVERSION_FACTOR_FAIL:
            return { ...state, loading: false };


        case fromSO.SET_ORDER_HEADER: {
            let orderHeader = action.payload;
            let orderDetails = { ...state.orderDetails, orderHeader };
            return { ...state, orderDetails };
        }
        case fromSO.SET_PRODUCT_SELECTED: {
            if (state.orderDetails.orderHeader && state.orderDetails.orderHeader.loggedInUserInfo && state.orderDetails.orderHeader.loggedInUserInfo.value.soJobNoYn == '1') {
                let cart: ICart = {
                    ...state.orderDetails.cart,
                    itemCode: action.payload.itemCode,
                    billUom: action.payload.issueUom,
                    billUomDesc: action.payload.issueUomDesc,
                    itemQty: '1',
                    itemDisplayName: action.payload.itemDisplayName,
                    soQtyIssueUom: '1',
                    mobileSaleDelSchedlist: [],
                    isUserChangedProduct: true,
                    itemFcRate: '' + 0,
                    hsnSrNo: action.payload.hsnSrNo,
                    itemFcVal: '' + 0,
                    discRate: '' + 0,
                    discUOM: '',
                    b2iUomConv: '1',
                    isOpenFromCart : false,                   
                    isOpenFromDelievrySchdule:false

                };
                let orderDetails = { ...state.orderDetails, cart, UOMList: [], UOMListLoaded: false };
                return { ...state, orderDetails };
            } else {
                let cart: ICart = {
                    ...state.orderDetails.cart,
                    itemCode: action.payload.itemCode,
                    billUom: action.payload.issueUom,
                    billUomDesc: action.payload.issueUomDesc,
                    itemQty: '1',
                    itemDisplayName: action.payload.itemDisplayName,
                    soQtyIssueUom: '1',
                    //mobileSaleDelSchedlist: [],
                    mobileSaleDelSchedlist: [
                        {
                            toDate: new Date().toISOString(),
                            itemQty: '1',
                            toBeDelQty: '1',
                            itemcode: action.payload.itemCode
                        }
                    ],
                    isUserChangedProduct: true,
                    itemFcRate: '' + 0,
                    hsnSrNo: action.payload.hsnSrNo,
                    itemFcVal: '' + 0,
                    discRate: '' + 0,
                    discUOM: '',
                    b2iUomConv: '1',                    
                    isOpenFromCart : false,
                    isOpenFromDelievrySchdule:false

                };
                let orderDetails = { ...state.orderDetails, cart, UOMList: [], UOMListLoaded: false };
                return { ...state, orderDetails };
            }

        }
        case fromSO.SET_UOM_SELECTED: {
            let cart: ICart = {
                ...state.orderDetails.cart,
                billUom: action.payload.id,
                billUomDesc: action.payload.value
            };
            let orderDetails = { ...state.orderDetails, cart };
            return { ...state, orderDetails };
        }
        case fromSO.SET_DELIVERY_SCHEDULE: {
            let cart: ICart = {
                ...state.orderDetails.cart,
                mobileSaleDelSchedlist: action.payload
            };
            let orderDetails = { ...state.orderDetails, cart };
            return { ...state, orderDetails };
        }
        case fromSO.UPDATE_PRODUCT_QUANTITY: {
            if (state.orderDetails.orderHeader && state.orderDetails.orderHeader.loggedInUserInfo && state.orderDetails.orderHeader.loggedInUserInfo.value.soJobNoYn == '1') {                                
                if(state.orderDetails.orderHeader.ecode.itemRateFlag == "PB"){
                    let itemPriceInfo = {...state.orderDetails.itemPriceSaved};
                    let cart: ICart = {
                        ...state.orderDetails.cart,
                        itemQty: '' + action.payload,
                        soQtyIssueUom: '' + action.payload,
                        mobileSaleDelSchedlist: [],
                        itemFcRate : itemPriceInfo.itemMrpRate == undefined ? state.orderDetails.cart.itemFcRate : itemPriceInfo.itemMrpRate
                    };
                    let orderDetails = { ...state.orderDetails, cart };
                    return { ...state, orderDetails };
                }else{
                    let cart: ICart = {
                        ...state.orderDetails.cart,
                        itemQty: '' + action.payload,
                        soQtyIssueUom: '' + action.payload,
                        mobileSaleDelSchedlist: [],                        
                    };
                    let orderDetails = { ...state.orderDetails, cart };
                    return { ...state, orderDetails };
                }
            } else {
                if(state.orderDetails.orderHeader.ecode.itemRateFlag == "PB"){
                    let itemPriceInfo = {...state.orderDetails.itemPriceSaved};
                    let cart: ICart = {
                        ...state.orderDetails.cart,
                        itemQty: '' + action.payload,
                        soQtyIssueUom: '' + action.payload,
                        mobileSaleDelSchedlist: [
                            {
                                toDate: state.orderDetails.orderHeader.validTo,
                                itemQty: '' + action.payload,
                                toBeDelQty: '' + action.payload,
                                itemcode: state.orderDetails.cart.itemCode
                            }
                        ],
                        itemFcRate : itemPriceInfo.itemMrpRate == "" ? "0.00" : state.orderDetails.cart.itemFcRate
                    };
                    let orderDetails = { ...state.orderDetails, cart };
                    return { ...state, orderDetails };
                }else{
                    let cart: ICart = {
                        ...state.orderDetails.cart,
                        itemQty: '' + action.payload,
                        soQtyIssueUom: '' + action.payload,
                        mobileSaleDelSchedlist: [
                            {
                                toDate: state.orderDetails.orderHeader.validTo,
                                itemQty: '' + action.payload,
                                toBeDelQty: '' + action.payload,
                                itemcode: state.orderDetails.cart.itemCode
                            }
                        ]
                    };
                    let orderDetails = { ...state.orderDetails, cart };
                    return { ...state, orderDetails };
                }
            }

        }
        case fromSO.SET_PREVIOUS_ORDER_AS_CURRENT_ORDER: {
            if (state.orderDetails.orderHeader && state.orderDetails.orderHeader.loggedInUserInfo && state.orderDetails.orderHeader.loggedInUserInfo.value.soJobNoYn == '1') {
                let cart: ICart = {
                    companyCode: action.payload.companyCode,
                    divisonCode: action.payload.divisonCode,
                    locationCode: action.payload.locationCode,
                    itemCode: action.payload.itemCode,
                    itemDisplayName: action.payload.itemDisplayname,
                    itemQty: action.payload.itemQty,
                    itemFcRate: action.payload.itemRate,
                    discRate: action.payload.discRate,
                    billUom: action.payload.uomCode,
                    billUomDesc: action.payload.uomDesc,
                    mobileSaleDelSchedlist: [],
                    isOpenFromCart : false,
                    isOpenFromDelievrySchdule:false,
                    itemFcVal: '0'
                };
                let orderDetails = { ...state.orderDetails, cart };
                return { ...state, orderDetails };

            } else {
                let cart: ICart = {
                    companyCode: action.payload.companyCode,
                    divisonCode: action.payload.divisonCode,
                    locationCode: action.payload.locationCode,
                    itemCode: action.payload.itemCode,
                    itemDisplayName: action.payload.itemDisplayname,
                    itemQty: action.payload.itemQty,
                    itemFcRate: action.payload.itemRate,
                    discRate: action.payload.discRate,
                    billUom: action.payload.uomCode,
                    billUomDesc: action.payload.uomDesc,
                    mobileSaleDelSchedlist: [
                        {
                            toDate: state.orderDetails.orderHeader.validTo,
                            itemQty: action.payload.itemQty,
                            toBeDelQty: action.payload.itemQty,
                            itemcode: action.payload.itemCode
                        }
                    ],
                    isOpenFromCart : false,
                    isOpenFromDelievrySchdule:false,
                    itemFcVal: '0'
                };
                let orderDetails = { ...state.orderDetails, cart };
                return { ...state, orderDetails };
            }

        }
        case fromSO.SET_CURRENT_ORDER: {
            let cart: ICart = { ...action.payload };
            let orderDetails = { ...state.orderDetails, cart, isManualRateEntered : false};
            return { ...state, orderDetails };
        }
        case fromSO.ADD_TO_CART:
            return { ...state, loading: true };
        case fromSO.ADD_TO_CART_SUCCESS: {
            let cart: ICart = {
                itemFcRate: '0',
                itemFcVal: '0',
                itemQty: '0',
                itemCode: '',
                billUom: '0',
                discRate: '0',
                itemDisplayName: '',
                isOpenFromDelievrySchdule: false,
                mobileSaleDelSchedlist: [],
                isOpenFromCart: false               
            };            
        
            let orderDetails = { ...state.orderDetails, customerWiseCartDetailsLoaded: false, customerWiseCartItemCountLoaded: false, cart, UOMList: [], UOMListLoaded: false, isManualRateEntered:false, isdisableCard:true};
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.ADD_TO_CART_FAIL:
            return { ...state, loading: false };

        case fromSO.UPDATE_CART:
            return { ...state, loading: true };
        case fromSO.UPDATE_CART_SUCCESS: {
            let cart: ICart = {
                itemFcRate: '0',
                itemFcVal: '0',
                itemQty: '0',
                itemCode: '',
                billUom: '0',
                discRate: '0',
                itemDisplayName: '',
                isOpenFromDelievrySchdule: false,
                mobileSaleDelSchedlist: [],
                isOpenFromCart: false
            };
            //itemPriceInfo: null, itemPriceSaved: null
            let orderDetails = { ...state.orderDetails, customerWiseCartDetailsLoaded: false, customerWiseCartItemCountLoaded: false, cart, isManualRateEntered : false, isdisableCard:true};
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.UPDATE_CART_FAIL:
            return { ...state, loading: false };

        case fromSO.RESET_ORDER_DETAILS: {
            let orderDetails = {
                ...state.orderDetails,
                productListLoaded: false, productList: [],
                salesOrderLinkingsLoaded: false, salesOrderLinkings: [],
                customerPreviousOrdersLoaded: false, customerPreviousOrders: [],
                customerWiseCartDetailsLoaded: false, customerWiseCartDetails: [],
                cartItemCount: 0,
                customerWiseCartItemCountLoaded: false,
                orderTaxesLoaded: false, orderTaxes: [],
                creditControlLoaded: false, creditControl: null,
                isValidFinancialYear: null, isValidFinancialYearLoaded: false,
                savedOrder: null,
                didFileUploaded: false,
                isManualRateEntered: false,
                isOpenFromDelievrySchdule: false,
                cart: {
                    itemFcRate: '0',
                    itemFcVal: '0',
                    itemQty: '0',
                    billUom: '0',
                    itemCode: '',
                    discRate: '0',
                    itemDisplayName: '',
                    isUserChangedProduct: false,
                    isOpenFromDelievrySchdule: false,
                    mobileSaleDelSchedlist: [],
                    isOpenFromCart: false,
                    manualRateFlag : false
                },
                faAutoAdv: null,
                creditControlBeforeBO: null, creditControlBeforeBOLoaded: false,
                UOMList: [],
                itemPriceInfo: null,
                itemPriceSaved: null,
            };
            return { ...state, orderDetails}
        }

        case fromSO.CHECK_CREDIT_CONTROL:
            return { ...state, loading: true };
        case fromSO.CHECK_CREDIT_CONTROL_SUCCESS: {
            let creditControl = action.payload;
            let orderDetails = { ...state.orderDetails, creditControl, creditControlLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.CHECK_CREDIT_CONTROL_FAIL: {
            let orderDetails = {
                ...state.orderDetails,
                creditControlLoaded: false,
                creditControl: null
            };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.RESET_CREDIT_CONTROL: {
            let orderDetails = {
                ...state.orderDetails,
                creditControlLoaded: false,
                creditControl: null
            };
            return { ...state, orderDetails };
        }

        case fromSO.SAVE_SALES_ORDER:
            return { ...state, loading: true };
        case fromSO.SAVE_SALES_ORDER_SUCCESS: {
            let orderDetails = { ...state.orderDetails, savedOrder: action.payload };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.SAVE_SALES_ORDER_FAIL:
            return { ...state, loading: false };

        case fromSO.CLEAR_PRODUCT_RATE: {
            let cart = { ...state.orderDetails.cart, itemFcRate: '0', itemFcVal: '0' };
            let orderDetails = { ...state.orderDetails, cart };
            return { ...state, orderDetails }
        }

        case fromSO.LOAD_FILE_DOCUMENTS:
            return { ...state, loading: true };
        case fromSO.LOAD_FILE_DOCUMENTS_SUCCESS: {
            let fileDocuments = action.payload;
            let orderDetails = { ...state.orderDetails, fileDocuments };
            return { ...state, loading: false, orderDetails }
        }
        case fromSO.LOAD_FILE_DOCUMENTS_FAIL:
            return { ...state, loading: false };

        case fromSO.DELETE_FILE_DOCUMENT:
            return { ...state, loading: true };
        case fromSO.DELETE_FILE_DOCUMENT_SUCCESS: {
            let fileDocuments = action.payload;
            let orderDetails = { ...state.orderDetails, fileDocuments };
            return { ...state, loading: false, orderDetails }
        }
        case fromSO.DELETE_FILE_DOCUMENT_FAIL:
            return { ...state, loading: false };

        case fromSO.ADD_FILE_DOCUMENT:
            return { ...state, loading: true };
        case fromSO.ADD_FILE_DOCUMENT_SUCCESS: {
            let fileDocuments = action.payload;
            let orderDetails = { ...state.orderDetails, fileDocuments };
            return { ...state, loading: false, orderDetails }
        }
        case fromSO.ADD_FILE_DOCUMENT_FAIL:
            return { ...state, loading: false };

        case fromSO.SAVE_FILE_DOCUMENT:
            return { ...state, loading: true };
        case fromSO.SAVE_FILE_DOCUMENT_SUCCESS: {
            let fileDocuments = action.payload;
            let orderDetails = { ...state.orderDetails, fileDocuments, didFileUploaded: true };
            return { ...state, loading: false, orderDetails }
        }
        case fromSO.SAVE_FILE_DOCUMENT_FAIL:
            return { ...state, loading: false };

        case fromSO.LOAD_SESSION_FOR_FILES:
            return { ...state, loading: true };
        case fromSO.LOAD_SESSION_FOR_FILES_SUCCESS: {
            let fileDocuments = { ...state.orderDetails.fileDocuments, sessionId: action.payload };
            let orderDetails = { ...state.orderDetails, fileDocuments };
            return { ...state, loading: false, orderDetails }
        }
        case fromSO.LOAD_SESSION_FOR_FILES_FAIL:
            return { ...state, loading: false };

        case fromSO.CHECK_VALID_FINANCIAL_YEAR:
            return { ...state, loading: true };
        case fromSO.CHECK_VALID_FINANCIAL_YEAR_SUCCESS: {
            let isValidFinancialYear = action.payload;
            let orderDetails = { ...state.orderDetails, isValidFinancialYear, isValidFinancialYearLoaded: true };
            return { ...state, loading: false, orderDetails }
        }
        case fromSO.CHECK_VALID_FINANCIAL_YEAR_FAIL: {
            let orderDetails = { ...state.orderDetails, isValidFinancialYear: null, isValidFinancialYearLoaded: false };
            return { ...state, loading: false };
        }

        //-----------------PriceBook Header----------------------

        case fromSO.LOAD_PRICE_BOOK_HEADER:
            return { ...state, loading: true };
        case fromSO.LOAD_PRICE_BOOK_HEADER_SUCCESS: {
            let orderDetails = { ...state.orderDetails, priceBookHeaderData: action.payload };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_PRICE_BOOK_HEADER_FAIL:
            return { ...state, loading: false };

        //----------------- DM Details----------------------

        case fromSO.LOAD_DM_DETAILS:
            return { ...state, loading: true };
        case fromSO.LOAD_DM_DETAILS_SUCCESS: {
            let orderDetails = { ...state.orderDetails, dmDetails: action.payload };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_DM_DETAILS_FAIL:
            return { ...state, loading: false };



        //----------------- FA Auto Adv ----------------------

        case fromSO.LOAD_FA_AUTO_ADV:
            return { ...state, loading: true };
        case fromSO.LOAD_FA_AUTO_ADV_SUCCESS: {

            let faAutoAdv = action.payload;
            let orderDetails = { ...state.orderDetails, faAutoAdv };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_FA_AUTO_ADV_FAIL:
            return { ...state, loading: false };

        //----------------- Customer wise cart Item Count ---------------

        case fromSO.LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT:
            let orderDetails = { ...state.orderDetails, customerWiseCartItemCountLoaded: false };
            return { ...state, orderDetails, loading: true };
        case fromSO.LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT_SUCCESS: {
            let cartItemCount = action.payload.id;
            let customerWiseCartDetails = action.payload.value;
            let orderDetails = { ...state.orderDetails, customerWiseCartDetails, cartItemCount, customerWiseCartItemCountLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.LOAD_CUSTOMER_WISE_CART_ITEMS_COUNT_FAIL:
            return { ...state, loading: false };


        //---------- Upadte The Product Rate Manually 

        case fromSO.UPDATE_PRODUCT_RATE: {
            let itemRate = '' + action.payload;
            //let oldOrderDetails = state.orderDetails;
            let cart: ICart = { ...state.orderDetails.cart };
            if (!cart.isOpenFromDelievrySchdule && state.orderDetails.orderHeader.ecode.transIndicatorType != "SO_0_VAL") {
                //let itemQty = Number(state.orderDetails.cart.itemQty);
                //let discount = Number(state.orderDetails.cart.discRate);
                //let totalValue = (Number(itemQty * Number(itemRate)) - discount);                
                cart.itemFcRate = '' + itemRate;                
                   // cart.itemFcVal = '' + totalValue

            }
            let orderDetails = { ...state.orderDetails, cart };
            return { ...state, orderDetails };
        }

         //---------- Upadte The Product Quantity Manually 

         case fromSO.UPDATE_PRODUCT_DISCOUNT: {
            let itemDiscount = '' + action.payload;
            let cart: ICart = { ...state.orderDetails.cart };
            if (!cart.isOpenFromDelievrySchdule && state.orderDetails.orderHeader.ecode.transIndicatorType != "SO_0_VAL") {
                //let itemQty = Number(state.orderDetails.cart.itemQty);
                //let discount = Number(state.orderDetails.cart.discRate);
                cart.discRate = itemDiscount;
                //let totalValue = (Number(itemQty * Number(itemRate)) - discount);
                //cart.itemFcRate = '' + itemRate
                   // cart.itemFcVal = '' + totalValue

            }
            if (state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN =="N"){
                cart.discUOM = "P";
            }
            let orderDetails = { ...state.orderDetails, cart };
            return { ...state, orderDetails };
        }

        case fromSO.SET_DELSHEDULE_OPEN: {
            let cart: ICart = {
                ...state.orderDetails.cart,
                isOpenFromDelievrySchdule: action.payload
            };
            let orderDetails = { ...state.orderDetails, cart };
            return { ...state, orderDetails };
        }


        case fromSO.SET_RATE_EDITABLE: {
            /* let cart = {...state.orderDetails.cart};
            cart.addToCartFlag = true; */
            let orderDetails = { ...state.orderDetails, isManualRateEntered: action.payload};
            return { ...state, orderDetails };
        }

        case fromSO.SET_DISCOUNT_EDITABLE: {
            let orderDetails = { ...state.orderDetails, isManualDiscountEntered: action.payload };
            return { ...state, orderDetails };
        }

        /* case fromSO.SET_DISCOUNT_TYPE: {
            let orderDetails = { ...state.orderDetails, discountType: action.payload };
            return { ...state, orderDetails };
        } */

        ///----------------------- Manual Discount Matrix Details -------------------------------------

        case fromSO.LOAD_MANUAL_DISCOUNT_MATRIX:
            return { ...state, loading: true };
        case fromSO.LOAD_MANUAL_DISCOUNT_MATRIX_SUCCESS: {
            if (!state.orderDetails.cart.isOpenFromDelievrySchdule) {
                if (state.orderDetails.orderHeader.ecode.transIndicatorType != "SO_0_VAL") {
                    let itemPriceInfo = action.payload;
                    let itemPriceSaved = {...state.orderDetails.itemPriceSaved};
                    let discount = itemPriceInfo.discValue != null ? itemPriceInfo.discValue : 0;//changes here
                    let price = itemPriceInfo.itemMrpRate != null ? itemPriceInfo.itemMrpRate : 0;

                    let noOfItems = Number(state.orderDetails.cart.itemQty);
                    let total;
                    
                    if (state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN =="N"){
                        total = (noOfItems * Number(price)) - (noOfItems * Number(price) * Number(discount)) / 100;
                    }else{
                        total = (noOfItems * Number(price)) - Number(discount);
                    }

                    let isDisablecart = false;
                    if (price == '0')
                        isDisablecart = true;
                    else
                        isDisablecart = false;


                    if (state.orderDetails.isManualRateEntered && state.orderDetails.orderHeader.ecode.itemRateFlag == "PB") {
                        if(Object.keys(itemPriceSaved).length){
                            if(state.orderDetails.cart.itemFcRate >= itemPriceSaved.itemMinRate && state.orderDetails.cart.itemFcRate <= itemPriceSaved.itemMaxRate){
                                isDisablecart = false;
                                state.orderDetails.cart.manualRateFlag = false;
                            } else {
                                isDisablecart = true;
                                state.orderDetails.cart.manualRateFlag = true;    
                            }
                        }
                    }
                    
                    if(state.orderDetails.orderHeader.loggedInUserInfo.value.dMApplicableYN=="N" && Number(state.orderDetails.cart.discRate) > 100){
                        isDisablecart = true;
                    }
                    
                    if(total==0){
                        isDisablecart = true;
                    }
                    
                    let cart = { ...state.orderDetails.cart, itemFcRate: price, itemFcVal: '' + total, discRate: discount, discUOM: itemPriceInfo.discountUom };
                    let orderDetails = { ...state.orderDetails, itemPriceInfo, isdisableCard: isDisablecart, cart };
                    return { ...state, loading: false, orderDetails };
                } else {
                    let itemPriceInfo = action.payload;
                    let discount = '' + 0;//changes here
                    let price = '' + 0;
                    let noOfItems = Number(state.orderDetails.cart.itemQty);
                    let total = (noOfItems * Number(price)) - Number(discount);
                    let cart = { ...state.orderDetails.cart, itemFcRate: price, itemFcVal: '' + total, discRate: discount, discUOM: itemPriceInfo.discountUom };
                    let orderDetails = { ...state.orderDetails, itemPriceInfo, isdisableCard: false, cart };
                    return { ...state, loading: false, orderDetails };
                }
            }
        }
        case fromSO.LOAD_MANUAL_DISCOUNT_MATRIX_FAIL:
            return { ...state, loading: false };

        case fromSO.CHECK_CREDIT_CONTROL_BEFORE_SO:
            return { ...state, loading: true };
        case fromSO.CHECK_CREDIT_CONTROL__BEFORE_SO_SUCCESS: {
            //let creditControl = action.payload;
            let orderDetails = { ...state.orderDetails, creditControlBeforeBO: action.payload, creditControlBeforeBOLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.CHECK_CREDIT_CONTROL__BEFORE_SO_FAIL: {
            let orderDetails = {
                ...state.orderDetails,
                creditControlBeforeBOLoaded: false,
                creditControlBeforeBO: null
            };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.RESET_CREDIT_CONTROL_BEFORE_SO: {
            let orderDetails = {
                ...state.orderDetails,
                creditControlBeforeBOLoaded: false,
                creditControlBeforeBO: null
            };
            return { ...state, orderDetails };
        }

        case fromSO.CUST_OUTSTAND_AMT:
            return { ...state, loading: true };
        case fromSO.CUST_OUTSTAND_AMT_SUCCESS: {
            let custOtAmt = action.payload;
            let orderDetails = { ...state.orderDetails, outStandingAmount: custOtAmt, outStandAmountLoaded: true };
            return { ...state, loading: false, orderDetails };
        }
        case fromSO.CUST_OUTSTAND_AMT_FAIL: {
            let orderDetails = {
                ...state.orderDetails,
                outStandingAmount: null,
                outStandAmountLoaded: false
            };
            return { ...state, loading: false, orderDetails };
        }

        // add to card disable
        case fromSO.IS_ADD_TO_CART_DISABLED: {
            let orderDetails = { ...state.orderDetails, isdisableCard: action.payload };
            return { ...state, orderDetails };
        }

         /*Customer List With Pagination*/
         case fromSO.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL:
            return { ...state, loading : true, customerList: []};
        case fromSO.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_SUCCESS :
            let customerListwithPagination = action.payload.gridRecords;
            return { ...state, loading : false, customerList : customerListwithPagination};

        case fromSO.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_FAIL :
            return { ...state, loading : false };

        case fromSO.RESET_CUSTOMERS :
            return { ...state, loading : false, customerList:[] };  

       /*  case fromSO.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL:
         return { ...state, loading : true};
        case fromSO.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_SUCCESS : 
            let customerListwithPagination = action.payload.gridRecords;
            let cList = state.customerList;
            for(var i=0; i<customerListwithPagination.length; i++){
                cList.push(customerListwithPagination[i]);
            }
            return { ...state, loading : false, customerList : cList};

        case fromSO.LOAD_CUSTOMERS_LIST_WITH_INFINITY_SCROLL_FAIL :
         return { ...state, loading : false }; */


        default:
            return state;
    }
}

export const getLoading = (state: ISOState) => state.loading;

export const getLocationDetailOfLoggedEmp = (state: ISOState) => state.locationDetailOfLoggedEmp;
export const getCustomerList = (state: ISOState) => state.customerList;
export const getAllCustomerList = (state: ISOState) => state.globalCustomerList;
export const getEcodes = (state: ISOState) => state.ecodes;
export const getLocations = (state: ISOState) => state.locations;

export const getOrderDetails = (state: ISOState) => state.orderDetails;
export const getOrderHeader = (state: ISOState) => state.orderDetails.orderHeader;
export const getOrderLocation = (state: ISOState) => state.orderDetails.orderHeader.location;
export const getOrderEcode = (state: ISOState) => state.orderDetails.orderHeader.ecode;
export const getOrderCustomer = (state: ISOState) => state.orderDetails.orderHeader.customer;
export const getProductList = (state: ISOState) => state.orderDetails.productList;
export const getUOMList = (state: ISOState) => state.orderDetails.UOMList;
export const getCustomerPreviousOrders = (state: ISOState) => state.orderDetails.customerPreviousOrders;
export const getCustomerWiseCartDetails = (state: ISOState) => state.orderDetails.customerWiseCartDetails;
export const getSalesOrderLinkings = (state: ISOState) => state.orderDetails.salesOrderLinkings;
export const getCart = (state: ISOState) => state.orderDetails.cart;
export const getStock = (state: ISOState) => state.orderDetails.cart.availStock;
export const getQuantity = (state: ISOState) => state.orderDetails.cart.itemQty;
export const getDeliverySchedule = (state: ISOState) => state.orderDetails.cart.mobileSaleDelSchedlist;
export const getTaxes = (state: ISOState) => state.orderDetails.orderTaxes;
export const getItemWiseTaxes = (state: ISOState) => state.orderDetails.itemWiseTaxes;
export const getCreditControl = (state: ISOState) => state.orderDetails.creditControl;
export const getSavedOrder = (state: ISOState) => state.orderDetails.savedOrder;
export const getDidFileUploaded = (state: ISOState) => state.orderDetails.didFileUploaded;
export const getFileDocuments = (state: ISOState) => state.orderDetails.fileDocuments;
export const getIsValidFinancialYear = (state: ISOState) => state.orderDetails.isValidFinancialYear;
export const getIsValidFinancialYearLoaded = (state: ISOState) => state.orderDetails.isValidFinancialYearLoaded;
export const getPriceBookHeaderData = (state: ISOState) => state.orderDetails.priceBookHeaderData;
export const getDMDetails = (state: ISOState) => state.orderDetails.dmDetails;

export const getFaAutoAdv = (state: ISOState) => state.orderDetails.faAutoAdv;

export const getCustomerWiseItemCount = (state: ISOState) => state.orderDetails.cartItemCount;
export const getProductRate = (state: ISOState) => state.orderDetails.cart.itemFcRate;

export const getProductDiscount = (state: ISOState) => state.orderDetails.cart.discRate;

export const getOpenDeliverySchedule = (state: ISOState) => state.orderDetails.cart.isOpenFromDelievrySchdule;

export const getRateEditable = (state: ISOState) => state.orderDetails.isEditablePrice;

export const getManualDMDetails = (state: ISOState) => state.orderDetails.dmDetails;

export const getCreditControlBeforBO = (state: ISOState) => state.orderDetails.creditControlBeforeBO;

export const getAllProductsList = (state: ISOState) => state.orderDetails.globalProductList;

export const getCustomerOutAmt = (state: ISOState) => state.orderDetails.outStandingAmount;

