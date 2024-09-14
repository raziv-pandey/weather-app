import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SdmsModel } from '../../../facades/sdms-report';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PopupModel } from '../../../../shared/facades/popup';
/**
 * Generated class for the CollectionDetailsReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collection-details-report',
  templateUrl: 'collection-details-report.html',
})
export class CollectionDetailsReportPage {
	collectionDetails$=[];
  totalInvoiceCollection = 0;
  partialCollectedAmount = 0;
  totalRecieved = 0;
  diffrencetotalRecieved = 0;

   private _onDestroy$ = new Subject<void>();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _sdmsModel: SdmsModel, private _popupModel:PopupModel) {
    let selectedCustomerdata=this.navParams.get('CustomerData')
    this.totalRecieved = selectedCustomerdata.recievedAmnt;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionDetailsReportPage');
 this._sdmsModel.getCollectionDetails()
    .pipe(takeUntil(this._onDestroy$)).subscribe( data => {
      if(data!=null){
        if(data.length > 0){
                this.collectionDetails$ =data;
        }
       
      else{
            this._popupModel.warningMessage('Partial Collection, No Invoice/s Linked.')
                .then(()=> {
                    this._sdmsModel.resetCollectionDetails();
                    this.navCtrl.setPages([{ page : 'CollectionReportPage'}]);
              
            })
        }
      }
        else{
            this.collectionDetails$ = [];
        }

        //find the total
            this.totalInvoiceCollection = 0;
            if(this.collectionDetails$){
                this.collectionDetails$.map((data) => {
                    this.totalInvoiceCollection = this.totalInvoiceCollection + parseFloat(data.receiveAmt);
                });

                this.diffrencetotalRecieved = this.totalRecieved - this.totalInvoiceCollection;
               
            }

      });

  }
  dismissRegisterModal() {
    this.navCtrl.pop();
  }
  ionViewDidLeave(){
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}

