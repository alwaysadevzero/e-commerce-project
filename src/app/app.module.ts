import { isDevMode, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { NgxEnvModule } from '@ngx-env/core'
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiErrorModule, TuiRootModule } from '@taiga-ui/core'
import { TuiSelectModule, TuiSelectOptionModule } from '@taiga-ui/kit'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { UserEffects } from './auth/state/auth.effects'
import { userReducer } from './auth/state/auth.reducer'
import { HeaderComponent } from './core/components/header/header.component'
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ userState: userReducer }, {}),
    EffectsModule.forRoot([UserEffects]),
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiSelectModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxEnvModule,
    ReactiveFormsModule,
    TuiSelectOptionModule,
    TuiErrorModule,
    CoreModule,
    HeaderComponent,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
