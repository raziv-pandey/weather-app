import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { SharedTransactionModel } from '../../../../../shared/facades/shared-transactions';
import { GuiModel } from '../../../../../shared/facades/gui';



@IonicPage()
@Component({
  selector: 'page-collection-entry',
  templateUrl: 'collection-entry.html',
})
export class CollectionEntryPage {
  showPrograms: Array<string> =  ['create_trx'];
  pages = {
    create_trx : 'CreateCollectionPage'
  };
  programs;
  isLoading: boolean = false;

  private _onDestroy$ = new Subject<void>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, 
    private _sharedTransactionModel: SharedTransactionModel,
    private _guiModel: GuiModel) {
  }

  ionViewDidEnter() {
    this._guiModel.isLoading()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(isLoading => this.isLoading = isLoading );

    this._guiModel.getPrograms('SDMS')
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(programs => {
        this.programs = programs;
       });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesOrderPage');
  }
  goToProgram(program){
    console.log("i will show :",program);
    
    //update the sharedTransaction State
    this.navCtrl.push(this.pages[program]);
  }
  ionViewDidLeave(){
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  gotoBack() {
    this.navCtrl.pop();
  }
 

}
