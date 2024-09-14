import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionReportPage } from './collection-report';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../app/material.module';
import { SdmsModel } from '../../../facades/sdms-report';


@NgModule({
  declarations: [
    CollectionReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionReportPage),
    SharedComponentsModule,
    MaterialModule
  ],
  providers: [
    SdmsModel
  ]
})
export class CollectionReportPageModule {}
