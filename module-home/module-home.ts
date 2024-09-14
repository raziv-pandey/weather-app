import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GuiModel } from '../../../shared/facades/gui';
import { routes } from '../../../app/app.routes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PopupModel } from '../../../shared/facades/popup';

@IonicPage()
@Component({
  selector: 'page-module-home',
  templateUrl: 'module-home.html',
})
export class ModuleHomePage {
  moduleId: string;
  programDisplay = {
    programMasterDTOs       : 'Masters',
    programTransactionDTOs  : 'Transactions',
    programReportDTOs       : 'Reports'
  }
  programs : Array<any> = [];
  pages :any;
  currentProgram:string;
  private _onDestroy$ : Subject<boolean> = new Subject<boolean>();
  programTypes:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _guiModel: GuiModel, private modalCtrl: ModalController, private _popupModel : PopupModel) {
      this.moduleId = this.navParams.get('moduleId');
     this.pages = routes[this.moduleId];

     if(this.moduleId == 'BPM' || this.moduleId == 'SBCT' || this.moduleId == 'JOBS' 
     || this.moduleId == 'FRTS' || this.moduleId == 'CRM' || this.moduleId == 'CRMPLG' || this.moduleId == 'WSMS'){
      let msg = 'Master(s) / Transaction(s) / Report(s) Not Available.';
      this._popupModel.alertMessage(msg).then(() =>{
        this.navCtrl.setPages([{ page: 'MenuPage' }]);
      })
     }
  }

  ionViewDidLoad() {
    
    this._guiModel.loadPrograms(this.moduleId);
    this._guiModel.getPrograms(this.moduleId)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(programTypes => {
          console.log("programs",Object.keys(programTypes));
          this.programTypes = programTypes;
          this.programs = [];
          Object.keys(programTypes).forEach(programTypeKey => {
            if(programTypes[programTypeKey].length > 0){
              this.programs.push({
                programkey : programTypeKey,
                displayName: this.programDisplay[programTypeKey]
              });
            }
          });
          this.currentProgram = this.programs.length > 0 ?  this.programs[0].programkey : null;
      });
  }
  goToProgram(program){
    if(program.programMtqrFlag == "M"){
      this.navCtrl.push(this.pages[program.programId]);
      //this.navCtrl.push('ProgramMasterDtoPage');
    }
    else if(program.programMtqrFlag == "T"){
      this.navCtrl.push('ProgramTransactionDtoPage', {
          moduleId : this.moduleId,
          programInfo : program
      });
    }
    else if(program.programMtqrFlag == "R"){
      this.navCtrl.push(this.pages[program.programId]);
    }

  }
  gotoBack() {
    this.navCtrl.pop();
  }
  setPrograms(program){
    this.currentProgram = program;
  }
  ionViewDidLeave(){
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  goToHome() {
		this.navCtrl.setPages([{ page: 'MenuPage' }]);
	}
}
