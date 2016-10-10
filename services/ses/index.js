function assertPresent(thing, message) {
  if (!thing) { throw new Error(message); }
  return thing;
}

function assertEmail(email) {
  ['emailTo', 'message', 'contact']
    .forEach(field => {
      assertPresent(email[field], `[400] Missing ${field}`);
    });
  return email;
}

function constructEmail(emailData) {
  const messageLabel = 'This email was sent through the contact us form on red-badger.com:';
  const contactLabel = 'Contact details:';

  const formattedHTMLMessage = `<p><strong>${messageLabel}</strong></p><p>${emailData.message}</p>`
    + `<p><strong>${contactLabel}</strong></p><p>${emailData.contact}</p>`;

  const formattedTxtMessage = [
    messageLabel,
    emailData.message,
    contactLabel,
    emailData.contact,
  ].join('\n\n');

  return {
    Destination: {
      ToAddresses: [emailData.emailTo],
    },
    Message: {
      Body: {
        Html: {
          Data: formattedHTMLMessage,
          Charset: 'UTF-8',
        },
        Text: {
          Data: formattedTxtMessage,
          Charset: 'UTF-8',
        },
      },
      Subject: {
        Data: 'Message submitted through the contact us form on red-badger.com',
        Charset: 'UTF-8',
      },
    },
    Source: 'hello@red-badger.com',
  };
}

export function validateAndSendEmail(email, emailSender) {
  return new Promise(resolve => resolve())
    .then(() => assertPresent(email, '[400] Missing email'))
    .then(assertEmail)
    .then(constructEmail)
    .then(emailData => emailSender(emailData, error => {
      if (error) { throw error; }
      return true;
    }));
}
