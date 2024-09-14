import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ILocation } from '../../../../../shared/models/location.interface';
import { IEcode } from '../../../../../shared/models/ecode.interface';
import { SOModel } from '../../../../facades/so';
import { IOrderHeader, IECodeRequest, IOrderDetails, ICreditCheckRequest } from '../../../../models/so.interface';
import { PopupModel } from '../../../../../shared/facades/popup';
import { UserModel } from '../../../../../auth/facades/user';
import { SharedApiModel } from '../../../../../shared/facades/shared-api';
import { checkInventoryRecoYn } from '../../../../../shared/models/transaction.interface'
import { Subscription } from 'rxjs';
import { ICheckFinancialYearRequest } from '../../../../../sdms/models/so.interface';
/**
 * Generated class for the CvrLocationEcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-cvr-location-ecode',
	templateUrl: 'cvr-location-ecode.html',
})
export class CvrLocationEcodePage {
	locationEcodeForm: FormGroup;
	submitAttempt = false;
	customer;
	locations: ILocation[] = [];
	ecodes: IEcode[] = [];
	locationSearchValueKeys: Array<string> = ['id', 'value'];
	ecodeSearchValueKeys: Array<string> = ['ecode', 'ecodeDisplayName'];
	maxDate = new Date();
	minDate = new Date();
	isLoading: boolean = false;
	private _onDestroy$ = new Subject<void>();
	orderDetails: IOrderDetails;
	loggedUserInfo;
	inventoryFlag;
	subscription: Subscription;
	loggedInUser;
	employeeFullName: string;
	transaction: any;
	favoriteData: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private _formBuilder: FormBuilder,
		private _soModel: SOModel, private _popupModel: PopupModel, private _userModel: UserModel,
		private _SharedApiModel: SharedApiModel) {
		this.locationEcodeForm = _formBuilder.group({
			'location': ['', Validators.required],
			'ecode': ['', Validators.required],
		});
		
		this.customer = this.navParams.get('customer');
		this.transaction = this.navParams.get('transaction');
		this.favoriteData = this.navParams.get('favoriteData');
		//this.setFormDefaultValue();
	}

	ionViewDidEnter() {
		this._soModel.isLoading()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoading => this.isLoading = isLoading);
		this._SharedApiModel.isLoading()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoading => this.isLoading = isLoading);
		//Location
		this._soModel.loadLocations('SDMS');

		this._soModel.getLocations()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => {
				this.locations = data
				if (this.locations.length == 1) {
					this.locationEcodeForm.controls['location'].setValue(this.locations[0]);
					this.getEcodes(); 
				}
				else if (this.locations.length > 1) {
					
					let favLocationCode = this.favoriteData.locationCode;
					let favLocation = this.locations.filter((loc) => loc.id == favLocationCode);
					this.locationEcodeForm.controls['location'].setValue(favLocation[0]);
					this.getEcodes();
				}
			});
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CvrLocationEcodePage');
		this._soModel.getValidFinancialYearStatus()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => {
				console.log("finace data", data);
				if (data && typeof data == "string" && data.match(/0:/i)) {
					this._popupModel.warningMessage(data.split(/\d:/)[1])
						.then(() => {
							this._onDestroy$.next();
							this._onDestroy$.complete();
							this.navCtrl.setPages([{ page: 'MenuPage' }]);
						})
				}
			})
		this._userModel.getLoggedInUser()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => {
				
				this.loggedInUser = data;
			});
		//Ecode	  

		this._soModel.getEcodes()
			.pipe(takeUntil(this._onDestroy$))
			// .subscribe( data => this.ecodes = data );
			.subscribe(data => {
				this.ecodes = data
				if (this.ecodes.length == 1) {
					this.locationEcodeForm.controls['ecode'].setValue(this.ecodes[0]);
				}
				else if (this.ecodes.length > 1) {
					
					let favEcode = this.ecodes.filter((ec) => ec.eppsCode == this.favoriteData.eppsCode);
					this.locationEcodeForm.controls['ecode'].setValue(favEcode[0]);
				}
			});
		
		this.locationEcodeForm.controls['ecode'].valueChanges.subscribe(response => {
			if (response) {
				let requestData: checkInventoryRecoYn = {
					'locationCode': this.locationEcodeForm.value.location.id
				}
				this._SharedApiModel.checkInventoryRecoYn(requestData);
			}
		});

		this.subscription = this._SharedApiModel.getInventoryRecord()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(response => {
				if (response) {
					this.inventoryFlag = response;
				}
			});

	}
	getEcodes() {
		if (this.locationEcodeForm.value.location != "") {
			
		let request: IECodeRequest = {
			'moduleId': this.transaction.moduleId,
			'tranIndicator': this.transaction.tranIndicator,
			'locationCode': this.locationEcodeForm.value.location.id,
			'transactionPId': this.transaction.programId
		}
		this._soModel.loadECodes(request);
	}
	}
	ionViewDidLeave() {
		this._onDestroy$.next();
		this._onDestroy$.complete();
		// this._soModel.resetMonthlySalesReport();
	}

	gotoBack() {
		this.navCtrl.pop();
	}

	save() {
		if (this.locationEcodeForm.valid) {
			this.checkFin();
			if (this.inventoryFlag == "Y") {
				this._popupModel.warningMessage('Stock Reconciliation is under progress. Hence, the transaction cannot be processed')
			}
			else {
				
				this.navCtrl.push('CustomerVisitReportPage', {
					locationName: this.locationEcodeForm.controls['location'].value.value,
					locationCode: this.locationEcodeForm.controls['location'].value.id,
					ecodeName: this.locationEcodeForm.controls['ecode'].value.ecodeDisplayName,
					ecode: this.locationEcodeForm.controls['ecode'].value.eppsCode,
					customerCode: this.loggedInUser.value.employeeCode
				});
			}
		}
	}

	checkFin() {

		var transDate = new Date();
		var formatedDate = transDate.getDate() + '/' + (transDate.getMonth() + 1) + '/' + transDate.getFullYear();
		let financeRequest: ICheckFinancialYearRequest = {
			locationCode: '' + this.locationEcodeForm.value.location.id, //location code
			tranDate: formatedDate,
			isFromSaveOrUpdate: 'false'
		}
		this._soModel.checkValidFinancialYear(financeRequest);
	}

}
