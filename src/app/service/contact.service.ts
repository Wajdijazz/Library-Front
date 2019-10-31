import { Injectable } from '@angular/core';
import { Contact } from '../model/contact';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) {
  }
  url = 'http://localhost:8080';


  saveCustomer(data: Contact) {
    this.http.post(`${this.url}/customers`, data)
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }





  editContact(id: Number, data: Contact) {
    console.log(id);
    console.log(data)
    this.http.put(`${this.url}/customerUpdate/${id}`, data)
      .subscribe(
        res => {
          console.log(res);
        }
      );

  }

  deleteContact(id: number) {
    this.http.delete(`${this.url}/customerDelete/${id}`)
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

  getAllContacts() {
    return this
      .http
      .get(`${this.url}/customers`);


  }
}
