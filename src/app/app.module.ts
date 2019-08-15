import { FormsModule } from './layout/forms/forms.module';
// import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { LayoutModule } from '@angular/cdk/layout';
// import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyAPIInterceptor } from './httpconfig.interceptor';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent, AutofocusDirective],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        // OverlayModule,
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        // FormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: MyAPIInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
