import { Command } from "commander/esm.mjs";
import { argv } from "process";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(argv);

const opts = program.opts();

(async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.table(addedContact);
      break;

    case "remove":
      const newList = await removeContact(id);
      console.table(newList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
})(opts);
