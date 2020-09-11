import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.scss']
})
export class AddDonationComponent implements OnInit {
  @Output() donationAdded: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      newDonation: new FormControl(10, [
        Validators.required
      ]),
      person: new FormControl('John Silver', [
        Validators.required
      ])
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };

      this.donationAdded.emit({
        donation: formData.newDonation,
        person: formData.person
      });

      this.form.reset();
    }
  }

}
