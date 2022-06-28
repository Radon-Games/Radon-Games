<img height="70px" src="https://raw.githubusercontent.com/Radon-Games/Radon-Games/main/public/img/banner.svg"></img>

An open-source unblocked games website built with simplicity in mind.

## Setup
```
git clone https://github.com/Radon-Games/Radon-Games
cd Radon-Games
npm install
npm run build
npm start
```

## Configuration

There are a coupple of ways that you can change configuration values. The first of those ways is changing values within `config.mjs`, this is the easiest way to change values. The second way is to use the coressponding environment variables. Both ways do the same thing but have their own use cases.

`config.mjs`
```js
import "dotenv/config";

export default {
  ip: process.env.IP, // IP of the server
  port: process.env.PORT || 8080, // Port of the server
  email: {
    id: process.env.EMAIL_ID, // Mailjet ID
    key: process.env.EMAIL_KEY, // Mailjet Key
    request: process.env.REQUEST_EMAIL, // Request Email
    report: process.env.REPORT_EMAIL, // Report Email
  }
}
```

`.env`
```
IP=127.0.0.1
PORT=80
EMAIL_ID=
EMAIL_KEY=
REQUEST_EMAIL=
REPORT_EMAIL=
```
