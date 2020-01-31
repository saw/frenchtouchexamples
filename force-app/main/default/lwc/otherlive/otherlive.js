import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';

export default class Otherlive extends LightningElement {    
    
    recordId = "0035400000SP3ziAAD";

    
    
    @track name;
    @track saving = false;

    @wire(getRecord, { recordId: '$recordId', fields: CONTACT_NAME_FIELD })
    handleRecord(result) {
        if(result.data) {
            this.name = result.data.fields.Name.value;
        }
    }
}