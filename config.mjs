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
