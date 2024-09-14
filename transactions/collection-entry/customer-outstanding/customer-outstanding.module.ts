import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerOutstandingPage } from './customer-outstanding';
import { DatePipe } from '@angular/common';
import { SdmsComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../../app/material.module';
import { SharedPipesModule } from '../../../../../shared/pipes/shared-pipes.module';
import { CollectionModel } from '../../../../facades/collection';
import { SOModel } from '../../../../facades/so';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';

@NgModule({
  declarations: [
    CustomerOutstandingPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerOutstandingPage),
    SdmsComponentsModule,
    MaterialModule,
    SharedPipesModule,
    SharedComponentsModule
  ],
  providers: [
    CollectionModel,
    SOModel,
    DatePipe
  ]
})
export class CustomerOutstandingPageModule {}
