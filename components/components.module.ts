import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from '../../app/material.module';
import { InvoiceItemComponent } from './invoice-item/invoice-item';

@NgModule({
	declarations: [
        InvoiceItemComponent
    ],
	imports: [
        IonicModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
	exports: [ 
        InvoiceItemComponent
    ]
})
export class SdmsComponentsModule {}
