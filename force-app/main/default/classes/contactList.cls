public with sharing class contactList {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String AccountId) {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact WHERE AccountId = :AccountId];
    }
}
