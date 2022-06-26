const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./src/models/index");
const swaggerUi = require("swagger-ui-express");
var helmet = require("helmet");
const { Travel } = require("./src/models/index");
const { uidToIdTravel } = require("./src/repository/travel_repository");

// ------------------- CONFIG --------------------- //

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://mapadora.fr",
    "https://mapadora.fr",
  ],
  // headers: ["Content-Type", "Authorization"]
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// ------------------- SERVER --------------------- //

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// ------------------- SEQUELIZE --------------------- //

db.sequelize.sync({ alter: true });
// .sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

// ------------------- ROUTES --------------------- //
const diary = require("./src/routes/diary_routes");
const document = require("./src/routes/document_routes");
const interestpoint = require("./src/routes/interestpoint_routes");
const photo = require("./src/routes/photo_routes");
const step = require("./src/routes/step_routes");
const task = require("./src/routes/task_routes");
const position = require("./src/routes/position_routes");
const tasklisttag = require("./src/routes/tasklisttag_routes");
const trip = require("./src/routes/trip_routes");
const travel = require("./src/routes/travel_routes");
const errorHandler = require("./src/utils/errors_middlewares");
// const element = require('./routes/elements_routes')
const traveler = require("./src/routes/traveler_routes");
const transportmode = require("./src/routes/transportmode_routes");
const travelreview = require("./src/routes/travelreview_routes");
const traveltag = require("./src/routes/traveltag_routes");
const participant = require("./src/routes/participant_routes");
const uid = require("./src/routes/uid_routes")

app.use("/", travel);
app.use("/travel/:idTravel/", interestpoint, errorHandler.urlIdErrorHandler);
app.use("/travel/:idTravel/", step, errorHandler.urlIdErrorHandler);
app.use("/travel/:idTravel/trip", trip, errorHandler.urlIdErrorHandler);

app.use(
  "/travel/:idTravel/step/:idStep/interestpoint",
  interestpoint,
  errorHandler.urlIdErrorHandler
);

app.use("/travel/:idTravel/document", document, errorHandler.urlIdErrorHandler);
app.use("/travel/:idTravel/diary", diary, errorHandler.urlIdErrorHandler);
app.use("/travel/:idTravel/photo", photo, errorHandler.urlIdErrorHandler);

app.use("/travel/:idTravel/task", task, errorHandler.urlIdErrorHandler);
app.use(
  "/travel/:idTravel/tasklisttag",
  tasklisttag,
  errorHandler.urlIdErrorHandler
);
app.use("/travel/:idTravel/position", position, errorHandler.urlIdErrorHandler);

// app.use('/element', element);
app.use("/traveler", traveler);
app.use("/travel/:idTravel/participant", participant);

app.use("/transportmode", transportmode);
app.use("/travel/:idTravel/travelreview", travelreview),
  errorHandler.urlIdErrorHandler;
app.use("/traveltag", traveltag);

// app.use(
//   "/view/:pathUid/diary",
//   uidToIdTravel,
//   uid,
//   errorHandler.urlIdErrorHandler
// );
// app.use(
//   "/view/:pathUid/photo",
//   uidToIdTravel,
//   photo,
//   errorHandler.urlIdErrorHandler
// );
// app.use(
//   "/view/:pathUid/position",
//   uidToIdTravel,
//   position,
//   errorHandler.urlIdErrorHandler
// );
app.use("/",uid)
// Static folder
app.use("/uploads", express.static("uploads"));

// ------------------- ERREURS --------------------- //
app.use(errorHandler.validationErrorHandler);
app.use(errorHandler.otherErrorHandler);
// app.use(errorHandler.unauthorizedErrorHandler);
app.use(errorHandler.emptyObjectErrorHandler);

// ------------------- SWAGGER --------------------- //

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.3",
  basePath: "./",
  info: {
    title: "Projet ACROBATT",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
    license: {
      name: " ",
      url: " ",
    },
    contact: {
      name: "HelloWorld",
      url: "hello@world.org",
    },
  },
  servers: [
    {
      url: "http://localhost:8080/",
      description: "Development server",
    },
  ],
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./src/routes/*.js"],
  basePath: "/",
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
