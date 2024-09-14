import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerWiseSalesReportPage } from './customer-wise-sales-report';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../app/material.module';
import { SdmsModel } from '../../../facades/sdms-report';


@NgModule({
  declarations: [
    CustomerWiseSalesReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerWiseSalesReportPage),
    SharedComponentsModule,
    MaterialModule
  ],
  providers: [
    SdmsModel

  ]
})
export class CustomerWiseSalesReportPageModule {}
