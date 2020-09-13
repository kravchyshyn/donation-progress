import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-campaign',
  templateUrl: './donation-campaign.component.html',
  styleUrls: ['./donation-campaign.component.scss']
})
export class DonationCampaignComponent implements OnInit {
  public campaignName = '';
  public campaignHash = '';
  public donationSum = 0;
  public newDonation = 0;
  public totalRaised = 0;
  public donationsStorage = [];
  public donationsHistory;
  public backgroundUrl;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.campaignName = params['campaignName'];
      this.donationSum = params['donationSum'];
      this.campaignHash = params['campaignHash'];
      this.backgroundUrl = params['backgroundUrl'];

      if (localStorage.getItem(this.campaignHash)) {
        this.donationsHistory = JSON.parse(localStorage.getItem(this.campaignHash));
        this.donationsStorage = this.donationsHistory.children &&
          this.donationsHistory.children.length &&
          this.donationsHistory.children[0] &&
          this.donationsHistory.children[0].children

        this.donationsStorage.forEach((curr) => {
          this.totalRaised += +curr.donation || 0;
        });
      }
    });
  }

  getJSON() {
    const donationsNeed = this.donationSum > this.totalRaised ?
      this.donationSum - this.totalRaised : 0;

    return JSON.stringify({
      children: [
        {
          color: 'transparent',
          campaignName: this.campaignHash,
          children: this.donationsStorage
        },
        {
          campaignName: 'free-place',
          color: 'rgba(255,255,255, 0.9)',
          children: [{
            person: 'Still Needed',
            donation: donationsNeed
          }]
        }
      ]
    });
  }

  onDonationAdded(donationInfo: any) {
    this.newDonation = +donationInfo.donation;
    this.donationsStorage.push({
      person: donationInfo.person,
      donation: donationInfo.donation
    });

    this.totalRaised += +donationInfo.donation;
    localStorage.setItem(this.campaignHash, this.getJSON());
  }

}
