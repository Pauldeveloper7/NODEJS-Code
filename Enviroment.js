const app = require('./middleware')

 console.log(app.get('env'))
 console.log(process.env)
const port = 8000;
app.listen(port,()=>{
    console.log('Server has started ')
})