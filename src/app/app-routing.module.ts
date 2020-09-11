import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DonationCampaignComponent } from './donation-campaign/donation-campaign.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'donation-campaign/:campaign', component: DonationCampaignComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
