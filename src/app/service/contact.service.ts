import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contacts: string | null;
  constructor() {
    this.contacts = window.localStorage.getItem("contact");
    if(this.contacts == null){
      window.localStorage.setItem("contact", JSON.stringify([]));
      this.contacts = window.localStorage.getItem("contact");
    }
  }

  getContacts(){
    return JSON.parse(<string>this.contacts);
  }

  addContact(valeurs: string){
    //console.log(valeurs)
    let jsonData = JSON.parse(valeurs);
    let contact = new Contact() ;

    contact.id = this.generateID()
    contact.name = jsonData.name
    contact.pseudo = jsonData.pseudo
    contact.email = jsonData.email

    let arrayData = JSON.parse(this.contacts|| "");
    arrayData.push(contact)

    this.contacts = JSON.stringify(arrayData)
    window.localStorage.setItem("contact", this.contacts)

  }

  // @ts-ignore
  getSelectedContact(id: number) {
    let taskData = JSON.parse(this.contacts || "");
    for (let i=0; i<taskData.length; i++){
      if (taskData[i].id == id){
        return JSON.stringify(taskData[i]);
      }
    }
  }

  generateID(){
    if (this.contacts!==null){
      let contactsData = JSON.parse(this.contacts);
      return contactsData.length + 1;
    }else {
      return 1;
    }
  }
}
