import { LightningElement, api, wire, track } from 'lwc';
import findContacts from '@salesforce/apex/contactList.getContactList';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];
export default class List extends LightningElement {

    @api recordId;

    @track data;
    @track columns = columns;

    @wire(findContacts, { AccountId: '$recordId' })
    handleWire(resp) {
        this.data = resp.data;
    }
}