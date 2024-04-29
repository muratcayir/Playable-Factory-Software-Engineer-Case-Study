import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
           
            return res.status(500).send({ error: 'Failed to sign out' });
        }

        res.send({});
    });
});

export { router as signoutRouter };
