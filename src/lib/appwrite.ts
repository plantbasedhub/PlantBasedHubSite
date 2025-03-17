import { Client, Account } from 'appwrite';

export const client = new Client();

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;


if (!projectId) {
  throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID não está definido');
}

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);
    
export const account = new Account(client);
export { ID } from 'appwrite';