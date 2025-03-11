import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67d0b9e1001394931065');
    
export const account = new Account(client);
export { ID } from 'appwrite';