import { Component } from '@angular/core';
import { Contact } from './models/contact';
import { ContactService } from './service/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-contact';

  contacts: Contact[] = [];
  selected!: number;

  constructor(){  }
  
  getThisContact(id: number){
    this.selected = id;
  }

  // ngOnInit(){
  //   /**
  //    * Au chargement de l'application,
  //    * je récupère mes contacts dans le localStorage.
  //    * @type {Contact()}
  //    */
  //   this.contacts = this.contactService.contacts;
  // }

  // newContact(newContactEvent: any){
  //   /**
  //    * On ajoute la nouvelle tâche dans le tableau de contacts. 
  //    * Puis on auvegarde dans le localStorage.
  //    */
  //   this.contacts.push(newContactEvent.contact);
  //   this.contactService.contacts = this.contacts;
  // }
}
