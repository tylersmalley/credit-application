Welcome to the Braintree Front-End code challenge!
---

Your assignment is two part:

1. Build a client side application that:

  - Validates the form in `templates/form.html`:
    - All fields are required
    - `email` and `email-confirmation` must match
    - `address` must not contain `P.O. Box` `PO Box` or any variation thereof
    - `ssn` must:
      - have a length of 9 digits
      - _not_ consist of the same digit (e.g. `111 11 1111` is INVALID)
      - _not_ equal one of these blacklisted numbers: `123456789` `987654321`
 - Displays any validation errors to users in real-time
 - Makes a client-side POST request to `/application` with the following in the request body:
    - the data from the form
    - a `submitted-at` field that is set to the date and time of the submission (you can use `new Date()`)
 - Does not allow for multiple form submissions while a request is processing
 - Alters its presentation based on the user's viewport

  We have provided an html form to get you started in `templates/form.html`.

2. Create a simple back-end that serves up your front-end code and:
  - receives POST requests at `/application`
    - responds with a `201` if the validation criteria mentioned above are met
    - responds with a `400` if the validation criteria are not met

You should provide a `README` with clear instructions on how to get your assignment running.

# Conditions

* Your submission should work in the latest versions of most modern mobile and desktop browsers
* You will not use any frameworks in your client side JavaScript (CSS frameworks are fine)
* You are free to use frameworks in server side code and/or build system (if you choose to use one)
* You are free to modify the form template but are not obligated to do so
* You do not need to create a Database or persistence layer in your back-end

# Things that excite us

 - Testing
 - APIs that are expressive and natural
 - Abstractions that simplify a problem into easy to understand models

We can't wait to see what you come up with, good luck!
