
const express=require('express')
const dotenv = require('dotenv');
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())

dotenv.config();
const PORT = process.env.PORT || 8000;
const API_KEY=process.env.API_KEY
app.post('/completions', async(req,res)=>{

    const { message } = req.body;
    const options={
        method:"POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-1106",
            messages: [
                {role: "user", content: message},
                
              ],
            max_tokens: 300,
        })
    }
    try{
        const response=await fetch('https://api.openai.com/v1/chat/completions', options)
        const data=await response.json()
        res.send(data)
    }
    catch(error){
        console.error(error)
    }
})

app.listen(PORT, ()=>console.log('Server running on PORT '+ PORT))