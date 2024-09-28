import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBodyList } from '../../shared/models/response-body-list.model';
import { Contact } from '../../shared/models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactDataService {
  constructor(private http: HttpClient) {}

  insertContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('contact-inquiry', contact);
  }

  getAllContacts(
    skip: number = 0,
    limit: number = 10,
    query: string = '',
    tags: string = ''
  ): Observable<ResponseBodyList<Contact>> {
    return this.http.get<ResponseBodyList<Contact>>('contact-inquiry', {
      params: {
        skip,
        limit,
        query,
        tags,
      },
    });
  }

}
