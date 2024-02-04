const  express =require("express")
const app=express()
const port=6000
const Payment=require('./Routes/Payments')
const Connection =require('./Database')

//Routes

app.use(express.json())

app.use("/",Payment)


Connection()
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
