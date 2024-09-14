import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { IGLName, ISLName } from '../../../../../fas/models/fas-report.interface';
import { ICountriesData, ICitiesRequest, IGstnTypesData, IStatesData, ICitiesData, ICustomerSaveRequest } from '../../../../models/sdms-master.interface';
import { PopupModel } from '../../../../../shared/facades/popup';
import { SdmsMasterModel } from '../../../../facades/sdms-master'
import { FasModel } from '../../../../../fas/facades/fas-report';
import { identifierModuleUrl } from '@angular/compiler';


/**
 * Generated class for the CreateCustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-customers',
  templateUrl: 'create-customers.html',
})
export class CreateCustomersPage {
  createCustomerForm: FormGroup;
  

  countries: ICountriesData[] = [];
  gstnTypes : IGstnTypesData[] = [];
  states : IStatesData[] = [];
  cities : ICitiesData[] = [];
  glNames:IGLName[] = [];
  slNames:ISLName[] = [];
  
  
  countrySearchValueKeys : Array<string> = ['countryCode','countryName'];
  stateSearchValueKeys : Array<string> = ['stateCode','stateName'];
  citySearchValueKeys : Array<string> = ['cityCode','cityName'];
  gstnSearchValueKeys : Array<string> = ['id','value'];
  glSearchValueKeys: Array<string> = ['glCode','glDisplayName'];
  slSearchValueKeys: Array<string> = ['slCode','slDisplayName'];
  
  isLoading: boolean = false;
  maxDate = new Date();
  submitAttempt = false
  showPan : boolean = false;
  showGstNo : boolean = false
  showPanNotMan : boolean = false;
  showGSTNNotMan : boolean = false;
  isGstinNotValid : boolean = false;
  RZ_CO_SZ : boolean = false;
  UR  : boolean = false;
  CU : boolean = false;
  panNumber : any ;
  gstnNumber = "";
  gstNumberNM = "";


  private _onDestroy$ = new Subject<void>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private _formBuilder: FormBuilder, private _fasModel: FasModel, private _sdmsMasterModel : SdmsMasterModel,
    private _popupModel:PopupModel) {
      this.createCustomerForm = _formBuilder.group({
        //!st section
        'customerName': ['', Validators.required],
        'address': ['', Validators.required],
        'country': ['', Validators.required],
        'state': ['', Validators.required],
        'city': ['', Validators.required],
        'mobile' : ['', Validators.required],
        'emailId': [''],
        'gstnType': ['', Validators.required],
        'panNumber': ['', Validators.required],
        'panNumberNotMan': [''],
        'gstnNumber': ['', Validators.required],
        'gstnNumberNotMan': [''],
        'glName': ['', Validators.required],  
      });
      this.setFormDefaultValue();

      this.createCustomerForm.get('gstnType').valueChanges
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(gstType => {
          if (gstType.id == 'CO' || gstType.id == 'RG' || gstType.id == 'SZ'){
            this.showPan = true;
            this.showGstNo = true;
            this.showPanNotMan = false;
            this.showGSTNNotMan = false;
          }
          //UnRegistered
          else if (gstType.id == 'UR'){
            this.showPan = false;
            this.showGstNo = false;
            this.showPanNotMan = true;
            this.showGSTNNotMan = false;
          }
          //Consumer
          else if (gstType.id == 'CU'){
            this.showPan = true;
            this.showGstNo = false;
            this.showPanNotMan = false;
            this.showGSTNNotMan = true;
          }

        });
    }

  ionViewDidEnter(){
      this._fasModel.isLoading()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(isLoading => this.isLoading = isLoading );

      this._sdmsMasterModel.isLoading()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(isLoading => this.isLoading = isLoading );
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCustomersPage');
     //conditional validation require gstnType
     this.createCustomerForm.get('gstnType').valueChanges
     .pipe(takeUntil(this._onDestroy$))
     .subscribe((gtn)=> {
     if(gtn.id == 'RG' || gtn.id == 'CO' || gtn.id == 'SZ'){

       this.createCustomerForm.get('panNumber').setValidators([Validators.required]);
       this.createCustomerForm.get('gstnNumber').setValidators([Validators.required]);
       this.RZ_CO_SZ = true;
       this.CU = false;
       this.UR = false;
     }
     else if(gtn.id == 'UR'){
      this.createCustomerForm.get('panNumber').setValidators([]);
      this.createCustomerForm.get('gstnNumber').setValidators([]);
      this.UR = true;
      this.RZ_CO_SZ = false;
      this.CU = false;
     }
     else if(gtn.id == 'CU'){
      this.createCustomerForm.get('panNumber').setValidators([Validators.required]);
      this.createCustomerForm.get('gstnNumber').setValidators([]);
      this.CU = true;
      this.UR = false;
      this.RZ_CO_SZ = false;
     }
          
     this.createCustomerForm.controls['panNumber'].patchValue('', {onlySelf:true, emitEvent: false });
     this.createCustomerForm.controls['gstnNumber'].patchValue('', {onlySelf:true, emitEvent: false });
     this.createCustomerForm.controls['panNumberNotMan'].patchValue('', {onlySelf:true, emitEvent: false });
     this.createCustomerForm.controls['gstnNumberNotMan'].patchValue('', {onlySelf:true, emitEvent: false });
     
      this.createCustomerForm.get('panNumber').updateValueAndValidity();
      this.createCustomerForm.get('gstnNumber').updateValueAndValidity();
      this.createCustomerForm.get('panNumberNotMan').updateValueAndValidity();
      this.createCustomerForm.get('gstnNumberNotMan').updateValueAndValidity();
      if(this.createCustomerForm.valid){
        this.isGstinNotValid = false;
      }
   });

    this._sdmsMasterModel.getCountries()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe( data => this.countries = data );

        this._sdmsMasterModel.getStates()
        .pipe(takeUntil(this._onDestroy$))
            .subscribe( data => this.states = data );
  
      this._sdmsMasterModel.getCities()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe( data => this.cities = data );  
        

        this._sdmsMasterModel.getGstnTypes()
          .pipe(takeUntil(this._onDestroy$))
          .subscribe( data => this.gstnTypes = data ); 

         this._sdmsMasterModel.getGlCodes()

         .pipe(takeUntil(this._onDestroy$))
         .subscribe(data => {
           this.glNames = data;
   
           let selectedGlType = this.glNames.filter(type => type.glCode == '344');
           this.createCustomerForm.controls['glName'].setValue(selectedGlType[0]);
          })

          // To show pop afetr click on save button

      this._sdmsMasterModel.getCustomerParam()
      .pipe(takeUntil(this._onDestroy$))
          .subscribe( data => {
          if(data){
            if(data.param3 == true){
              let msg = 'Customer Created Sucessfully!!';
          this._popupModel.successMessage(msg).then(() => {
            this._sdmsMasterModel.resetForm();
            this.navCtrl.pop();
          });
            }

          }  
          });    
      // End of To show pop afetr click on save button

        this._sdmsMasterModel.loadCountries();
        this._sdmsMasterModel.loadGstnTypes();
        this._sdmsMasterModel.loadGlCodes()
  }

  setFormDefaultValue(): void {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let today = new Date();
    this.maxDate = today;
    this.submitAttempt = false;
  }

  loadState(){
    this._sdmsMasterModel.loadStates(this.createCustomerForm.value.country);
 }

 loadCity() {
   let request:ICitiesRequest = {
     countryCode    : this.createCustomerForm.value.country.countryCode,
     stateCode      : this.createCustomerForm.value.state.stateCode    
   }
   this._sdmsMasterModel.loadCities(request);
 }

 // Save
 saveCustomer() {  
   if (this.createCustomerForm.valid) {
      let mobile = this.createCustomerForm.value.mobile;
      let emailId = this.createCustomerForm.value.emailId;
      let regEmail : any = this.validateEmail(emailId);
      let regMobile =/^\d{10}$/;
      let stateCd = this.createCustomerForm.value.state.gstStateCode;
      let finalGstNumber = this.createCustomerForm.value.gstnNumber;
      let finalGstNumberC  = finalGstNumber.toUpperCase();
      let finalGstNumberNM = this.createCustomerForm.value.gstnNumberNotMan;
      let finalGstNumberNMC  = finalGstNumberNM.toUpperCase(); 
      //---------Check Mobile-----------------
      if(mobile.length<10){
        this._popupModel.alertMessage(" Mobile Number must be 10 digits ");
        return false;
      }
      if(mobile.length == 10 && mobile !=undefined){
         if(!regMobile.test(mobile)|| mobile.length<10){
          this._popupModel.alertMessage(" Invalid Mobile Number ");
           return false;
        }
   
     }

     //--------------Email---------------------------
      if(emailId != ""){
    
        if(regEmail==false){
          this._popupModel.alertMessage("Invalid Email");
          this.isGstinNotValid = false;
          //event.currentTarget.blur();
          return false;
        }
        this.isGstinNotValid = false;
      }
      else if (emailId ==""){
        this.isGstinNotValid = false;
      }       
      //--------------gstnNumber-----------------
      if(this.RZ_CO_SZ){
          if(finalGstNumberC.length < 15){
            this._popupModel.alertMessage("Invalid GSTN Number");
          }
          if(finalGstNumberC.length == 15  || finalGstNumberC!=""){
            var gstStateCode = finalGstNumberC.substring(0, 2);
            if(stateCd != gstStateCode){
              this._popupModel.warningMessage("First Two Digits OF GSTIN No. Must Be Match With Gst State Code" + "-" + stateCd);
              return false;
            }
          }
      }  

      else if(this.CU){
        if(finalGstNumberNMC !=""){
          if(finalGstNumberNMC.length < 15){
            this._popupModel.alertMessage("Invalid GSTN Number");
          }
          if(finalGstNumberNMC.length == 15  || finalGstNumberNMC!=""){
            var gstStateCodeNM = finalGstNumberNMC.substring(0, 2);
            if(stateCd != gstStateCodeNM){
              this._popupModel.warningMessage("First Two Digits OF GSTIN No. Must Be Match With Gst State Code" + "-" + stateCd);
              return false;
            }
          }
        }
      }  
      this.isGstinNotValid = false;
      let dobDateObj = new Date();
      let dobDate = dobDateObj.getDate() + '/' + (dobDateObj.getMonth() + 1) + '/' + dobDateObj.getFullYear();
      
    let request: ICustomerSaveRequest = {
      customerName              : this.createCustomerForm.value.customerName,
      address1                  : this.createCustomerForm.value.address,
      address2                  : "",
      address3                  : "",
      countryName               : this.createCustomerForm.value.country.countryName,
      pinCode                   :"",
      telephoneNo               : "",
      faxNo                     :"",
      customerCode              : "",
      activeYn                  : "",
      locationCode              : "",
      locationDisplayName       : "",
      gstStateCode              : this.createCustomerForm.value.state.gstStateCode,
      gstinType                 : this.createCustomerForm.value.gstnType.id,
      gstInNo                   : this.createCustomerForm.value.gstnNumber.toUpperCase(),
      gstinStateType            : "",
      panNo                     : this.createCustomerForm.value.panNumber.toUpperCase(),
      customerDisplayName       : this.createCustomerForm.value.customerName,
      customerAddCode           : "",
      countryCode               : this.createCustomerForm.value.country.countryCode,
      stateCode                 : this.createCustomerForm.value.state.gstStateCode,
      cityCode                  : this.createCustomerForm.value.city.cityCode,
      contactEmail1             : this.createCustomerForm.value.emailId,
      dateOfBirthString         : dobDate,
      glSlMessage               : "",
      glCode                    : this.createCustomerForm.value.glName.glCode,
      // slCode                    : this.createCustomerForm.value.slName.slCode,
      slCode                    : "",
      mobileNo                  : this.createCustomerForm.value.mobile,
      dob                       : "",
      beatCd                    : "",
      routeCd                   : "",
      id                        : "",
      value                     : "",
      creditControlFlag         : "",
      customerType              : "LOCAL_CUSTOMER"

     }
     this._sdmsMasterModel.saveCustomers(request);
  }
}

 ionViewDidLeave() {
     this._onDestroy$.next();
     this._onDestroy$.complete();
     this._sdmsMasterModel.resetForm();
 }

 gotoBack(){
   this.navCtrl.pop();
 }
 
 goToHome() {

   // this.navCtrl.pop();
   this.navCtrl.setPages([{ page: 'MenuPage' }]);
 }

 //------------PAN Validator----------------------
checkPanNo (event) {
    this.isGstinNotValid = true;
    var start = event.target.selectionStart;
    var end = event.target.selectionEnd;
    event.target.value = event.target.value.toUpperCase();
    event.target.setSelectionRange(start, end);
    if(this.RZ_CO_SZ){
        //var panNo = this.createCustomerForm.value.panNumber;
        //var gstInNo = event.target.value;
        var panNo = event.target.value;
        this.panNumber = panNo;
      
        console.log("PanNo.",panNo)
        var panNoUpperCase = panNo.toUpperCase(); //pan uppercase
        var gstInNo = this.gstnNumber;
        var gstInNoUC = gstInNo.toUpperCase(); //gstin uppercase
        var gstPanNo;
       
        var alphaExp = /^[A-Z]+$/;
        var numExp= /^[0-9]+$/;

        var fiveCharacter = true;
        var fourCharacter = true;
        var lastCharacter = true;
        var matchGstnNo = true;

        if(panNoUpperCase.length == 10 && panNoUpperCase !=undefined){
            var panFirstFiveAlphabet = panNoUpperCase.substring(0,5);
            var panMiddleFourDigit = panNoUpperCase.substring(5,9);
            var panLastAlphabet = panNoUpperCase.substring(9,10);
            //---------------PAN No. Validation-----------------------------
            if(!panFirstFiveAlphabet.match(alphaExp) ){
                if(fiveCharacter){
                  this._popupModel.warningMessage(panFirstFiveAlphabet+"-" +" The First Five Characters of PAN No. must be Alphabet");
                  fiveCharacter = false;
                  event.currentTarget.blur();            
                }
              return true;
            } 

            if(!panMiddleFourDigit.match(numExp)){
                if(fourCharacter){
                  this._popupModel.warningMessage(panMiddleFourDigit+"-" +" The Four Characters of PAN No. must be Digit");
                  fourCharacter = false;
                  event.currentTarget.blur();           
                }        
              return true;
            }

            if(!panLastAlphabet.match(alphaExp)){
                if(lastCharacter){
                  this._popupModel.warningMessage(panLastAlphabet+"-" +" This Last Characters of PAN No. must be Alphabet");
                  lastCharacter = false;
                  event.currentTarget.blur();            
                }
              return true;
           }

            //---------------End of PAN No. Validation-----------------------------

            //--------------PAN match with GSTIN No. PAN-------------------------

            if(gstInNoUC.length > 0){
              gstPanNo = gstInNoUC.substring(2, 12);
                if(gstPanNo != panNoUpperCase){
                  this._popupModel.warningMessage("Pan No. Must Match With GSTIN No. PAN No. Entered " +" - " + gstPanNo);
                  matchGstnNo = false;
                  event.currentTarget.blur();
                }
                this.checkGstinNo(event);
                event.currentTarget.blur();
            }

            if(this.createCustomerForm.valid && fiveCharacter && fourCharacter && lastCharacter && matchGstnNo){
              this.isGstinNotValid = false;
              event.currentTarget.blur();
            }
            //--------------End of PAN match with GSTIN No. PAN-------------------------
        }

    }
    else if(this.CU){
      //var panNo = this.createCustomerForm.value.panNumber;
      var panNo = event.target.value;
      var panNoUpperCase = panNo.toUpperCase(); //pan uppercase
      var gstInNoNM = this.createCustomerForm.value.gstnNumberNotMan;
      //var gstInNoNM = event.target.value;
      var gstInNoNMUC = gstInNoNM.toUpperCase(); //gstin uppercase
      var gstPanNo;
     
      var alphaExp = /^[A-Z]+$/;
      var numExp= /^[0-9]+$/;

      var fiveCharacter = true;
      var fourCharacter = true;
      var lastCharacter = true;
      var matchGstnNo = true;

      if(panNoUpperCase.length == 10 && panNoUpperCase !=undefined){
        var panFirstFiveAlphabet = panNoUpperCase.substring(0,5);
        var panMiddleFourDigit = panNoUpperCase.substring(5,9);
        var panLastAlphabet = panNoUpperCase.substring(9,10);
        //---------------PAN No. Validation-----------------------------
        if(!panFirstFiveAlphabet.match(alphaExp) ){
            if(fiveCharacter){
              this._popupModel.warningMessage(panFirstFiveAlphabet+"-" +" The First Five Characters of PAN No. must be Alphabet");
              fiveCharacter = false;
              event.currentTarget.blur();            
            }
          return true;
        } 

        if(!panMiddleFourDigit.match(numExp)){
            if(fourCharacter){
              this._popupModel.warningMessage(panMiddleFourDigit+"-" +" The Four Characters of PAN No. must be Digit");
              fourCharacter = false;
              event.currentTarget.blur();           
            }        
          return true;
        }

        if(!panLastAlphabet.match(alphaExp)){
            if(lastCharacter){
              this._popupModel.warningMessage(panLastAlphabet+"-" +" This Last Characters of PAN No. must be Alphabet");
              lastCharacter = false;
              event.currentTarget.blur();            
            }
          return true;
       }

        //---------------End of PAN No. Validation-----------------------------

        //--------------PAN match with GSTIN No. PAN-------------------------

        if(gstInNoNM.length > 0){
          gstPanNo = gstInNoNMUC.substring(2, 12);

            if(gstPanNo != panNoUpperCase){
              this._popupModel.warningMessage("Pan No. Must Match With GSTIN No. PAN No. Entered " +" - " + gstPanNo);
              event.currentTarget.blur();
            }
        }

        if(this.createCustomerForm.valid && fiveCharacter && fourCharacter && lastCharacter && matchGstnNo){
          this.isGstinNotValid = false;
          event.currentTarget.blur();
        }
        //--------------End of PAN match with GSTIN No. PAN-------------------------
    }

    }
    else if(this.UR){
      //var panNo = this.createCustomerForm.value.panNumberNotMan;
      var panNo = event.target.value;
      var panNoUpperCase = panNo.toUpperCase(); //pan uppercase
           
      var alphaExp = /^[A-Z]+$/;
      var numExp= /^[0-9]+$/;

      var fiveCharacter = true;
      var fourCharacter = true;
      var lastCharacter = true;

      if(panNoUpperCase.length == 10 && panNoUpperCase !=undefined){
        var panFirstFiveAlphabet = panNoUpperCase.substring(0,5);
        var panMiddleFourDigit = panNoUpperCase.substring(5,9);
        var panLastAlphabet = panNoUpperCase.substring(9,10);
        //---------------PAN No. Validation-----------------------------
        if(!panFirstFiveAlphabet.match(alphaExp) ){
            if(fiveCharacter){
              this._popupModel.warningMessage(panFirstFiveAlphabet+"-" +" The First Five Characters of PAN No. must be Alphabet");
              fiveCharacter = false;
              event.currentTarget.blur();            
            }
          return true;
        } 

        if(!panMiddleFourDigit.match(numExp)){
            if(fourCharacter){
              this._popupModel.warningMessage(panMiddleFourDigit+"-" +" The Four Characters of PAN No. must be Digit");
              fourCharacter = false;
              event.currentTarget.blur();           
            }        
          return true;
        }

        if(!panLastAlphabet.match(alphaExp)){
            if(lastCharacter){
              this._popupModel.warningMessage(panLastAlphabet+"-" +" This Last Characters of PAN No. must be Alphabet");
              lastCharacter = false;
              event.currentTarget.blur();            
            }
          return true;
       }

      if(this.createCustomerForm.valid && fiveCharacter && fourCharacter && lastCharacter){
        this.isGstinNotValid = false;
        event.currentTarget.blur();

      }
    }
 }
}


//---------------Check GSTIN No Validation------------------
checkGstinNo (event) {
  this.isGstinNotValid = true;
    var start = event.target.selectionStart;
    var end = event.target.selectionEnd;
    event.target.value = event.target.value.toUpperCase();
    event.target.setSelectionRange(start, end);
  if(this.RZ_CO_SZ){
      //var gstInNo = this.createCustomerForm.value.gstnNumber;
      var gstInNo = event.target.value;
      this.gstnNumber = gstInNo;
      var gstInNoUC = gstInNo.toUpperCase();
      var gstStateCd = this.createCustomerForm.value.state.gstStateCode;
      var panNumber = this.panNumber;
      var panNoUpperCase = panNumber.toUpperCase();
      var firstTwoDigit = true;
      var mustmatchGstnNo = true;
      //var mustmatchPanNo = true;
      var gstPanNo;
      
      
      if(gstInNo.length == 15 && gstInNo !=undefined) {
        var panNo = gstInNoUC.substring(2, 12);       
        var gstStateCode = gstInNoUC.substring(0, 2); 

        if(gstStateCode != gstStateCd){
          this._popupModel.warningMessage("First Two Digits OF GSTIN No. Must Be Match With Gst State Code" + "-" + gstStateCd);
          firstTwoDigit = false;
          event.currentTarget.blur();
        }

        if((panNo != panNoUpperCase)){
          this._popupModel.warningMessage("Pan No. Must Match With GSTIN No. PAN No. Entered " +" - " + panNoUpperCase);
          mustmatchGstnNo = false;
          event.currentTarget.blur();
        }

        if(this.createCustomerForm.valid && firstTwoDigit && firstTwoDigit && mustmatchGstnNo ){
          this.isGstinNotValid = false;
          event.currentTarget.blur();
        }
      }
      }
  else if(this.CU){
      //var gstInNo = this.createCustomerForm.value.gstnNumberNotMan;
      var gstInNo = event.target.value;
      this.gstNumberNM = gstInNo;
      var gstInNoUC = gstInNo.toUpperCase();
      var gstStateCd = this.createCustomerForm.value.state.gstStateCode;
      var panNumber = this.createCustomerForm.value.panNumber;
      var panNoUpperCase = panNumber.toUpperCase();
      var firstTwoDigit = true;
      var mustmatchGstnNo = true;
      //var mustmatchPanNo = true;
      var gstPanNo;
      if(gstInNo.length == 15 && gstInNo !=undefined) {
        var panNo = gstInNoUC.substring(2, 12);       
        var gstStateCode = gstInNoUC.substring(0, 2); 

        if(gstStateCode != gstStateCd){
          this._popupModel.warningMessage("First Two Digits OF GSTIN No. Must Be Match With Gst State Code" + "-" + gstStateCd);
          firstTwoDigit = false;
          event.currentTarget.blur();
        }

        if((panNo != panNoUpperCase)){
          this._popupModel.warningMessage("Pan No. Must Match With GSTIN No. PAN No. Entered " +" - " + panNoUpperCase);
          mustmatchGstnNo = false;
          event.currentTarget.blur();
        }
        if(this.createCustomerForm.valid && firstTwoDigit && firstTwoDigit && mustmatchGstnNo ){
          this.isGstinNotValid = false;
          event.currentTarget.blur();
        }
    }

  }
  else if(this.UR){
    if(this.createCustomerForm.valid){
      this.isGstinNotValid = false;
      event.currentTarget.blur();

    } 
  }
 
}

//---------------Email Validation-----------
private validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
}//end of All
