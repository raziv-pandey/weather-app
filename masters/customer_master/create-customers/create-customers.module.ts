import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCustomersPage } from './create-customers';
import { SdmsMasterModel } from '../../../../facades/sdms-master'
import { FasModel } from '../../../../../fas/facades/fas-report';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
// Material
import {MaterialModule} from '../../../../../app/material.module';

@NgModule({
  declarations: [
    CreateCustomersPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCustomersPage),
    SharedComponentsModule,
    MaterialModule
  ],
  providers : [
    SdmsMasterModel,
    FasModel
  ]
})
export class CreateCustomersPageModule {}
