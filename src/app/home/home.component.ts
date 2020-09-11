import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      donation: new FormControl(1000, [
        Validators.required
      ]),
      campaign: new FormControl('New Campaign', [
        Validators.required,
        Validators.minLength(4)
      ]),
      backgroundUrl: new FormControl(
        'https://images.unsplash.com/photo-1520758594221-872948699332?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
      ),
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      const campaignUrlFragment = formData.campaign && formData.campaign.replace(/\s+/g, '-').toLowerCase() || '';
      this.form.reset();

      this.router.navigate(['donation-campaign', campaignUrlFragment], {
        queryParams: {
          donationSum: formData.donation,
          campaignName: formData.campaign,
          campaignHash: campaignUrlFragment,
          backgroundUrl: formData.backgroundUrl
        }
      });
    }
  }

}
