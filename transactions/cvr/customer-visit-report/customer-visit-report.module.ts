import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerVisitReportPage } from './customer-visit-report';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../../app/material.module';
import { ExpenseModel } from '../../../../../hrms/facades/expense';
import { SOService } from '../../../../../sdms/services/so.service';
import { SOModel } from '../../../../../sdms/facades/so';
import { SharedApiService } from '../../../../../shared/services/shared-api.service';
@NgModule({
  declarations: [
    CustomerVisitReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerVisitReportPage),
    MaterialModule,
    SharedComponentsModule
  ],
  providers: [
    ExpenseModel,
    SOService,
    SOModel,
    SharedApiService
  ]
})
export class CustomerVisitReportPageModule {}
