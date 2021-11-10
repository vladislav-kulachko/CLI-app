import { pathToFileURL } from "url";
import { readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";

const contactsPath = pathToFileURL("./db/contacts.json");

export async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const oneContact = contacts.find(({ id }) => String(id) === contactId);
  return oneContact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const newList = contacts.filter(({ id }) => String(id) !== contactId);
  await writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newList;
}

export async function addContact(name, email, phone) {
  const newContact = { id: randomUUID(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
