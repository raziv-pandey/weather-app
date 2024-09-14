import { UserModel } from './../../../../../auth/facades/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

import { takeUntil } from 'rxjs/operators';
import {Observable} from 'rxjs/Rx';
import { CollectionModel } from '../../../../facades/collection';
//import { SOModel } from '../../../../facades/so';
import { ICustomerDetailRequest } from '../../../../models/collection.interface';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-customer-collection-detail',
  templateUrl: 'customer-collection-detail.html',
})
export class CustomerCollectionDetailPage {
  customerDetails;
  customerAdress;
  isLoading: boolean = false;
  companyName: string = '';
  private _onDestroy$ = new Subject<void>();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _collectionModel: CollectionModel, private sharing: SocialSharing, private _user: UserModel
    ) {
    this.customerDetails = this.navParams.get('customer');
    console.log("customer Details", this.customerDetails);
  }

  ionViewDidEnter(){
    this._collectionModel.isLoading()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(isLoading => this.isLoading = isLoading );
    // this._soModel.isLoading()
    //     .pipe(takeUntil(this._onDestroy$))
    //     .subscribe(isLoading => this.isLoading = isLoading );  
    this._user.getLoggedInUser()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(user => this.companyName = user.value.companyName);
  }  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCollectionDetailPage');
    this._collectionModel.setCustomerDetails(this.customerDetails);

    this._collectionModel.getLoggedEmployeeLocationCollection()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(data => {
          let request: ICustomerDetailRequest = {
            customerCode : this.customerDetails.customerCode,
            locationCode : data.locationCode,
            glCode : this.customerDetails.glCode,
            slCode : this.customerDetails.slCode
          };
          
          this._collectionModel.loadCustomerAddressDetails(request);
    });

    this._collectionModel.getCustomerAddressDetails()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(data => this.customerAdress = data);
    
  }

  ionViewDidLeave(){
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  showCustomerOutstanding(){
    this.navCtrl.push('CustomerOutstandingPage');
  }
  gotoBack(){
    this.navCtrl.pop();
  }
  goToHome(){
    
   // this.navCtrl.pop();
    this.navCtrl.setPages([{page: 'MenuPage'}]);
  }
  shareVaiWhatsApp(){
    let message = `Total Outstanding : ${(this.customerDetails.overDueamount + this.customerDetails.notDueamount + this.customerDetails.openAdvamt)}\nOver Due : ${this.customerDetails.overDueamount}\nNot Due : ${this.customerDetails.notDueamount}\nAdvance : ${this.customerDetails.openAdvamt}\n\nfrom - ${this.companyName}`;

    this.sharing.shareViaWhatsAppToReceiver('+91'+this.customerAdress.contactDtls,  message, null, null).then(() => {
      console.log('Message Send');
    }).catch(() => {
      console.log('Message Send Catch');
    });
  }
}
