import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionEntryPage } from './collection-entry';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { MaterialModule } from '../../../../../app/material.module';


@NgModule({
  declarations: [
    CollectionEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionEntryPage),
    SharedComponentsModule,
    MaterialModule
  ],
})
export class CollectionEntryPageModule {}
