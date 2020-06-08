import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { BasicAuthInterceptor } from './shared/auth.interceptor';
import { ErrorInterceptor } from './shared/http-errors.interceptor';
import { ModalAutorize } from './components/modal-autorize';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { RegistrationComponent } from './components/registraration/registration.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    ModalAutorize,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzNotificationModule,
    RouterModule,
    NzButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: ru_RU },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
