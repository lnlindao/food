const server = require("./src/app.js");
const { fillDatabase } = require("./src/controllers/dietController.js");
const { conn } = require("./src/db.js");

const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(port, async () => {
    await fillDatabase();
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
