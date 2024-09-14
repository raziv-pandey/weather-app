import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActionPage } from './add-action';
import { MaterialModule } from '../../../../../app/material.module';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { SOService } from '../../../../../sdms/services/so.service';
@NgModule({
  declarations: [
    AddActionPage,
  ],
  imports: [
    IonicPageModule.forChild(AddActionPage),
    MaterialModule,
    SharedComponentsModule
  ],
  providers: [
    SOService
  ]
})
export class AddActionPageModule {}
