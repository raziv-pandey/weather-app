import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { CreateCollectionPage } from './create-collection';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { SharedPipesModule } from '../../../../../shared/pipes/shared-pipes.module';
import { MaterialModule } from '../../../../../app/material.module';
import { SOModel } from '../../../../facades/so';
import { CollectionModel } from '../../../../facades/collection';


@NgModule({
  declarations: [
    CreateCollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCollectionPage),
    SharedComponentsModule,
    SharedPipesModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    CollectionModel,
    SOModel
  ]
})
export class CreateCollectionPageModule { }
