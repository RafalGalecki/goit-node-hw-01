const fs = require("fs").promises;
require("colors");
const path = require("path");

const contactsPath = path.join("./db", "contacts.json");
const contactsDataBase = require("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = data.toString();
      return contacts;
    })
    .then((result) => console.table(result.blue))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const contactsFilter = contacts.filter(
        (contact) => contact.id === contactId
      );
      if (contactsFilter.length > 0) {
        console.log(contactsFilter);
        return;
      }
      console.log(`There is no contact with the id: ${contactId}.`.red);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);

        fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
          if (error) {
            console.log(error.message);
            return;
          }
        });
        console.log(`Contact with the id ${contactId} has been removed.`.green);
      } else {
        console.log(`There is no contact with the id: ${contactId}.`.red);
      }
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  const contact = {
    id: Math.floor(Math.random() * 10000) + contactsDataBase.length,
    name,
    email,
    phone,
  };

  if (name === undefined || email === undefined || phone === undefined) {
    console.log("Please set all arguments (name,email,phone) to add contact");
    return;
  }

  contactsDataBase.push(contact);

  const contactsUpdate = JSON.stringify(contactsDataBase);

  fs.writeFile(contactsPath, contactsUpdate, (error) => {
    if (error) {
      console.log("Oops, something went wrong:".red, error.message);
      return;
    }
  });
  console.log(`${name} has been added to your contacts`.green);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
