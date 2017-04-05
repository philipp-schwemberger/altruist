'use strict'

const test = require('ava')
const settings = require('standard-settings')()
const mailjet = require('../../actions/mailjet')

test('Mailjet - Send valid mail (need fromEmail and templateID in settings.json)', t => {
  const validSimpleOptions = {
    "fromEmail": settings.actions.mailjet.fromEmail,
    "recipients": [{"Email": settings.actions.mailjet.fromEmail}],
    "subject": "Simple mailjet template test"
  }
  return mailjet.run(validSimpleOptions, {})
  .then(res => {
    t.true(res.body.Sent.length > 0)
  })
  .catch(err => {
    t.fail()
  })
})

test('Mailjet - Send empty query', t => {
  const emptyOptions = {}
  return mailjet.run(emptyOptions, {})
  .then(res => {
    t.fail('Action did not return an error')
  })
  .catch(err => {
    t.pass()
  })
})
