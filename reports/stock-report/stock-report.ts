import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { ILocation } from '../../../../shared/models/location.interface';
import { SdmsModel } from '../../../facades/sdms-report';
import { SharedApiModel } from '../../../../shared/facades/shared-api';
import { ISdmsReportRequest, IStockProductsRequest, IStockReportRequest } from '../../../models/sdms-report.interface';
import { IProduct, IProductListRquest } from '../../../models/so.interface';
import { PopupModel } from '../../../../shared/facades/popup';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApplicationConstants } from '../../../../app/ApplicationConstants';
import { IGroupCode, ISubGroupCode, ISubSubGroupCode, IBrandNameData } from '../../../../mis/models/group-code.interface';

/**
 * Generated class for the StockReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-stock-report',
	templateUrl: 'stock-report.html',
})
export class StockReportPage {

	stockReportForm: FormGroup;
	submitAttempt = false;

	locations: ILocation[] = [];
	products: IProduct[] = [];
	stockGroupCodes: IGroupCode[] = [];
	stockSubGroupCodes: ISubGroupCode[] = [];
	stockSubSubGroupCodes: ISubSubGroupCode[] = [];
	brandDisplayNames: IBrandNameData[] = [];

	locationSearchValueKeys: Array<string> = ['id', 'value'];
	productSearchValueKeys: Array<string> = ['itemCode', 'itemDisplayName'];
	groupCodeSearchValueKeys: Array<string> = ['code', 'groupDisplayName'];
	subGroupCodeSearchValueKeys: Array<string> = ['subGroupCode', 'groupDisplayName'];
	subSubGroupCodeSearchValueKeys: Array<string> = ['subSubGroupCode', 'groupDisplayName'];
	brandDisplayNameSearchValueKeys: Array<string> = ['id', 'value'];

	resultData: Array<any> = [];
	showResult: boolean = false;
	isShowBtnDisabled: boolean = false;
	isExpanded: boolean = true;
	isLoading: boolean = false;
	viewStockFlag: string = 'I';

	private _onDestroy$ = new Subject<void>();

	page: number = 1;
	count = 10;
	searchString: string = "";
	noOfRecords: number = ApplicationConstants.NO_OF_ITEMS_PER_PAGE;
	totalPageCount: number = 0;

	allProducts: Array<IProduct> = [];
	productDetails: any;
	isItemFilterOn: boolean = false;
	showStockReportData : boolean = false;
    @ViewChild('itemContent') selectInfiniteScroll: IonicSelectableComponent;


	constructor(public navCtrl: NavController, public navParams: NavParams,
		private _formBuilder: FormBuilder, private _sdmsModel: SdmsModel,
		private modalCtrl: ModalController, private _sharedApiModel: SharedApiModel,
		private _popupModel: PopupModel) {
		this.stockReportForm = _formBuilder.group({
			'location': [''],
			'product': ['', Validators.required],
			'stockGroupCode': ['', Validators.required],
			'stockSubGroupCode': [''],
			'stockSubSubGroupCode': [''],
			'displayName': [''],
			'viewStock': ['', Validators.required]
		});
		this.setFormDefaultValue();
		this.stockReportForm.get('viewStock').valueChanges
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(viewStockReport => {
				this._sdmsModel.setStockReportView(viewStockReport);
				this.viewStockFlag = viewStockReport;
				this.resultData = [];
			});
	}

	ionViewDidEnter() {
		this._sdmsModel.isLoading()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoading => this.isLoading = isLoading);
	}

	ionViewDidLoad() {
		this._sharedApiModel.getLocations()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.locations = data);

		let request: IStockProductsRequest = {
			locationCode: '',
			tranInd: ''
		}
		//this.loadStockProductList();
		this._sdmsModel.getStockProductList()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => {
				this.products = data;
				if (this.isItemFilterOn)
					this.totalPageCount = data != null ? Math.ceil(data.length / 20) : 0;
			});

		this._sdmsModel.getAllStockProducts()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => {
				this.allProducts = data;
				this.totalPageCount = data != null ? Math.ceil(data.length / 20) : 0;
		})

		this._sdmsModel.getSoStockReportLoaded()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoaded => this.showResult = isLoaded);

		this._sdmsModel.getStockReport()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => {
				if (data != null) {

					this.resultData = data;

				}

			});
		this._sharedApiModel.loadLocations();


		this.stockReportForm.valueChanges.distinctUntilChanged()
			.pipe(takeUntil(this._onDestroy$)).subscribe(data => {
				this.isShowBtnDisabled = false;
				this.showResult = false;
			});

		//---------------Group Code---------------	
		this._sdmsModel.getStockGroupCodes()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.stockGroupCodes = data);

		//---------------Sub Group Code---------------	
		this._sdmsModel.getStockSubGroupCodes()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.stockSubGroupCodes = data)

		//---------------Sub Sub Group Code---------------	
		this._sdmsModel.getStockSubSubGroupCodes()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.stockSubSubGroupCodes = data)

		//---------------Brand Display Name---------------	
		// this._sdmsModel.getStockBrandDisplayNames()
		// 	.pipe(takeUntil(this._onDestroy$))
		// 	.subscribe(data => this.brandDisplayNames = data)

		this._sdmsModel.loadStockGroupCodes();
		// this._sdmsModel.loadStockBrandDisplayNames();
	}

	setFormDefaultValue(): void {
		this.stockReportForm.controls['viewStock'].setValue('I');
		this.submitAttempt = false;
	}

	showStockReport() {
		if (this.stockReportForm.valid) {
			let data: IStockReportRequest = {
				locationCode: this.stockReportForm.value.location != '' ? (this.stockReportForm.value.location.map(l => l.id).join(',')) : '',
				ItemCode: this.stockReportForm.value.product != '' ? (this.stockReportForm.value.product.map(l => l.itemCode).join(',')) : '',
				transactionFlag: 'R'

			};
			this._sdmsModel.loadStockReport(data);
		}

		else {
			console.log("invalid");
		}
		this.isExpanded = false;
		this.isShowBtnDisabled = true;
		this.showStockReportData = false;
	}

	loadSubGroupCodes() {
		this._sdmsModel.resetStockSubGroupCodes();
		this._sdmsModel.resetStockSubSubGroupCodes();
		let groupCode = this.stockReportForm.value.stockGroupCode.code;
		if (groupCode != "") {
			this._sdmsModel.loadStockSubGroupCodes(groupCode);
			this._sdmsModel.resetStockSubSubGroupCodes();
		}
		this.stockReportForm.controls['stockSubGroupCode'].setValue('');
		this.stockReportForm.controls['stockSubSubGroupCode'].setValue('');
		this.stockReportForm.controls['product'].setValue('');
		let locationCode = this.stockReportForm.value.location != '' ? (this.stockReportForm.value.location.map(l => l.id).join(',')) : '';
		let subgroupCode = this.stockReportForm.value.stockSubGroupCode != '' ? (this.stockReportForm.value.stockSubGroupCode.subGroupCode) : '';
		let subSubgroupCode = this.stockReportForm.value.stockSubSubGroupCode != '' ? (this.stockReportForm.value.stockSubSubGroupCode.subSubGroupCode) : '';
		this.isItemFilterOn = true;
		this.resultData=[];
		this.loadStockProductList(locationCode, groupCode, subgroupCode, subSubgroupCode);
	}

	loadSubSubGroupCodes() {
		let groupCode = this.stockReportForm.value.stockGroupCode.code;
		let subGroupCode = this.stockReportForm.value.stockSubGroupCode.subGroupCode;
		let request = {
			groupCode: groupCode,
			subGroupCode: subGroupCode
		}
		this.stockReportForm.controls['stockSubSubGroupCode'].setValue('');
		this.stockReportForm.controls['product'].setValue('');
		this._sdmsModel.loadStockSubSubGroupCodes(request);
		let locationCode = this.stockReportForm.value.location != '' ? (this.stockReportForm.value.location.map(l => l.id).join(',')) : '';
		let subSubgroupCode = this.stockReportForm.value.stockSubSubGroupCode != '' ? this.stockReportForm.value.stockSubSubGroupCode.subSubGroupCode : '';
		this.resultData=[];
		this.loadStockProductList(locationCode, groupCode, subGroupCode, subSubgroupCode);
	}

	loadSubSubGroupItems() {
		let groupCode = this.stockReportForm.value.stockGroupCode.code;
		this.stockReportForm.controls['product'].setValue('');
		let subGroupCode = this.stockReportForm.value.stockSubGroupCode.subGroupCode;
		let locationCode = this.stockReportForm.value.location != '' ? (this.stockReportForm.value.location.map(l => l.id).join(',')) : '';
		let subSubgroupCode = this.stockReportForm.value.stockSubSubGroupCode != '' ? (this.stockReportForm.value.stockSubSubGroupCode.subSubGroupCode) : '';
		this.resultData=[];
		this.loadStockProductList(locationCode, groupCode, subGroupCode, subSubgroupCode);
	}

	locationChanged(locations) {
		// this.stockReportForm.value.product = '';
		this.stockReportForm.controls['product'].setValue('');
		let locationCode = this.stockReportForm.value.location != '' ? (this.stockReportForm.value.location.map(l => l.id).join(',')) : '';
		let groupCode = this.stockReportForm.value.stockGroupCode != '' ? this.stockReportForm.value.stockGroupCode.code : '';
		let subGroupCode = this.stockReportForm.value.stockSubGroupCode != '' ? (this.stockReportForm.value.stockSubGroupCode.subGroupCode) : '';
		let subSubgroupCode = this.stockReportForm.value.stockSubSubGroupCode != '' ? (this.stockReportForm.value.stockSubSubGroupCode.subSubGroupCode) : '';
		if (groupCode != ""){
			this.loadStockProductList(locationCode, groupCode, subGroupCode, subSubgroupCode);
		}
		
		this.showStockReportData = true;
	}

	ionViewDidLeave() {
		this._onDestroy$.next();
		this._onDestroy$.complete();
		this._sdmsModel.resetStockReportData();
	}
	gotoBack() {
		this._sdmsModel.resetStockReportData();
		this.navCtrl.pop();
	}

	goToHome() {
		// this.navCtrl.pop();
		this.navCtrl.setPages([{ page: 'MenuPage' }]);
	}

	/*** Implement Ionic-selectable componant ***/

	searchProducts(event: {
		component: IonicSelectableComponent,
		text: string
	}) {
		let text = event.text.trim().toLowerCase();
		event.component.startSearch();

		// Close any running subscription.
		//this.page=1;
		if (!text) {
			event.component.items = this.getProductsPerPage(1, this.noOfRecords, this.products);
			// Enable and start infinite scroll from the beginning.
			if (this.isItemFilterOn)
				this.totalPageCount = this.products != null ? Math.ceil(this.products.length / 20) : 0;
			this.page = 2;
			event.component.endSearch();
			event.component.enableInfiniteScroll();
			return;
		}

		this._sdmsModel.getAllStockProducts().subscribe(productList => {
			let filterProducts = this.filterProducts(productList, text);
			event.component.items = this.getProductsPerPage(1, this.noOfRecords, filterProducts);
			this.totalPageCount = Math.ceil(filterProducts.length / this.noOfRecords);
			event.component.endSearch();
		});
	}

	filterProducts(products: IProduct[], text: string) {
		return products.filter(product => {
			return product.displayName.toLowerCase().indexOf(text) !== -1 ||
				product.itemCode.toLowerCase().indexOf(text) !== -1;
		});
	}


	getMoreProducts(event: {
		component: IonicSelectableComponent,
		text: string
	}) {
		let text = (event.text || '').trim().toLowerCase();

		// There're no more ports - disable infinite scroll.
		if (this.page > this.totalPageCount) {
			event.component.disableInfiniteScroll();
			return;
		}

		let productsList = [];
		//if group code subgroup code and sub sub group code is selected then this flag is used
		if (this.isItemFilterOn) {
			let filterProductList = this.products;
			productsList = event.component.items.concat(this.getProductsPerPage(this.page, this.noOfRecords, filterProductList));
		}

		else
			productsList = event.component.items.concat(this.getProductsPerPage(this.page, this.noOfRecords));

		let searchProducts = [];
		if (text) {
			searchProducts = this.filterProducts(productsList, text);
			this.totalPageCount = Math.ceil(searchProducts.length / this.noOfRecords);
			event.component.items = searchProducts;

		} else {
			event.component.items = productsList;
		}
		event.component.endInfiniteScroll();
		this.page++;
	}

	getProductsPerPage(page?, size?, productList?) {
		let scrollProducts: IProduct[] = [];
		if (page && size) {
			if (!productList)
				scrollProducts = this.allProducts.slice((page - 1) * size, ((page - 1) * size) + size);
			else
				scrollProducts = productList.slice((page - 1) * size, ((page - 1) * size) + size);
		}
		return scrollProducts;
	}

	loadStockProductList(locationCodes?: string, groupCodes?: string, subGroupCodes?: string, subSubGroupCodes?: string) {
		let selectedLocationCode = locationCodes != undefined ? locationCodes : '';
		let selectedGroupCodes = groupCodes != undefined ? groupCodes : '';
		let selectedSubGroupCodes = subGroupCodes != undefined ? subGroupCodes : '';
		let selectedSubSubGroupCodes = subSubGroupCodes != undefined ? subSubGroupCodes : '';

		let productListRequest: IStockProductsRequest = {
			locationCode: selectedLocationCode,
			groupCode: selectedGroupCodes,
			subGroupCode: selectedSubGroupCodes,
			subSubGroupCode: selectedSubSubGroupCodes,
			sessionId: this.allProducts.length > 0 ? this.allProducts[0].sessionId : ''
		};
		this._sdmsModel.loadStockProductsWithFilter(productListRequest);
	}

	onClose(event: { component: IonicSelectableComponent }) {
		event.component.searchText = "";
	}
	
}
