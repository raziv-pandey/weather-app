import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ISOCustomer, ISOColCustomersRequest, ICustomerDetailsAsyncRequest } from '../../../../models/so.interface';
import { CollectionModel } from '../../../../facades/collection';
import { ApplicationConstants } from './../../../../../app/ApplicationConstants';
import { SOModel } from '../../../../facades/so';
import { ICheckFinancialYearRequest } from '../../../../models/so.interface';
import { PopupModel } from '../../../../../shared/facades/popup';

@IonicPage()
@Component({
  selector: 'page-create-collection',
  templateUrl: 'create-collection.html',

})
export class CreateCollectionPage {
  customers: ISOCustomer[] = [];
  showSearch: boolean = false;
  isLoading: boolean = false;
  loggedEmployeeLocation: any;
  private _onDestroy$ = new Subject<void>();

  page: number = 1;
  count = 10;
  searchString: string = "";
  noOfRecords: number = ApplicationConstants.NO_OF_CUSTOMERS_PER_PAGE;
  totalPageCount: number = 0;

  allCustomers: Array<ISOCustomer>;
  searchValue: Array<ISOCustomer>;
  search: string;
  private inputValue = '';
  sessionId : any;
  activeCustomrsSubscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _collectionModel: CollectionModel,
    private elRef: ElementRef, private _soModel: SOModel, private _popupModel: PopupModel) {
  }

  ionViewDidEnter() {
    this._collectionModel.isLoading()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(isLoading => this.isLoading = isLoading);

      this._soModel.isLoading()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(isLoading => this.isLoading = isLoading);  

    this._collectionModel.getLoggedEmployeeLocationCollection()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(data => {
        if(data){
          this.loggedEmployeeLocation = data;
          let paginationDetails: any = {
            page: this.page,
            rows: 20
          }
  
          let request: ISOColCustomersRequest = {
            paginationDetails: paginationDetails,
            searchCriteriaDetails: {
              "groupOp": "AND",
              "rules": [
                {
                  "field": "eppsGlobalMobSalesSoAlias.customerDisplayname",
                  "op": "cn",
                  "data": '',
                  "searchType": "String",
                  "dtoField": "eppsGlobalMobSalesSoAlias.customerDisplayname"
                }
              ]
            },
            locationCode: this.loggedEmployeeLocation.locationCode,
            tranInd: 'SINV'
          }
          this._collectionModel.loadCustomers(request);

        }
      });

    this.activeCustomrsSubscription = this._collectionModel.getCustomerList()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(data => {
        if (data != null && data.length) {
          this.sessionId = data[0].sessionId;
          for (var i = 0; i < data.length; i++)
            this.customers.push(data[i]);
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCollectionPage');
    this._collectionModel.loadLoggedEmployeeLocationCollection("N");

    //--------Load Logged Employee Location Collection------------
  }
  showDetails(customer) {
    //this._collectionModel.loadLoggedEmployeeLocationCollection("N");
    this.checkFin();
            //--------------Check Financial Year--------------
    
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
    //----------End of Check Financial Year---------
    this.navCtrl.push('CustomerCollectionDetailPage', { customer: customer });
  }

  ionViewDidLeave() {
    this.showSearch = false;
    this.customers = [];
    this.page = 1;
    this.activeCustomrsSubscription.unsubscribe(); 
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  toggleCustomerSearch() {
    this.showSearch = this.showSearch ? false : true;
    if (this.showSearch == true) {
      setTimeout(function () {
        document.getElementById("searchCollection").focus();
      });
    }else{
      this.page = 1;
      this.customers = [];
      let val = "";
      this.inputValue = "";
      this.loadCustomers(this.page, val);
    }
  }
  gotoBack() {
    this.showSearch = false;
    this.inputValue = "";
    this.customers = [];
    this.activeCustomrsSubscription.unsubscribe(); 
    this.navCtrl.pop();
  }


  /*** Implement ion-infinite-scroll for customer 
   * Date: 29/3/2019
   * Bug 18035
   * ***/

  loadMoreCustomers(infiniteScroll) {
    setTimeout(() => {
      this.page++;
      this.loadCustomers(this.page,this.inputValue,infiniteScroll);
      infiniteScroll.complete();
      this.isLoading = false; 
    },250);    
  }

  loadCustomers(page?, search?, infiniteScroll?) {
    let paginationDetails: any = {
      page : page,
      rows : 20
    }

    let request: ICustomerDetailsAsyncRequest = {
      paginationDetails : paginationDetails,
      searchCriteriaDetails : {
        "groupOp" : "AND",
        "rules" :[
              {
                "field":"eppsGlobalMobSalesSoAlias.customerDisplayname",
                "op":"cn",
                "data":search,
                "searchType":"String",
                "dtoField":"eppsGlobalMobSalesSoAlias.customerDisplayname"
              }
            ]
      },
      sessionId : this.sessionId
    }
    if(infiniteScroll) {
      infiniteScroll.complete();
    }

    this._collectionModel.loadCustomerDetailsWithInfinityScroll(request);   
  }

  searchCustomers(e) {
    var val = e.target.value;
    this.inputValue = val;
    this.customers = [];
    //  *  to reset the page
    //  * Created By : Rajshree
    if(val == ''){
      this.page = 1;
    }
    this.loadCustomers(1, val);

  }

  checkFin(){
    
        var transDate = new Date();
        var formatedDate = transDate.getDate() + '/' + (transDate.getMonth() + 1) + '/' + transDate.getFullYear();
    
        let financeRequest: ICheckFinancialYearRequest = {
          locationCode: '' + this.loggedEmployeeLocation.locationCode, //location code
          tranDate: formatedDate,
          isFromSaveOrUpdate:'false'
        }
        this._soModel.checkValidFinancialYear(financeRequest);
      }

}
