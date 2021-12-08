import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { Contact } from '../models/contact';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

/**
 * Permet d'émetre un évènement lors
 * de la création d'un contact.
 * @type {EventEmitter<any>}
 */
@Output() newContactEvent = new EventEmitter();
  /**
   * Le contact à créer.
   * @type {Contact}
   */
  contacts: Contact[] = [];
  submitted = false;
  constructor(private contactService: ContactService) { }

  contactForm = new FormGroup({
    name: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    pseudo: new FormControl('',[ Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[ Validators.required, Validators.email]),
  });
 

  ngOnInit(): void {
   this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  onFormSubmit(){
    this.submitted = true;
    if(this.contactForm.invalid){
      return;
    }
    this.contactService.addContact(JSON.stringify(this.contactForm.value))
    this.getContacts()
  }

  onReset(){
    this.submitted = false;
    this.contactForm.reset();
  }

  get nom() { return this.contactForm.get('name'); }
  get pseudo() { return this.contactForm.get('pseudo'); }
  get email() { return this.contactForm.get('email'); }

  getThisContact(id: number) {
    this.newContactEvent.emit(id);
  }

  // addContact(){
  //   /**
  //    * Lorsque l'utilisateur soumet le fourmulaire
  //    * j'émet l'évènement avec le nouveau contact.
  //    */
  //   this.newContactEvent.emit({ contact: this.contact})

  //   /**
  //    * Réinitialisation du contact
  //    * @type {Contact}
  //    */
  //   this.contact = new Contact();
  // }  

  
}
