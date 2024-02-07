require("dotenv").config();
const { server } = require("./src/server");
const { sequelize } = require("./src/db");

sequelize.sync({ alter: true }).then(
  server.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on port ${process.env.PORT || 3001}`);
  })
);