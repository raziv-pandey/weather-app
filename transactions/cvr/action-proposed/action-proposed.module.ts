import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionProposedPage } from './action-proposed';
import { MaterialModule } from '../../../../../app/material.module';
import { SharedPipesModule } from '../../../../../shared/pipes/shared-pipes.module';

@NgModule({
  declarations: [
    ActionProposedPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionProposedPage),
    MaterialModule,
    SharedPipesModule
  ],
})
export class ActionProposedPageModule {}
