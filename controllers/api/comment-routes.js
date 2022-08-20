const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  
    const commentData = await Comment.findAll({
      include: [User],
    });

    const comments = commentData.map((comment) => comment.get({ plain:true }));

    res.render('single-post', {comments, loggedIn:req.session.loggedIn});
});

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  const newComment = await Comment.create({
    body,
    userId: req.session.userId,
  });
  res.json(newComment);
})

module.exports = router;