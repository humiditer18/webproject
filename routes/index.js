const app = express()
var path = require("path");

module.exports = function(app){
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname+'/views/index.html'));
    })
    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname+'/views/home.html'));
    })
}