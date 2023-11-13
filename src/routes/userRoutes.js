const userRoutes = (app) => {
    app.get('/admin', (req, res) => {
        res.send('ADMIN DASHBOARD')
    })
}

module.exports = userRoutes;