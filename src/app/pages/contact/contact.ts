import { Component } from '@angular/core';
import { ContactForm } from './components/contact-form/contact-form';
import { ContactInfo } from './components/contact-info/contact-info';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, ContactInfo],
  template: `<app-contact-form /> <app-contact-info /> `,
})
export class Contact {}
