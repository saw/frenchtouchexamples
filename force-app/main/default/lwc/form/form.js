import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class Form extends LightningElement {
    @api recordId;

    fields = ['Name'];

    @track website;
    @track saved = false;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_WEBSITE_FIELD] })
    handleRecord(result) {
        if(result.data) {
            this.website = result.data.fields.Website.value;
        }
    }

    handleSuccess(e) {
        this.saved = true;
    }
}