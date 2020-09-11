import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DonationCampaignComponent } from './donation-campaign/donation-campaign.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TreeMapComponent } from './tree-map/tree-map.component';
import { AddDonationComponent } from './add-donation/add-donation.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonationCampaignComponent,
    ProgressBarComponent,
    TreeMapComponent,
    AddDonationComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
