import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ILocation } from '../../../../shared/models/location.interface';
import { ICustomer } from '../../../../shared/models/customer.interface';
import { ICollectionReportData, ISdmsReportRequest } from '../../../models/sdms-report.interface';
import { SdmsModel } from '../../../facades/sdms-report';
import { SharedApiModel } from '../../../../shared/facades/shared-api';
import { PopupModel } from '../../../../shared/facades/popup';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../shared/format-date';
import { IDayWise } from '../../../../mis/models/mis-report.interface';

@IonicPage()
@Component({
	selector: 'page-collection-report',
	templateUrl: 'collection-report.html',
	providers: [
		{
			provide: DateAdapter, useClass: AppDateAdapter
		},
		{
			provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
		}
	]
})
export class CollectionReportPage {
	collectionReportForm: FormGroup;
	submitAttempt = false;

	locations: ILocation[] = [];
	customers: ICustomer[] = [];
	showResult$: Observable<boolean>;
	result: Array<ICollectionReportData> = [];
	locationSearchValueKeys: Array<string> = ['id', 'value'];
	customerSearchValueKeys: Array<string> = ['customerCode', 'customerDisplayName'];
	totalCollection = 0;
	activeDetailShow = null;
	showDrillCollectionDetails: boolean = false;
	isExpanded: boolean = true;
	isLoading: boolean = false;
	selectedCustomer = {};
	openCnt: number = 0;
	isShowBtnDisabled: boolean = false;
	minDate = new Date();
	maxDate = new Date();
	isShowData: boolean = false;
	isDisableDate: boolean = false;
	checked = false;

