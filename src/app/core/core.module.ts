import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './store/reducers/router.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';

import { metaReducers, reducers, effects } from './store';
import { environment } from '../../environments/environment';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 50
    }) : [],
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    DatePipe
  ]
})
export class CoreModule { }
