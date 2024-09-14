import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CvrUploadImagePage } from './cvr-upload-image';
import { MaterialModule } from '../../../../../app/material.module';
import { UserModel } from '../../../../../auth/facades/user';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { ExpenseModel } from '../../../../../hrms/facades/expense';
@NgModule({
  declarations: [
    CvrUploadImagePage,
  ],
  imports: [
    IonicPageModule.forChild(CvrUploadImagePage),
    MaterialModule,
    SharedComponentsModule
  ],
  providers: [
    ExpenseModel,
    UserModel
  ]
})
export class CvrUploadImagePageModule {}
