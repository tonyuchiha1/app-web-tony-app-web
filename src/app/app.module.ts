import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzFormModule} from "ng-zorro-antd/form";


import { AngularFirestore } from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { provideAuth,getAuth } from '@angular/fire/auth';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import { TableDataComponent } from './components/table-data/table-data.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import { ContentMenuComponent } from './components/content-menu/content-menu.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import { RegisterComponent } from './components/register/register.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TableDataComponent,
    ContentMenuComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzFormModule,
        ReactiveFormsModule,
        provideAuth(() => getAuth()),
        NzLayoutModule,
        NzBreadCrumbModule,
        NzMenuModule,
        NzTableModule,
        NzDividerModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzModalModule
    ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
