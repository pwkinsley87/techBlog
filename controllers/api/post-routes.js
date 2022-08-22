const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const body = req.body;

    const newPost = await Post.create({ body, userId: req.session.userId });
    res.json(newPost);
});

router.put('/:id', withAuth, async (req, res) => {
    const [affectedRows] = await Post.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
});

router.delete('/:id', withAuth, async (req, res) => {
    const [affectedRows] = Post.destroy({
        where: {
            id: req.params.id
        }
    })
});

module.exports = router;