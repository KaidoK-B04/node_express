//imports

const path = require("path");
const express = require("express");
const cors = require("cors");

const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3500;


//Middleware
app.use(logger);
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//Cors stuff
const whitelist = ["http://localhost:3500", "http://127.0.0.1:5500"];
const corsOptions = 
{
  origin: (origin, callback) =>
  {
    if (whitelist.indexOf(origin) !== -1 || !origin)
    {
      callback(null, true)
    }
    else
    {
      callback(new Error("Blocked by Cors!"))
    }
  }, optionSuccessStatus: 200
}

app.use(cors(corsOptions));

//Routes
app.use(("/subdir"), require("./routes/subdir"));
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) =>
{
  res.status(404);
  if (req.accepts("html"))
  {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  }
  else if (req.accepts("json")) 
  {
    res.json({error: "404, JSON not found"});
  }
  else if (req.accepts("text"))
  {
    res.type({error: "404, text not found"});
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));