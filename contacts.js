const fs = require("fs").promises
const path = require("path")
const ShortUniqueId = require("short-unique-id")

const filePath = path.join(__dirname, "db/contacts.json")
const uid = new ShortUniqueId({ length: 10 })

// GET ALL CONTACTS ========================================================
async function listContacts() {
  const data = await fs.readFile(filePath)
  const contactsList = JSON.parse(data)
  return contactsList
}

// GET CONTACT BY ID =======================================================
async function getContactById(contactId) {
  const contacts = await listContacts()
  const result = contacts.find((item) => item.id === contactId)
  if (!result) {
    return null
  }
  return result
}

// ADD CONTACT =============================================================
async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newContact = {
    id: uid(),
    name: name,
    email: email,
    phone: phone,
  }
  contacts.push(newContact)
  fs.writeFile(filePath, JSON.stringify(contacts))
  console.log(`New contact: ${name} was added`)
}

// REMOVE CONTACTS ==========================================================
async function removeContact(contactId) {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === contactId)
  if (index === -1) {
    return null
  }
  const removedItem = contacts[index]
  contacts.splice(index, 1)
  fs.writeFile(filePath, JSON.stringify(contacts))
  return removedItem
}

// ================================================================== EXPORTS
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}