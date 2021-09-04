import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'popup', component: PopupComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
