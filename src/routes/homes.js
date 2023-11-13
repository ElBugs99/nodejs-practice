const {Router} = require('express')

const router = Router()

router.get('/homes', (req, res) => {
    res.send('homes tab')
})

module.exports = router