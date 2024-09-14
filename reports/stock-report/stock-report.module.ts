import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockReportPage } from './stock-report';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../app/material.module';
// import { SharedDirectivesModule } from '../../../shared/directives/shared-directives.module';
import { SdmsModel } from '../../../facades/sdms-report';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    StockReportPage,
  ],
  imports: [
    IonicPageModule.forChild(StockReportPage),
    SharedComponentsModule,
    MaterialModule,
    IonicSelectableModule
  ],
  providers: [
    SdmsModel
  ]
})
export class StockReportPageModule { }
