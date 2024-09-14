import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ViewController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/zip';
import { DatePipe } from '@angular/common';
import { CollectionModel } from '../../../../facades/collection';
import { SOModel } from '../../../../facades/so';
import { ICustomerDetailRequest, IGlobalMobPdcHdr, IGlobalMobSalesPdcDtl, ISaveCollectionRequest } from '../../../../models/collection.interface';
import { PopupModel } from '../../../../../shared/facades/popup';
import { ILocation } from '../../../../../shared/models/location.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { getParentRenderElement } from '@angular/core/src/view/util';

@IonicPage()
@Component({
	selector: 'page-customer-outstanding',
	templateUrl: 'customer-outstanding.html',
})
export class CustomerOutstandingPage {
	private _onDestroy$:Subject<boolean> = new Subject<boolean>();
	customerDetails;
	loggedEmployee;
	customerDetails$;
	loggedEmployee$;
	invoices = [];
	selectedInvoices = [];
	totalBillAmount = 0;
	totalInvAmount = 0;
	isLoading: boolean = false;
	showSearch: boolean = false;
	search : string = '';
	locations: ILocation[] = [];
	locationSearchValueKeys : Array<string> = ['id','value'];
	customerOutstandingForm:FormGroup;
	allInvoices=[];
	ifNoLocationSelected:boolean=false;
	countofPopup:number=1;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private _collectionModel: CollectionModel, private _soModel: SOModel,
		private popoverCtrl: PopoverController, private datePipe: DatePipe,
		public viewCtrl:ViewController, private _popupModel: PopupModel, 
		private _formBuilder:FormBuilder) {
		this.customerOutstandingForm = _formBuilder.group({
				'location': ['',Validators.required]	
		});	
	}

	ionViewDidEnter() {
		this._soModel.isLoading()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoading => this.isLoading = isLoading);
		this._collectionModel.isLoading()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(isLoading => this.isLoading = isLoading);
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad CustomerOutstandingPage:', this.navCtrl.getActive().index);
		this.customerDetails$ = this._collectionModel.getCustomerDetails();
		this.loggedEmployee$ = this._collectionModel.getLoggedEmployeeLocationCollection();

		Observable.zip(this.customerDetails$, this.loggedEmployee$).subscribe(res => {
			console.log("res", res);
			let request: ICustomerDetailRequest = {
				customerCode: res[0]['customerCode'],
				locationCode: res[1]['locationCode']
			}
			this._collectionModel.loadCustomerInvoices(request);
		});

		this.customerDetails$
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(customer => this.customerDetails = customer);

		this.loggedEmployee$
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(data => this.loggedEmployee = data);

		//---------------Location--------------
		this._soModel.loadLocations('SDMS');
    
		this._soModel.getLocations()
		  .pipe(takeUntil(this._onDestroy$))
		  // .subscribe( data => this.locations = data );
		  .subscribe( data => {
			this.locations = data 
			if(this.locations.length == 1) {
			  this.customerOutstandingForm.controls['location'].setValue(this.locations[0]);
			}
		});	

		this._collectionModel.getCustomerInvoices()
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(
				(invoices) => {
					this.allInvoices=invoices;
					this.invoices = invoices.map(invoice =>{
						if(invoice['refInvDt']){
							invoice['dateFormatedForSearchRef'] = this.datePipe.transform(invoice['refInvDt'], 'dd-MMM-yyyy');
						}
						if(invoice['dueDt']){
						 	invoice['dateFormatedForSearch'] = this.datePipe.transform(invoice['dueDt'], 'dd-MMM-yyyy');
						}
						this.total(this.invoices);
						return invoice;
					})
				}
			);
		this._collectionModel.getCollectionSaved()
			.pipe(takeUntil(this._onDestroy$))
			.distinctUntilChanged()
			.subscribe(status => {
				if(status && status != null){
				   let msg = 'Collection Saved!'
				   this._popupModel.successMessage(msg).then(() => {
					   this._onDestroy$.next();
						this._collectionModel.resetCollection();
						this.navCtrl.setPages([{page: 'MenuPage'}, { page : 'ModuleHomePage', params : {moduleId : 'SDMS'}}, {page : 'CreateCollectionPage'}]);
				   });
				}
			});

			this._collectionModel.getPartialCollectionSaved()
			.pipe(takeUntil(this._onDestroy$))
			.distinctUntilChanged()
			.subscribe(status => {
				if(status && status != null){
					let msg = 'Collection Saved!'
					this._popupModel.successMessage(msg).then(() => {
						this._onDestroy$.next(true);
						 this._collectionModel.resetCollection();
						 this.navCtrl.setPages([{page: 'MenuPage'}, { page : 'ModuleHomePage', params : {moduleId : 'SDMS'}}, {page : 'CreateCollectionPage'}]);
					});
				 }
			});	

			
	}

	 //ClassName () {
	//			 return this.customerOutstandingForm.controls['location'].value==''? 'red' : 'noColor';
	//}

    handleCheck(status, data) {
		//this.totalBillAmount = 0;
			if (status) {
				this.selectedInvoices.push(data);
				//this.totalBillAmount = this.totalInvAmount + parseFloat(data.fcNetAmt);
				this.totalBillAmount = this.totalBillAmount + parseFloat(data.balToAdjFcAmt);
			} else {
				this.selectedInvoices = this.selectedInvoices.filter(inv => inv.invhHdrSrNo != data.invhHdrSrNo);
				//this.totalBillAmount = this.totalInvAmount - parseFloat(data.fcNetAmt);
				this.totalBillAmount = this.totalBillAmount - parseFloat(data.balToAdjFcAmt);
			}
	}
	
	collectAmount(myEvent) {
		//set selected invoices
		//CALCULATE invoice total
		// let totalBillAmount = this.selectedInvoices.reduce((total, invoice) => total + parseFloat(invoice.fcNetAmt), 0);
		if (this.customerOutstandingForm.valid){
			let totalBillAmount = this.selectedInvoices.reduce((total, invoice) => total + parseFloat(invoice.balToAdjFcAmt), 0);
			this._collectionModel.setSelectedInvoices(this.selectedInvoices);
			let popover = this.popoverCtrl.create('PaymentCollectionPage', {
				totalBillAmount : totalBillAmount,
				isBillEditable : false,
				isPartialCollection : false
			});
			popover.present({
				ev: myEvent
			});
	
			popover.onDidDismiss(paymentData => {
				//do payment calls
				if(!!paymentData){
					if(!!paymentData){
						this.collectionSaved(paymentData);
					}
				}
			});

		}	
	}
	gotoBack() {
		this.showSearch = false;
		this.search = "";
		this.navCtrl.pop();
	}

	ionViewDidLeave() {
		this.showSearch = false;
        this.search = "";
		this._onDestroy$.next();
		this._onDestroy$.complete();
	}

	toggleInvoiceSearch(){
    this.showSearch = this.showSearch ? false : true;
    if(this.showSearch == true){
		setTimeout(() => {
                document.getElementById("searchInvoice").focus();
            });
		}
		if(this.showSearch == false){
			this.search = "";
		}
  }

	partialCollection(myEvent) {
		if (this.customerOutstandingForm.valid){
			let popover = this.popoverCtrl.create('PaymentCollectionPage', {
			  totalBillAmount : '0.00',
			  isBillEditable : true,
			  isPartialCollection : true
		  });
		  popover.present({
			  ev: myEvent
		  });
  
		  popover.onDidDismiss(paymentData => {
			  //do payment calls
			  if(!!paymentData){
				   this.collectionSaved(paymentData);
			  }
		  });

		}
  }

  collectionSaved(paymentData){
	  
  	let curentDate=new Date();
	let formatedCurrentDate=curentDate.getFullYear() +'-'+ (curentDate.getMonth()+1) +'-'+curentDate.getDate();
	if(paymentData.controls['isPartialCollection'].value==false){
		let payMode = "" , reciptType = "";
		if(paymentData.controls['paymentMode'].value == '1'){
			payMode= "Cash";
			reciptType = 'C';
		}else if(paymentData.controls['paymentMode'].value == '2'){
			payMode =paymentData.controls['paymentType'].value?paymentData.controls['paymentType'].value.value:'';
			reciptType = 'B';
		}
		let globalMobPdcHdr: IGlobalMobPdcHdr = {
			customerCode : this.customerDetails.customerCode,
			custGlCode : this.selectedInvoices[0].glCode,
			custSlCode : this.selectedInvoices[0].slCode,
			bankName : paymentData.controls['bankName'].value,
			chequeNo : paymentData.controls['chequeNo'].value,
			chequeDt : paymentData.controls['chequeDate'].value,
			amount : '' + this.totalBillAmount,
			remarks : paymentData.controls['comment'].value,
			receiptType : reciptType,
			paymentMode : payMode,
			//locationCode : this.loggedEmployee.locationCode,
			locationCode : this.customerOutstandingForm.controls.location.value.id,
			eppsCode : 'MRV',
			collectionDate : formatedCurrentDate
		};
	
		let globalMobSalesPdcDtl: Array<IGlobalMobSalesPdcDtl> = []
		this.selectedInvoices.forEach(invoice => {
			let obj:IGlobalMobSalesPdcDtl = {
			companyCode : invoice.companyCode,
			divisionCode : invoice.divisionCode,
			locationCode : invoice.locationCode,
			invhSrNo : invoice.invhHdrSrNo,
			invhType : invoice.invhType,
			invhDt : invoice.refInvDt,
			glCode : invoice.glCode,
			slCode : invoice.slCode,
			// recieveFcAmnt : invoice.fcNetAmt,
			recieveFcAmnt : invoice.balToAdjFcAmt,
			pdcYn : 'N'
			};
			globalMobSalesPdcDtl.push(obj);
		});
	
		let request: ISaveCollectionRequest = {
			globalMobPdcHdr:[globalMobPdcHdr],
			globalMobSalesPdcDtl : globalMobSalesPdcDtl
		};
		this._collectionModel.saveCollection(request);
	}else if(paymentData.controls['isPartialCollection'].value==true){
			let payMode="", reciptType = "";
		if(paymentData.controls['paymentMode'].value == '1'){
			payMode= "Cash";
			reciptType = 'C';
		}else if(paymentData.controls['paymentMode'].value == '2'){
			payMode =paymentData.controls['paymentType'].value?paymentData.controls['paymentType'].value.value:'';
			reciptType = 'B';
		}
		let globalMobPdcHdr: IGlobalMobPdcHdr = {
				customerCode : this.customerDetails.customerCode,
				custGlCode : this.customerDetails.glCode,
				custSlCode : this.customerDetails.slCode,
				bankName : paymentData.controls['bankName'].value,
				chequeNo : paymentData.controls['chequeNo'].value,
				chequeDt : paymentData.controls['chequeDate'].value,
				amount : '' + paymentData.controls['billAmount'].value,
				remarks : paymentData.controls['comment'].value,
				receiptType : reciptType,
				paymentMode : payMode,
				//locationCode : this.loggedEmployee.locationCode,
				locationCode : this.customerOutstandingForm.controls.location.value.id,
				eppsCode : 'MRV',
				collectionDate : formatedCurrentDate
			};
			let request: ISaveCollectionRequest = {
				globalMobPdcHdr:[globalMobPdcHdr]
			};
			this._collectionModel.savePartialCollection(request);
		}
	}

	loadInvoiceList(location){
		// this.totalBillAmount = 0;
		let inoviceLists=this.allInvoices;
		this.invoices = inoviceLists.filter(invs => invs.locationDisplayName == location.value);
		this.total();
		this.totalBillAmount = 0;

		let locationSelected = this.selectedInvoices.filter(invoice=> invoice.locationDisplayName == location.value);
		this.selectedInvoices = locationSelected;

		for(var n=0; n < locationSelected.length; n++){
			this.totalBillAmount += parseFloat(locationSelected[n].balToAdjFcAmt);
		}
		//this.handleCheck(true,this.invoices, true);
	}

	total(invoices?){
		if(invoices){
			this.totalInvAmount = this.allInvoices.reduce((total, invoice) => total + parseFloat(invoice.fcNetAmt), 0);
		}
		else{
			this.totalInvAmount = this.invoices.reduce((total,invoice)=> total + parseFloat(invoice.fcNetAmt), 0);
		}
	}

}
