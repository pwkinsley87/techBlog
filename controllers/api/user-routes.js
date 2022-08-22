const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password
    });

    req.session.save(() => {
        req.session.userId = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;

        res.json(newUser);
    })
});

router.post('/login', async (req. res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
});

    if (!user) {
        res.status(400).json({ message: 'No user account found!' });
        return;
    }

    const passwordOk = user.checkPassword(req.body.password);

    if (!validPassword) {
        res.status(400).json({ message: 'Bad password!'});
        return;
    }

    req.session.save(() => {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({ user, message: 'Logged in!' });
    });

    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(404).end();
            });
        }
    });

module.exports = router;