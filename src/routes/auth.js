const express = require("express");
const route = express.Router();
const yup = require("yup");
const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (err) {
    return res.status(400).json({ type: err.name, message: err.message });
  }
};


let categories = [
  {
    id: 1,
    name: "CPU",
    description: "Cac loai CPU cho may tinh",
  },
  {
    id: 2,
    name: "HDD",
    description: "Cac loai dia cung cho may tinh",
  },
];

const schema = yup.object({
  body: yup.object({
    username: yup.string().email("đây phải là email").required(),
    password: yup.string().required(),
  }),
});

const schemaCategory = yup.object({
  body: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  }),
});

route.post("/auth/login", validateSchema(schema), function (req, res, next) {
  const user = {
    username: "tungnt@softech.vn",
    password: "123456789",
  };

  if (
    req.body.username == user.username &&
    req.body.password == user.password
  ) {
    res.status(200).json({
      user: {
        email: "tungnt@softech.vn",
        username: "tungnt",
      },
      access_token: "...",
    });
  } else {
    res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
});

route.get("/categories/:id", (req, res, next) => {
  let idCategory = Number.parseInt(req.params.id);
  let category = categories.find((cat) => cat.id == idCategory);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({});
  }
});

route.get("/categories", (req, res, next) => {
  res.json(categories);
});

route.post("/categories", validateSchema(schemaCategory), (req, res, next) => {
  categories = [...categories, req.body];
  res.status(201).json(req.body);
});

route.patch(
  "/categories/:id",
  validateSchema(schemaCategory),
  (req, res, next) => {
    let idCategory = Number.parseInt(req.params.id);
    let category = categories.find((cat) => cat.id == idCategory);
    try {
      if (category) {
        categories = categories.forEach((cat) => {
          if (cat.id == idCategory) {
            cat.name = req.body.name;
            cat.description = req.body.description;
          }
        });
        res.status(200).json(req.body);
      } else {
        res.status(404).json({});
      }
    } catch (err) {
      console.log(err);
    }
  }
);

route.delete("/categories/:id", (req, res, next) => {
  let idCategory = Number.parseInt(req.params.id);
  try {
    categories = categories.filter((cat) => cat.id !== idCategory);
    res.status(200)
  }
  catch(err) {
    res.status(410)
  }

  
});

route.get("/", function (req, res, next) {
  res.send("home");
});

module.exports = route;
