const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.log("All Contacts:", allContacts);
        break;

      case "get":
        const singleContact = await getContactById(id);
        console.log("Contact by ID:", singleContact);
        break;

      case "add":
        const newContact = await addContact({ name, email, phone });
        console.log("Added Contact:", newContact);
        break;

      case "remove":
        const removedContact = await removeContact(id);
        console.log("Removed Contact:", removedContact);
        break;

      default:
        console.log("Invalid action type");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

program
  .option("-a, --action <type>", "Action (list, get, add, remove)")
  .option("-i, --id <type>", "Contact ID")
  .option("-n, --name <type>", "Contact Name")
  .option("-e, --email <type>", "Contact Email")
  .option("-p, --phone <type>", "Contact Phone");

program.parse();

const options = program.opts();
invokeAction(options);
