import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactService } from '../service/contact.service';
import { ContactComponent } from '../contact/contact.component';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  isPopupOpened = true;
  customers;
  aux;

  constructor(private dialog?: MatDialog,
    private _contactService?: ContactService) {
    this.getContactList();
  }

  ngOnInit() {
    this.getContactList();
  }

  getContactList() {
    this._contactService.getAllContacts()
.subscribe(data => {
  this.aux = data;
  this.customers = this.aux._embedded.customers;
  console.log( this.customers);
});
    return this.customers;
}

  addContact() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(ContactComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.getContactList()
    });
  }

  editContact(id: number) {
    this.isPopupOpened = true;
    this.isPopupOpened = true;
    const contact = this.getContactList().find(c => c.id === id);
    const dialogRef = this.dialog.open(ContactComponent, {
      data: {contact}
    });


    // tslint:disable-next-line:no-unused-expression
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  deleteContact(id: number) {
    this._contactService.deleteContact(id);
    this.getContactList();
  }
}
