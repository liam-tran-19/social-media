const app = require("./backend/app");
const config = require("./backend/config/index");

const { PORT } = config;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
