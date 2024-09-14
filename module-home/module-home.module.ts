import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleHomePage } from './module-home';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { MaterialModule } from '../../../app/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//----------------SDMS------------------
import * as sdmsStore from '../../../sdms/store';
import * as sdmsServices from '../../../sdms/services';
import * as sdmsEffects from '../../../sdms/store/effects';
import * as sdmsFacades from '../../../sdms/facades';

//--------------MIS---------------
import * as misStore from '../../../mis/store';
import * as misServices from '../../../mis/services';
import * as misEffects from '../../../mis/store/effects';
import * as misFacades from '../../../mis/facades';

//--------------FAS---------------
import * as fasStore from '../../../fas/store';
import * as fasServices from '../../../fas/services';
import * as fasEffects from '../../../fas/store/effects';
import * as fasFacades from '../../../fas/facades';

//--------------HRMS---------------
import * as hrmsStore from '../../../hrms/store';
import * as hrmsServices from '../../../hrms/services';
import * as hrmsEffects from '../../../hrms/store/effects';
import * as hrmsFacades from '../../../hrms/facades';

//--------------ADMIN---------------
import * as adminStore from '../../../admin/store';
import * as adminServices from '../../../admin/services';
import * as adminEffects from '../../../admin/store/effects';
import * as adminFacades from '../../../admin/facades';

//--------------MMS---------------
import * as mmsStore from '../../../mms/store';
import * as mmsServices from '../../../mms/services';
import * as mmsEffects from '../../../mms/store/effects';
import * as mmsFacades from '../../../mms/facades';

//--------------PQMS---------------
import * as pqmsStore from '../../../pqms/store';
import * as pqmsServices from '../../../pqms/services';
import * as pqmsEffects from '../../../pqms/store/effects';
import * as pqmsFacades from '../../../pqms/facades';


import { SharedApiService } from '../../services/shared-api.service';
import { CheckStockPage } from '../../../mms/pages/transactions/cs/check-stock/check-stock';
@NgModule({
  declarations: [
    ModuleHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ModuleHomePage),
    StoreModule.forFeature('sdms',sdmsStore.reducers),
    EffectsModule.forFeature(sdmsStore.effects),

    StoreModule.forFeature('mis',misStore.reducers),
    EffectsModule.forFeature(misStore.effects),
    
    StoreModule.forFeature('fas',fasStore.reducers),
    EffectsModule.forFeature(fasStore.effects),
    
    StoreModule.forFeature('hrms',hrmsStore.reducers),
    EffectsModule.forFeature(hrmsStore.effects),

    StoreModule.forFeature('admin',adminStore.reducers),
    EffectsModule.forFeature(adminStore.effects),

    StoreModule.forFeature('mms',mmsStore.reducers),
    EffectsModule.forFeature(mmsStore.effects),

    StoreModule.forFeature('pqms',pqmsStore.reducers),
    EffectsModule.forFeature(pqmsStore.effects),

    SharedComponentsModule,
    MaterialModule
  ],
  providers : [
    ...sdmsServices.services,
    ...sdmsEffects.effects,
    ...sdmsFacades.models,

    ...misServices.services,
    ...misEffects.effects,
    ...misFacades.models,

    ...fasServices.services,
    ...fasEffects.effects,
    ...fasFacades.models,

    ...hrmsServices.services,
    ...hrmsEffects.effects,
    ...hrmsFacades.models,

    ...adminServices.services,
    ...adminEffects.effects,
    ...adminFacades.models,

    ...mmsServices.services,
    ...mmsEffects.effects,
    ...mmsFacades.models,

    ...pqmsServices.services,
    ...pqmsEffects.effects,
    ...pqmsFacades.models,

    SharedApiService
  ]
})
export class ModuleHomePageModule {}
