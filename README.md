Credit Application Front-End code challenge!
---

Here are the [Guildlines](GUIDELINES.md) for this challenge.

# Development

To get up and running run `make` to install node dependencies, build the application and start a watcher.

Next, in a separate terminal run `make server`. This will serve the static assets from the `/public` directory.

# Testing

In the spirit of the challenge, I rolled my own mini assertion library. You can view the output of the tests at `test.html`

# API

## Create Application

`POST /application`

- first-name
- last-name
- address
- ssn
- email
- email-confirmation

### Success

Response:

```javascript
{
  "first-name": "Tyler",
  "last-name": "Smalley",
  "address": "1720 SW 4th Ave",
  "ssn": "123412345",
  "email": "tylersmalley@me.com",
  "email-confirmation": "tylersmalley@me.com"
}
```

Example:

`curl -H "Content-Type: application/json" -X POST -d '{"first-name": "Tyler", "last-name": "Smalley", "address": "1720 SW 4th Ave", "ssn": "123412345", "email": "tylersmalley@me.com", "email-confirmation": "tylersmalley@me.com" }' http://localhost:8010/application`

### Failure

Response:

```javascript
{
  "data": {
    "first-name": "Tyler",
    "address": "PO Box 1720",
    "ssn": "111111111",
    "email": "tylersmalley@me.com",
    "email-confirmation": "notmyemail@me.com"
  },
  "errors": {
    "last-name": "is required",
    "address": "non PO Box is required",
    "ssn": "valid 9 digit SSN is required",
    "email-confirmation": "must match the email address"
  }
}
```

Example:

`curl -H "Content-Type: application/json" -X POST -d '{ "first-name": "Tyler", "address": "PO Box 1720", "ssn": "111111111", "email": "tylersmalley@me.com", "email-confirmation": "notmyemail@me.com"}' http://localhost:8010/application`

## List Applications

`GET /application`

Response:

```javascript
[
  {
    "first-name": "Tyler",
    "last-name": "Smalley",
    "address": "1720 SW 4th Ave",
    "ssn": "123412345",
    "email": "tylersmalley@me.com",
    "email-confirmation": "tylersmalley@me.com"
  }, { ... }
]
```

Example:

`curl http://localhost:8010/application`
