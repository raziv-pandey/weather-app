import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subject } from 'rxjs';
/**
 * Generated class for the ActionProposedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-action-proposed',
  templateUrl: 'action-proposed.html',
})
export class ActionProposedPage {
  aps = [];
	isLoading: boolean = false;
	showSearch: boolean = false;
  search : string = '';
	selectedActionDetails: any;  

	private _onDestroy$:Subject<boolean> = new Subject<boolean>();  
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.aps = this.navParams.get('aps');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionProposedPage');
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

	selectAction(status, selectedPov) {
		
		if (status) {
			this.selectedActionDetails = selectedPov;
			this.dismiss();
		}
	}

	toggleActionSearch() {
		this.showSearch = this.showSearch ? false : true;
		if (this.showSearch == true) {
			setTimeout(() => {
				document.getElementById("searchPOV").focus();
			});
		}
		if (this.showSearch == false) {
			this.search = "";
		}
	}
	dismiss() {
		
		let backData = {
			'selectedActionDetails': this.selectedActionDetails,
		}
		this.viewCtrl.dismiss(backData);
	}

}
