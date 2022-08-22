const router = require('express').Router();
const { printStatus } = require('init');
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true}));

    res.render('all-posts-admin', { posts, loggedIn: req.session.loggedIn});
});

router.get('/post/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {id: req.params.id},
        incude: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    });

    if (postData) {
        const post = postData.get({ plain: true });

        res.render('single-post', { post, loggedIn: req.session.loggedIn});
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

module.exports = router;