const router = require('express').Router();
const {Blog} = require('../../models');
//post a blog if logged in
router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(401).json({msg:"you must first login"})
  }
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});// delete blog if logged in

router.get('/', async (req, res) => {
  // find all blogs
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs)
    console.log("getting all blogs");
    } catch (err) {
        console.log(err)
    }
});

router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(401).json()
  }
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
{msg:"you must first login"}
module.exports = router;
