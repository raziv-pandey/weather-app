import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProductTaxesPipe } from './product-taxes.pipe';



@NgModule({
	declarations: [
        ProductTaxesPipe
    ],
	imports: [
        IonicModule
    ],
	exports: [ 
        ProductTaxesPipe
    ]
})
export class SdmsPipesModule {
    static forRoot() {
        return {
            ngModule: SdmsPipesModule,
            providers: [],
        };
     }
}
