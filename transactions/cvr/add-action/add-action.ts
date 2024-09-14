import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FasApprovalTransactionPage } from '../../../../../fas/pages/transactions/fas-approval-transaction/fas-approval-transaction';
import { SOService } from '../../../../services/so.service';
import { PopupModel } from '../../../../../shared/facades/popup';

/**
 * Generated class for the AddActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-action',
  templateUrl: 'add-action.html',
})
export class AddActionPage {
  actionForm: FormGroup;
  actionDetails = [];
  employees = [];
  aps = [];
  cvrDtos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private _formBuilder: FormBuilder,
    private _soService: SOService, private loadingController: LoadingController, private modalCtrl: ModalController,
    private popupModel: PopupModel, private viewCtrl: ViewController) {
    this.actionForm = _formBuilder.group({
      'ap': ['', Validators.required],
      'employee': ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddActionPage');
  }

  ionViewDidEnter(){
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
				this.employees = data.rows;
			}
		});
  }

  openAction(){
    
    let requestAction = {
      distinctColumn: 'actionProposed',
      queryFlag: 'A'
    }
    this._soService.getCVRPreviousPurpose(requestAction)
      .subscribe(data => {
        let loading = this.loadingController.create({
          spinner: "crescent",
        });
        loading.present();
        if (data) {
          loading.dismiss();
          this.aps = data.data;
          let actionModal = this.modalCtrl.create('ActionProposedPage', {
            'aps': this.aps,
            }, {
            showBackdrop: true
    
            });
            actionModal.onDidDismiss(data => {
            if (data) {
              
              this.actionForm.controls['ap'].patchValue(data.selectedActionDetails.value);
            }
          })
          actionModal.present();
        }
      });
  }

  addAction(){
    
    let actionP = this.actionForm.controls['ap'].value;
    let employee = this.actionForm.controls['employee'].value.employeeFullName;
    let employeeCode = this.actionForm.controls['employee'].value.employeeCode;
    this.actionDetails.push({
      actionP: actionP,
      employee: employee,
      employeeCode: employeeCode
    })
    this.cvrDtos.push({
      cvrDtlSrNo: "",
      actionProposed: actionP,
      actionTakenBy: employeeCode
    })
    this.actionForm.controls['ap'].patchValue('');
    this.actionForm.controls['employee'].patchValue('');
    setTimeout(() => {
      document.getElementById("ap").focus();
    });
  }

  async confirmAction(){
    
    let actionArray = [];
    let cvrDtosOrg = [];
    let cvrDtos = [];
    let confirm = await this.popupModel.confirmMessage('Are you sure to Proceed ?');
    if(confirm){
      actionArray = this.actionDetails;
      cvrDtos = this.cvrDtos
      // cvrDtosOrg.map((id)=>)
      let backData = {
        'actionArray': actionArray,
        'cvrDtos': cvrDtos
      }
      this.viewCtrl.dismiss(backData);
    }
    else{

    }

  }
  deleteAction(index, action){
    
    this.actionDetails.splice(index, 1);
    this.cvrDtos.splice(index, 1);
  }

  goToBack(){
    this.navCtrl.pop();
  }
}
