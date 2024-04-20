import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SimpleTestComponent } from './simple-test/simple-test.component';
import { AdvancedTestComponent } from './advanced-test/advanced-test.component';
import { TestBoxComponent } from './test-box/test-box.component';
import { TestDurationComponent } from './test-duration/test-duration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from './pipe/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    SimpleTestComponent,
    AdvancedTestComponent,
    TestBoxComponent,
    TestDurationComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
