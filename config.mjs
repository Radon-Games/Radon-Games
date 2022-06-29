import "dotenv/config";

export default {
  ip: process.env.IP, // IP of the server
  port: process.env.PORT || 8080 // Port of the server
}
