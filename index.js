const path = require("path")
const { Command } = require("commander")
const operationsPath = path.join(__dirname, "contacts.js")
const contactsOperations = require(operationsPath)

const program = new Command()
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
program.parse(process.argv)
const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperations.listContacts()
      console.table(list)
      break
    case "get":
      const contact = await contactsOperations.getContactById(id)
      if (!contact) {
        console.log(`Contact with id=${id} not found`)
        break
      }
      console.log(contact)
      break
    case "add":
      await contactsOperations.addContact(name, email, phone)
      break
    case "remove":
      const result = await contactsOperations.removeContact(id)
      if (!result) {
        console.log(`Dont have id=${id} in contacts list`)
        break
      }
      console.log(`Contact ${result.name} with id=${id} was removed`)
      break
    default:
      console.warn("\x1B[31m Unknown action type! DEFAULT ACTION")
  }
}

invokeAction(argv)