	private _onDestroy$ = new Subject<void>();

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private _formBuilder: FormBuilder, private _sdmsModel: SdmsModel,
		private _sharedApiModel: SharedApiModel, private modalCtrl: ModalController,
		private _popupModel: PopupModel) {
		this.collectionReportForm = _formBuilder.group({
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
		this.showDrillCollectionDetails = false;
	}

	ionViewDidLoad() {
		//Period
		this.collectionReportForm.get('periodActive').valueChanges
			.pipe(takeUntil(this._onDestroy$)).subscribe((pa: any) => {
				if (pa == true) {
					this.result = [];
					this.isShowData = false;
					this.collectionReportForm.controls['dayWise'].setValue('W');
					this.collectionReportForm.get('dayWise').setValidators([Validators.required]);
				}
				else {
					this.result = [];
					this.isShowData = false;
					this.setFormDefaultValue();
					this.collectionReportForm.controls['dayWise'].setValue('');
					this.collectionReportForm.get('dayWise').setValidators([]);
				}
				this.collectionReportForm.get('dayWise').updateValueAndValidity();
			})

		//DayWise

		this.collectionReportForm.get('dayWise').valueChanges
			.pipe(takeUntil(this._onDestroy$)).subscribe((dw: string) => {
				var toDay = new Date();
				if (dw == IDayWise.week) {
					this.isShowData = false;
					let weekDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
					this.collectionReportForm.controls['fromDate'].setValue(weekDay);
					this.collectionReportForm.controls['toDate'].setValue(toDay);
					this.result = [];
				}
				else if (dw == IDayWise.days15) {
					this.isShowData = false;
					let fifteenDay = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
					this.collectionReportForm.controls['fromDate'].setValue(fifteenDay);
					this.collectionReportForm.controls['toDate'].setValue(toDay);
					this.result = [];
				}
				else if (dw == IDayWise.month) {
					this.isShowData = false;
					var now = new Date();
					var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
					var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
					this.collectionReportForm.controls['fromDate'].setValue(prevMonthFirstDate);
					this.collectionReportForm.controls['toDate'].setValue(prevMonthLastDate);
					this.result = [];
				}
				else if (dw == IDayWise.quarter) {
					this.isShowData = false;
					var now = new Date();
					var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
					var prevThirdMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 3 + 12) % 12, 1);
					this.collectionReportForm.controls['fromDate'].setValue(prevThirdMonthFirstDate);
					this.collectionReportForm.controls['toDate'].setValue(prevMonthLastDate);
					this.result = [];
				}
			});

		//End of Daywise
		this._sharedApiModel.getLocations()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.locations = data);

		this._sharedApiModel.getCustomers()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.customers = data);

		this.showResult$ = this._sdmsModel.getCollectionReportLoaded();
		// this.result$ = this._sdmsModel.getCollectionReport();
		this._sdmsModel.getCollectionReport()
			.pipe(takeUntil(this._onDestroy$)).subscribe(data => {
				this.result = [];
				// this.result = data != null ? data : [];
				if (data != null) {
					if (data.length > 0) {
						this.result = data;
					}
					else {
						this._popupModel.warningMessage('No Data')
							.then(() => {
								this.isExpanded = true;
								this._sdmsModel.resetCollectionReport();
							})
					}
				}
				else {
					this.result = [];
				}
				//find the total
				this.totalCollection = 0;
				if (this.result) {
					this.result.map((data) => {
						this.totalCollection = this.totalCollection + parseFloat(data.recievedAmnt);
					});
				}

			});

		this.showDrillCollectionDetails = false;
		console.log('ionViewDidLoad CollectionSalesReportPage');
		this._sharedApiModel.loadLocations();
		this._sharedApiModel.loadCustomers();
		this.collectionReportForm.valueChanges.distinctUntilChanged().subscribe(data => this.isShowBtnDisabled = false);

		this._sdmsModel.getCollectionDetailsLoaded().distinctUntilChanged()
			.pipe(takeUntil(this._onDestroy$)).subscribe(reportLoaded => {
				this.isShowBtnDisabled = false;
				if (reportLoaded && this.showDrillCollectionDetails && this.openCnt == 0) {
					let collectionDetailsModal = this.modalCtrl.create('CollectionDetailsReportPage', { 'CustomerData': this.selectedCustomer }, {
						showBackdrop: true
					});
					collectionDetailsModal.present();
					this.openCnt++;
				}
			});
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
		this.collectionReportForm.controls['fromDate'].setValue(fromDate);
		this.collectionReportForm.controls['toDate'].setValue(today);
		this.maxDate = today;
		this.submitAttempt = false;
	}

	loadReport() {
		if (this.collectionReportForm.valid) {
			this.isExpanded = false;
			this.isShowData = true;
			let data: ISdmsReportRequest = {
				locationCode: this.collectionReportForm.value.location != '' ? (this.collectionReportForm.value.location.map(l => l.id).join(',')) : '',
				customerCode: this.collectionReportForm.value.customer != '' ? this.collectionReportForm.value.customer.customerCode : '',
				dateData: {
					fromDate: this.collectionReportForm.value.fromDate,
					toDate: this.collectionReportForm.value.toDate
				}
			};
			this._sdmsModel.loadCollectionReport(data);
			this.isExpanded = false;
			this.showDrillCollectionDetails = false;
		}
		this.isShowBtnDisabled = true;
	}

	showCollectionDetails(collectionEntry: ICollectionReportData) {
		let data: ISdmsReportRequest = {
			locationCode: collectionEntry.locationCode != null ? collectionEntry.locationCode : '',
			customerCode: collectionEntry.customerCode,
			dateData: {
				fromDate: this.collectionReportForm.value.fromDate,
				toDate: this.collectionReportForm.value.toDate,
			},
			sessionId: collectionEntry.sessionId
		};
		this._sdmsModel.loadCollectionDetails(data);
		this.showDrillCollectionDetails = true;
		this.openCnt = 0;
		this.selectedCustomer = collectionEntry;
	}

	ionViewDidLeave() {
		this._onDestroy$.next();
		this._onDestroy$.complete();
	}
	gotoBack() {
		this.navCtrl.pop();
	}

	goToHome() {

		// this.navCtrl.pop();
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
	// carry out the actual date checks here for is-endDate-after-startDate
	// if valid, return null,
	// if invalid, return an error object (any arbitrary name), like, return { invalidEndDate: true }
	// make sure it always returns a 'null' for valid or non-relevant cases, and a 'non-null' object for when an error should be raised on the formGroup
}

