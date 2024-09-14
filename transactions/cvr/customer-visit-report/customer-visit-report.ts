import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil, take } from 'rxjs/operators';
import { UserModel } from '../../../../../auth/facades/user';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../../shared/format-date';
import { SOService } from '../../../../services/so.service';
import { Geolocation } from '@ionic-native/geolocation';
import { PopupModel } from '../../../../../shared/facades/popup';
import { SharedApiService } from '../../../../../shared/services/shared-api.service';
import { SharedTransactionModel } from '../../../../../shared/facades/shared-transactions';
import * as moment from 'moment';
import { SOModel } from '../../../../facades/so';

/**
 * Generated class for the CustomerVisitReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-customer-visit-report',
	templateUrl: 'customer-visit-report.html',
	providers: [
		{
			provide: DateAdapter, useClass: AppDateAdapter
		},
		{
			provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
		}
	]
})
export class CustomerVisitReportPage {
	locationName: any;
	locationCode: any;
	ecodeName: any;
	ecodeCode: any;
	customerVisitReportForm: FormGroup;
	submitAttempt = false;
	customers: any = [];
	customerSearchValueKeys: Array<string> = ['id', 'value'];
	povs = [];
	pms = [];
	pmSearchValueKeys: Array<string> = ['employeeCode', 'employeeFullName'];
	actionDetailsArray = [];
	loggedEmployee: any;
	customerCode: any;
	isUploadImage: boolean = true;
	actionLists: boolean = true;
	maxCvrDate = new Date();
	isUploadImagePopupClosed: boolean = true;
	isLoading: boolean = false;
	latitude :number = 0;
	longitude: number = 0;
	sessionId: any;
	remarksFinal = "";
	cvrDtos = [];
	private _onDestroy$: Subject<boolean> = new Subject<boolean>();
	constructor(public navCtrl: NavController, public navParams: NavParams,
		private _formBuilder: FormBuilder, private _soService: SOService,
		private loadingController: LoadingController,
		private modalCtrl: ModalController,
		private geolocation: Geolocation,
		private _userModel: UserModel,
		private popoverCtrl: PopoverController,
		private _popupModel: PopupModel,
		private sharedApiService: SharedApiService,
		private platform: Platform,
		private _transactionModel: SharedTransactionModel,
		private _soModel: SOModel,
		private _SOService: SOService) {
	
		this.locationName = this.navParams.get('locationName');
		this.locationCode = this.navParams.get('locationCode');
		this.ecodeName = this.navParams.get('ecodeName');
		this.ecodeCode = this.navParams.get('ecode');
		this.customerCode = this.navParams.get('customerCode');
		this.customerVisitReportForm = _formBuilder.group({
			'customer': ['', Validators.required],
			'pov': ['', Validators.required],
			'pm': ['', Validators.required],
			'cvrd': ['', Validators.required],
			'cvrDate': ['', Validators.required],
			'actualVisitDate': [''],
			'avsd': [''],
			'aved': [''],
			'cp': [''],
			'desoc': [''],
			'depoc': [''],
			'cvrLongitude': [''],
			'cvrLatitude': ['']
		});
		this.setFormDefaultValue();
	}

	ionViewDidEnter() {
		this._soModel.isLoading()
		.pipe(takeUntil(this._onDestroy$))
		.subscribe(isLoading => this.isLoading = isLoading);
        this._transactionModel.isLoading()
        .pipe(takeUntil(this._onDestroy$))
		.subscribe(isLoading => this.isLoading = isLoading);

		this._soService.getCVRCustomers()
			.subscribe(data => {
				let loading = this.loadingController.create({
					spinner: "crescent",
				});
				loading.present();
				if (data) {
				
					loading.dismiss();
					this.customers = data.rows;
				}
			});
		if (this.ecodeCode == '2651') {
			this.customerVisitReportForm.get('pm').setValidators([Validators.required]);
			let requestEmployee = {
				activeYn: 'Y',
				employeeType: 'P'
			}
			this._soService.getCVREmployees(requestEmployee)
				.subscribe(data => {
					let loading = this.loadingController.create({
						spinner: "crescent",
					});
					loading.present();
					if (data) {
					
						loading.dismiss();
						this.pms = data.rows;
					}
				});
		}
		else if (this.ecodeCode == '2652') {
			this.customerVisitReportForm.get('pm').setValidators([]);
			this.platform.ready().then(()=>{
				var options = {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				};
				this.geolocation.getCurrentPosition(options).then((resp) => {
						this.longitude = resp.coords.longitude;
						this.latitude = resp.coords.latitude;
						console.log('Longitude' + this.longitude);
						console.log('Latitude' + this.latitude);
						}).catch(error => {
						console.log('Error getting location', error);
						this._popupModel.warningMessage('Plz. give EPPS SMART ERP, permission to access your location');
					});
				var subscription = this.geolocation.watchPosition()
					.filter(p => { return p.coords !== undefined; }) //Filter Out Errors
					.subscribe(position => {
						console.log(position.coords.longitude + ' ' + position.coords.latitude);
					});
				// To stop notifications
				subscription.unsubscribe();
			});
		}

		this.customerVisitReportForm.controls['pm'].patchValue('', { onlySelf: true, emitEvent: false });
        this.customerVisitReportForm.get('pm').updateValueAndValidity();
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CustomerVisitReportPage');
		//Get Session Id
		
		this.sharedApiService.getSessionId()
		.subscribe(res => {
				this.sessionId = res;
			});
		this._userModel.getLoggedInUser()
			.pipe(takeUntil(this._onDestroy$))
			.map(user => user.value)
			.subscribe(user => this.loggedEmployee = user);

	}

	openPreviousPOV() {
	
		let requestPOV = {
			distinctColumn: 'purposeOfVisit',
			queryFlag: 'P'
		}
		this._soService.getCVRPreviousPurpose(requestPOV)
			.subscribe(data => {
				let loading = this.loadingController.create({
					spinner: "crescent",
				});
				loading.present();
				if (data) {
					loading.dismiss();
					this.povs = data.data;
					let povModal = this.modalCtrl.create('PurposeOfVisitPage', {
						'povs': this.povs,
					}, {
						showBackdrop: true

					});
					povModal.onDidDismiss(data => {
						if (data) {
						
							this.customerVisitReportForm.controls['pov'].patchValue(data.selectedPOVDetails.value);
						}
					})
					povModal.present();
				}
			});
	}

	openActionPage() {
		let actionModal = this.modalCtrl.create('AddActionPage', {}, {
			showBackdrop: true

		});
		actionModal.onDidDismiss(data => {
			if (data) {
			
				this.actionDetailsArray = data.actionArray;
				this.cvrDtos = data.cvrDtos;
				this.actionLists = false;
			}
		})
		actionModal.present()
	}

	//Open Popup for Image Load
	openPopupImageFile(myEvent) {
	
		var popoverUpload = this.popoverCtrl.create('CvrUploadImagePage', {
			cvrDataForImageUpload: {
				locationCode: this.locationCode,
				ecode: this.ecodeCode,
				customerCode: this.customerCode
			}
		},
	 { 
		 //showBackdrop: false,
		 enableBackdropDismiss: false
	});
			popoverUpload.present({
				ev: myEvent
			  });	
			popoverUpload.onDidDismiss(data => {
		
				this.isUploadImage = data.closedPopup;
				this.sessionId = data.sessionId;
			});

	}

	confirmCvr() {
		if (this.customerVisitReportForm.valid) {
		
			if (this.isUploadImage == true) {
				this._popupModel.alertMessage("Please upload the image by clicking Camera Icon");
				this.actionLists = false;
				return false;
			}
			if (this.ecodeCode == '2651') {
				var actualVisitDate = new Date(this.customerVisitReportForm.value.actualVisitDate);
				var actualVisitStartTime = new Date(this.customerVisitReportForm.value.avsd);
				var actualVisitEndTime = new Date(this.customerVisitReportForm.value.aved);
				if (this.customerVisitReportForm.value.actulalVisitDate == undefined && this.customerVisitReportForm.value.avsd != "" && this.customerVisitReportForm.value.aved != "") {
					this._popupModel.alertMessage(" Please Enter Actual Visit Time ");
					this.actionLists = false;
					return false;
				}
				if (this.customerVisitReportForm.value.actulalVisitDate != undefined && this.customerVisitReportForm.value.avsd == "" && this.customerVisitReportForm.value.aved == "") {
					this._popupModel.alertMessage(" Please Enter Actual Start and End Visit Time ");
					this.actionLists = false;
					return false;
				}
				if (this.customerVisitReportForm.value.actulalVisitDate != undefined && this.customerVisitReportForm.value.avsd == "" && this.customerVisitReportForm.value.aved != "") {
					this._popupModel.alertMessage(" Please Enter Actual Visit Start Time ");
					this.actionLists = false;
					return false;
				}
				if (this.customerVisitReportForm.value.actulalVisitDate != undefined && this.customerVisitReportForm.value.avsd != "" && this.customerVisitReportForm.value.aved == "") {
					this._popupModel.alertMessage(" Please Enter Actual Visit End Time ");
					this.actionLists = false;
					return false;
				}
				if (this.customerVisitReportForm.value.actulalVisitDate != "" && this.customerVisitReportForm.value.avsd != "" && this.customerVisitReportForm.value.aved != "") {
					if (actualVisitStartTime.getTime() > actualVisitEndTime.getTime()) {
						this._popupModel.alertMessage(" Actual Visit Start Time not grater than Actual Visit End Time ");
						this.actionLists = false;
						return false;
					}
				}
			}
			if (this.ecodeCode == 2652) {
				if (this.customerVisitReportForm.value.cvrLongitudeOut == "") {
					this._popupModel.warningMessage("Please give access for Location to EPPS SMART App");
					this.actionLists = false;
					return false;
				}
				if (this.customerVisitReportForm.value.cvrLatitudeOut == '') {
					this._popupModel.warningMessage("Please give access for Location to EPPS SMART App");
					this.actionLists = false;
					return false;
				}
			}
			var persontToMeet = this.customerVisitReportForm.controls['cp'].value;
			if (persontToMeet.length > 30) {
				this._popupModel.alertMessage(" Person To Meet is not more than 30 characters ");
				this.actionLists = false;
				return false;
			}
			this.actionLists = true;
			var request = {
                ecode: '' + this.ecodeCode,
                tranIndicator: 'CVR',
                oprationMode: 'insert',
                tranMenuPassParameterId: '',
                tranHdrSrNo: '0',
                tranIndType: '',
                chargeValueForApprove: '' + 0,
                locationCode: '' + this.locationCode
            };
			this._transactionModel.LoadTransactionStages(request);
            var transactionStageData = {
                totalChargeValue: '' + 0,
                tranIndicator: 'CVR',
                transCode: '' + this.ecodeCode,
                locationCode: '' + this.locationCode,
                creditLimitFlagYn: '',
                operationMode: 'insert',
                condBasedTreeCode: '',
                treeNameCode: '',
                transHeaderSrNo: '0',
                tranIndicatorName: '',
                tranRemarks: ''
            };
			var popover = this.popoverCtrl.create('TransactionStagePage', {
                transactionDetails: transactionStageData
            });
           popover.present();
			popover.onDidDismiss(tranStageData => {
                if (!!tranStageData) {
                    var remarks = tranStageData.remarks;
                    var remarksNotMan = tranStageData.remarksNotMan;
                    if (remarks != "") {
                        this.remarksFinal = remarks;
                    }
                    else if (remarksNotMan != "") {
                        this.remarksFinal = remarksNotMan;
                    }
                    else {
                        this.remarksFinal = "";
                    }
                    var actualVisitDate;
                    var formatedaActualVisitDate;
                    var actualVisitStartTime;
                    var formatedaActualVisitStartTime;
                    var actualVisitEndTime;
                    var formatedaActualVisitEndTime;
                    if (this.customerVisitReportForm.value.actulalVisitDate == undefined) {
                        formatedaActualVisitDate = "";
                    }
                    else {
                        actualVisitDate = new Date(this.customerVisitReportForm.value.actualVisitDate);
                        formatedaActualVisitDate = actualVisitDate.getDate() + '/' + (actualVisitDate.getMonth() + 1) + '/' + actualVisitDate.getFullYear();
                    }
                    if (this.customerVisitReportForm.value.avsd == "") {
                        formatedaActualVisitStartTime = "";
                    }
                    else {
                        actualVisitStartTime = new Date(this.customerVisitReportForm.value.avsd);
                        formatedaActualVisitStartTime = moment(actualVisitStartTime).format('DD/MM/YYYY hh:mm a');
                    }
                    if (this.customerVisitReportForm.value.aved == "") {
                        formatedaActualVisitEndTime = "";
                    }
                    else {
                        actualVisitEndTime = new Date(this.customerVisitReportForm.value.aved);
                        formatedaActualVisitEndTime = moment(actualVisitEndTime).format('DD/MM/YYYY hh:mm a');
                    }
                    var actualCvrDate = new Date(this.customerVisitReportForm.value.cvrDate);
                    var formatedcvrDate = actualCvrDate.getDate() + '/' + (actualCvrDate.getMonth() + 1) + '/' + actualCvrDate.getFullYear();
                    var sdCVRActDtlDTOList = this.cvrDtos;
                    var cvrObj = {
                        actualVisitDtToString: (this.ecodeCode == '2651') ? formatedaActualVisitDate : "",
                        actualVisitEndTimeToString: (this.ecodeCode == '2651') ? formatedaActualVisitEndTime : "",
                        actualVisitStartTimeToString: (this.ecodeCode == '2651') ? formatedaActualVisitStartTime : "",
                        custCd: this.customerVisitReportForm.controls['customer'].value.id,
                        cvrDetails: this.customerVisitReportForm.controls['cvrd'].value,
                        cvrDocDtToString: formatedcvrDate,
                        cvrDocNo: "",
                        cvrDtToString: formatedcvrDate,
                        cvrHdrSrNo: "",
                        cvrLat: (this.ecodeCode == '2652') ? this.latitude : "",
                        cvrLong: (this.ecodeCode == '2652') ? this.longitude : "",
                        cvrNo: "",
                        cvrType: this.ecodeCode,
                        deptOfPersonMet: (this.ecodeCode == '2652') ? this.customerVisitReportForm.controls['depoc'].value : "",
                        desigOfPersonMet: (this.ecodeCode == '2652') ? this.customerVisitReportForm.controls['desoc'].value : "",
                        locCd: this.locationCode,
                        personMet: (this.ecodeCode == '2652') ? this.customerVisitReportForm.controls['cp'].value : "",
                        personToMet: (this.ecodeCode == '2651') ? this.customerVisitReportForm.controls['pm'].value.employeeCode : "",
                        purposeOfVisit: this.customerVisitReportForm.controls['pov'].value,
                        sdCVRActDtlDTOList: sdCVRActDtlDTOList,
                        sessionId: this.sessionId,
                        stageRemarks: this.remarksFinal,
                        transactionStage: tranStageData.transStage.id,
                        tranIndicatorTypeId: (this.ecodeCode == '2652') ? 'CUSTOMER_VISIT_OUT' : 'CUSTOMER_VISIT_IN'
                    };
					this._SOService.saveCvr(cvrObj)
					.pipe(takeUntil(this._onDestroy$))
					.subscribe(data => {
						let loading = this.loadingController.create({
							spinner: "crescent",
						});
						loading.present();
						if(data){
							loading.dismiss();
							let sucessMessage;
							sucessMessage = data.message;
							let userResponse = this._popupModel.successMessage(sucessMessage);
							if(userResponse){
								this.navCtrl.setPages([{ page: 'MenuPage' }, { page: 'ModuleHomePage', params: { moduleId: 'SDMS' } }]);
							}
						}
					})
				}
			})
		}
		
	}

	setFormDefaultValue() {
		var tzoffset = (new Date()).getTimezoneOffset() * 60000;
		var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
		//get last dat of the current month
		var today = new Date();
		var y = today.getFullYear();
		var lastDay = new Date(y, today.getMonth() + 1, 0);
		// this.locationEcodeForm.controls['validToDate'].setValue(today);
		this.customerVisitReportForm.controls['cvrDate'].setValue(today);
		this.maxCvrDate = today;
		//this.minDate = today;
		this.submitAttempt = false;
	};

	checkFin() {
        var transDate = new Date();
        var formatedDate = transDate.getDate() + '/' + (transDate.getMonth() + 1) + '/' + transDate.getFullYear();
        var financeRequest = {
            locationCode: '' + this.locationCode,
            tranDate: formatedDate,
            isFromSaveOrUpdate: 'false'
        };
        this._soModel.checkValidFinancialYear(financeRequest);
    };

	goToBack() {
		this.navCtrl.pop();
        this._onDestroy$.next();
        this._onDestroy$.complete();
	}

	ionViewDidLeave() {
		this._onDestroy$.next();
		this._onDestroy$.complete();

	}

}
