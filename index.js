const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded())
app.use(express.json())
app.use(require('morgan')('dev'));

app.get('/', (_, res)=>{
    res.send('server is running')
});

const axios = require('axios');
const externalApiURL = 'http://colombia-muntodept-production-5434.up.railway.app/api';

app.get('/departamento/:ciudad',async (req, res)=>{
    const { ciudad } = req.params;

    try{
        const respuesta = await axios.get(`${externalApiURL}/${ciudad}`);
        
        // console.log(respuesta);

        res.send(respuesta.data);
    }catch(e){
        console.error(e);
        res.send('error');
    }
});

app.listen(app.get('port'), ()=>{
    console.log(`server is running on port ${app.get('port')}`);
});