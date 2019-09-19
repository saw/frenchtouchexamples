import { LightningElement, api, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import findContacts from '@salesforce/apex/contactList.getContactList';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Name', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}}, 
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];
export default class List extends NavigationMixin(LightningElement) {

    @api recordId;

    @track data;
    @track loading = true;
    @track columns = columns;

    _wiredResp;

    @wire(findContacts, { AccountId: '$recordId' })
    handleWire(resp) {
        this.loading = false;
        this._wiredResp = resp;
        const d = resp.data;
        const todo = [];
        const rows = [];
        if (d && d.length > 0) {
            d.forEach((item) => {
                todo.push(this[NavigationMixin.GenerateUrl]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: item.Id,
                        actionName: 'view'
                    }
                }).then(url => {
                    let thisRow = {...item};
                    thisRow.linkName = url;
                    rows.push(thisRow);
                }));
            });

            Promise.all(todo).then((values, blah) => {
                this.data = rows;
            });
        }
    }

    handleRefresh() {
        this.loading = true;
        refreshApex(this._wiredResp).then(() => {
            this.loading = false;
        });
    }
}