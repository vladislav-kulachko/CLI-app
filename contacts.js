import { pathToFileURL } from "url";
import { readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";

const contactsPath = pathToFileURL("./db/contacts.json");

export async function listContacts() {
  const data = await readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const data = await readFile(contactsPath, "utf8");
  const oneContact = JSON.parse(data).find(
    ({ id }) => String(id) === contactId
  );
  return oneContact;
}

export async function removeContact(contactId) {
  const data = await readFile(contactsPath, "utf8");
  const newList = JSON.parse(data).filter(({ id }) => String(id) !== contactId);
  await writeFile(contactsPath, JSON.stringify(newList, null, 2), "utf8");
  return newList;
}

export async function addContact(name, email, phone) {
  const newContact = { id: randomUUID(), name, email, phone };
  const data = await readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  parsedData.push(newContact);
  await writeFile(contactsPath, JSON.stringify(parsedData, null, 2), "utf8");
  return newContact;
}
