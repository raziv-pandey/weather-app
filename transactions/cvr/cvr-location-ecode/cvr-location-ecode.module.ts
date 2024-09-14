import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CvrLocationEcodePage } from './cvr-location-ecode';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../../app/material.module';
import { SOModel } from '../../../../facades/so';
import { SharedTransactionService } from '../../../../../shared/services/shared-transactions.service';
@NgModule({
  declarations: [
    CvrLocationEcodePage,
  ],
  imports: [
    IonicPageModule.forChild(CvrLocationEcodePage),
    SharedComponentsModule,
    MaterialModule
  ],
  providers : [
    SOModel,
    SharedTransactionService
  ]
})
export class CvrLocationEcodePageModule {}
