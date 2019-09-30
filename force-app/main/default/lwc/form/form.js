import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class Form extends LightningElement {
    @api recordId;

    fields = ['Name','MailingAddress'];
    
    @track name;
    @track saving = false;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
    handleRecord(result) {
        if(result.data) {
            this.name = result.data.fields.Name.value;
        }
    }

    handleSubmit() {
        this.saving = true;
    }

    handleError() {
        this.saving = false;
    }

    handleSuccess(e) {
        this.saving = false;
        this.dispatchEvent(
            new CustomEvent('recordsaved')
        );
        let fields = this.template.querySelectorAll('lightning-input-field');
        [...fields].forEach((field) => {
            field.reset();
        })
    }
}