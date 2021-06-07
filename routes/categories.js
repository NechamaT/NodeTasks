const router = require("express").Router();
const tasksdb = require("../db/to-do-item-db");
const categoriesDb = require("../db/categories-db");

router.get("/", async (req, res) => {
  const categories = await categoriesDb.getCategories();
  res.render("categories/index", { categories });
});

router.post("/addcategory", async (req, res) => {
  await categoriesDb.addCategory(req.body);
  res.redirect("/categories");
});

router.get("/addcategory", async (req, res) => {
  res.render("categories/addcategory");
});

router.get('/editcategory', async (req, res) => {
  const category = await categoriesDb.getCategoryName(req.query.id);
  res.render('categories/editcategory', {category});
});


router.post("/update", async (req, res) => {
  await categoriesDb.updateCategory(req.body);
  console.log(req.body);
  res.redirect("/categories");
});

router.get('/bycategory', async (req, res) => {
  const items = await tasksdb.getByCategoryId(req.query.id);
  res.render('categories/bycategory', { items });
});

module.exports = router;
