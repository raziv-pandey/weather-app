import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCollectionDetailPage } from './customer-collection-detail';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../../app/material.module';
import { CollectionModel } from '../../../../facades/collection';
import { SOModel } from '../../../../facades/so';
import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    CustomerCollectionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCollectionDetailPage),
    SharedComponentsModule,
    MaterialModule
  ],
  providers: [
    CollectionModel,
    SOModel,
    SocialSharing
  ]  

})
export class CustomerCollectionDetailPageModule {}
