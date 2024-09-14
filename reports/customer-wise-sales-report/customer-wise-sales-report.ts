import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';
import { takeUntil, take } from 'rxjs/operators';
import { ILocation } from '../../../../shared/models/location.interface';
import { ICustomer } from '../../../../shared/models/customer.interface';
import { ICustomerWiseReportData, ISdmsReportRequest } from '../../../models/sdms-report.interface';
import { SdmsModel } from '../../../facades/sdms-report';
import { SharedApiModel } from '../../../../shared/facades/shared-api';
import { PopupModel } from '../../../../shared/facades/popup';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../shared/format-date';
import { IDayWise } from '../../../../mis/models/mis-report.interface';

@IonicPage()
@Component({
	selector: 'page-customer-wise-sales-report',
	templateUrl: 'customer-wise-sales-report.html',
	providers: [
		{
			provide: DateAdapter, useClass: AppDateAdapter
		},
		{
			provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
		}
	]
})
export class CustomerWiseSalesReportPage {
	customerReportForm: FormGroup;
	submitAttempt = false;

	locations: ILocation[] = [];
	customers: ICustomer[] = [];
	locationSearchValueKeys: Array<string> = ['id', 'value'];
	customerSearchValueKeys: Array<string> = ['customerCode', 'customerDisplayName'];
	showResult$: Observable<boolean>;
	result: Array<ICustomerWiseReportData> = [];
	totalSalesCollection = 0;
	minDate = new Date();
	maxDate = new Date();
	isExpanded: boolean = true;
	isLoading: boolean = false;
	isShowBtnDisabled: boolean = false;
	isShowData: boolean = false;
	isDisableDate: boolean = false;
	checked = false;

	private _onDestroy$ = new Subject<void>();

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private modalCtrl: ModalController,
		private _formBuilder: FormBuilder, private _sdmsModel: SdmsModel,
		private _sharedApiModel: SharedApiModel, private _popupModel: PopupModel) {
		this.customerReportForm = _formBuilder.group({
			'location': [''],
			'customer': [''],
			'fromDate': ['', Validators.required],
			'toDate': ['', Validators.required],
			'dayWise': [''],
			'periodActive': ['']
		}, { validator: checkIfEndDateAfterStartDate }
		);


		this.setFormDefaultValue();
	}

	ionViewDidEnter() {
		this._sdmsModel.isLoading()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoading => this.isLoading = isLoading);

		this._sharedApiModel.isLoading()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoading => this.isLoading = isLoading);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CustomerWiseSalesReportPage');
		//Period
		this.customerReportForm.get('periodActive').valueChanges
			.pipe(takeUntil(this._onDestroy$)).subscribe((pa: any) => {
				if (pa == true) {
					this.result = [];
					this.isShowData = false;
					this.customerReportForm.controls['dayWise'].setValue('W');
					this.customerReportForm.get('dayWise').setValidators([Validators.required]);
				}
				else {
					this.result = [];
					this.isShowData = false;
					this.setFormDefaultValue();
					this.customerReportForm.controls['dayWise'].setValue('');
					this.customerReportForm.get('dayWise').setValidators([]);
				}
				this.customerReportForm.get('dayWise').updateValueAndValidity();
			})

		//DayWise

		this.customerReportForm.get('dayWise').valueChanges
			.pipe(takeUntil(this._onDestroy$)).subscribe((dw: string) => {
				var toDay = new Date();
				if (dw == IDayWise.week) {
					this.isShowData = false;
					let weekDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
					this.customerReportForm.controls['fromDate'].setValue(weekDay);
					this.customerReportForm.controls['toDate'].setValue(toDay);
					this.result = [];
				}
				else if (dw == IDayWise.days15) {
					this.isShowData = false;
					let fifteenDay = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
					this.customerReportForm.controls['fromDate'].setValue(fifteenDay);
					this.customerReportForm.controls['toDate'].setValue(toDay);
					this.result = [];
				}
				else if (dw == IDayWise.month) {
					this.isShowData = false;
					var now = new Date();
					var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
					var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
					this.customerReportForm.controls['fromDate'].setValue(prevMonthFirstDate);
					this.customerReportForm.controls['toDate'].setValue(prevMonthLastDate);
					this.result = [];
				}
				else if (dw == IDayWise.quarter) {
					this.isShowData = false;
					var now = new Date();
					var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
					var prevThirdMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 3 + 12) % 12, 1);
					this.customerReportForm.controls['fromDate'].setValue(prevThirdMonthFirstDate);
					this.customerReportForm.controls['toDate'].setValue(prevMonthLastDate);
					this.result = [];
				}
			});

		//End of Daywise
		this._sharedApiModel.getLocations()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.locations = data);

		this._sdmsModel.getCustWiseCustomers()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.customers = data);

		this.showResult$ = this._sdmsModel.getCustomerWiseReportLoaded();
		this._sdmsModel.getCustomerWiseReport()
			.pipe(takeUntil(this._onDestroy$)).subscribe(data => {
				this.result = [];
				if (data != null) {
					if (data.length > 0) {
						this.result = data;
					}
					else {
						this._popupModel.warningMessage('No Data')
							.then(() => {
								this.isExpanded = true;
								this._sdmsModel.resetCustomerWiseReport();
							})
					}
				}
				else {
					this.result = [];
				}
				//find the total
				this.totalSalesCollection = 0;
				this.result.map((data) => {
					this.totalSalesCollection = this.totalSalesCollection + parseFloat(data.salesValue);
				});
			});

		this._sharedApiModel.loadLocations();
		this._sdmsModel.loadCustWiseCustomers();
		this.customerReportForm.valueChanges.distinctUntilChanged()
			.pipe(takeUntil(this._onDestroy$)).subscribe(data => this.isShowBtnDisabled = false);
	}

	setFormDefaultValue(): void {
		let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
		//current month 
		let today = new Date();
		//first date of the current month
		let fromDateObj: any = new Date(today.getFullYear(), today.getMonth(), 1);
		let fromDate = (new Date(fromDateObj - tzoffset)).toISOString().slice(0, -1);
		//end of first date of the current month
		this.customerReportForm.controls['fromDate'].setValue(fromDate);
		this.customerReportForm.controls['toDate'].setValue(today);
		this.maxDate = today;
		this.submitAttempt = false;
	}

	loadReport() {
		if (this.customerReportForm.valid) {
			this.isExpanded = false;
			this.isShowData = true;
			let data: ISdmsReportRequest = {
				locationCode: this.customerReportForm.value.location != '' ? (this.customerReportForm.value.location.map(l => l.id).join(',')) : '',
				customerCode: this.customerReportForm.value.customer != '' ? this.customerReportForm.value.customer.customerCode : '',
				dateData: {
					fromDate: this.customerReportForm.value.fromDate,
					toDate: this.customerReportForm.value.toDate,
				}
			};
			this._sdmsModel.loadCustomerWiseReport(data);
			this.isExpanded = false;
			this.isShowBtnDisabled = true;
		}
	}

	ionViewDidLeave() {
		this._onDestroy$.next();
		this._onDestroy$.complete();
	}
	gotoBack() {
		this.navCtrl.pop();
	}

	goToHome() {
		this.navCtrl.setPages([{ page: 'MenuPage' }]);
	}

}

function checkIfEndDateAfterStartDate(c: AbstractControl) {
	//safety check
	if (!c.get('fromDate').value || !c.get('toDate').value) { return null }

	let fromDate = moment(c.get('fromDate').value);
	let toDate = moment(c.get('toDate').value);
	if (fromDate <= toDate)
		return null;
	else
		return { invalidEndData: true };
}
