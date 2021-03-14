import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbContextMenuModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbAuthOAuth2Token, NbOAuth2AuthStrategy, NbOAuth2ResponseType } from '@nebular/auth';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CallbackComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '529783305538-d3fpqok16gi33m6j6douasanfl0hcmu2.apps.googleusercontent.com',
          clientSecret:'',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'profile',
            redirectUri: 'http://localhost:4200/callback',
          },
          redirect: {
            success: '/profile/', // welcome page path
            failure: '/login/', // stay on the same page
          },
        }),
      ],
      forms: {},
    }), 
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
