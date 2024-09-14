import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionDetailsReportPage } from './collection-details-report';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../app/material.module';
import { SdmsModel } from '../../../facades/sdms-report';

@NgModule({
  declarations: [
    CollectionDetailsReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionDetailsReportPage),
    SharedComponentsModule,
    MaterialModule
  ],
  providers: [
    SdmsModel
  ]
})
export class CollectionDetailsReportPageModule {}
