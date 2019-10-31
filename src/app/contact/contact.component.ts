import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactService } from '../service/contact.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public _contactForm: FormGroup;
   aux;
customers;

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<ContactComponent>,
  private _contactService: ContactService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      id: [this.data.id],
      firstName: [ this.data.firstName, [Validators.required]],
      lastName: [ this.data.lastName, [Validators.required]],
      job: [ this.data.job, [Validators.required]],
      address: [ this.data.address, [Validators.required]],
      email: [ this.data.email , [Validators.required]],
    });
  }

  onSubmit() {
    if (isNaN(this.data.id)) {
      this._contactService.saveCustomer(this._contactForm.value);
      console.log(this._contactForm.value)
      this.dialogRef.close();
      this.getContactList();
    } else {
      this._contactService.editContact(this.data.id, this._contactForm.value);
      this.dialogRef.close();
    }
  }
  getContactList() {
    this._contactService.getAllContacts()
      .subscribe(data => {
        this.aux = data;
        this.customers = this.aux._embedded.customers
        console.log( this.customers);
      });
  }
}
