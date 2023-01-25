const fs = require('fs')
const express = require('express') 
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())


app.get('/pets', (req,res)=>{
    fs.readFile('./pets.json',(err,data)=>{
        if(err){
            throw err
        } else {
            res.send(data)
        }
    })
})

app.get('/pets/:id', (req,res)=> {
    let id = req.params.id
    fs.readFile('./pets.json', (err ,data)=>{
        if(err){
            throw err
        } else {
            let petsAtId = JSON.parse(data)[id]
            petsAtId = JSON.stringify(petsAtId)
            res.send(petsAtId)
        }
    })
})

app.post('/pets', (req,res) => {
    let {age, kind, name} = req.body
    let newPetdata = {
        age: age,
        kind: kind,
        name: name
    }
    fs.readFile('./pets.json', (err ,data)=>{
        if(err){
            throw err
        } else {
            data = JSON.parse(data)
            data.push(newPetdata)
            data = JSON.stringify(data)
            fs.writeFile('./pets.json', data, (err)=>{
                if (err) {
                    throw err
                } else {
                    console.log('Post sucessful')
                    res.send('new pet has beem posted')
                }
            })
        }
    })
})

app.patch('/pets/:id', (req, res) => {
    let {age, kind, name} = req.body
    let id = req.params.id

    fs.readFile('./pets.json', (err ,data)=> {
        if(err){
            throw err 
        } else {
            data = JSON.parse(data)
            let updatedPet = data[id]
            updatedPet.age = age
            updatedPet.kind = kind
            updatedPet.name = name
            data[id] = updatedPet
            data = JSON.stringify(data)
            fs.writeFile('./pets.json', data, (err)=>{
                if (err) {
                    throw err
                } else {
                    console.log('Patch sucessful')
                    res.send('pet has been updated')
                }
            })

        }

    })

})

app.delete('/pets/:id', (req,res) => {
    let id = req.params.id
        fs.readFile('./pets.json', (err ,data)=>{
            if(err){
                throw err
            } else {
                data = JSON.parse(data)
                data.splice(id,1)
                data = JSON.stringify(data)
                fs.writeFile('./pets.json', data, (err)=>{
                    if (err) {
                        throw err
                    } else {
                        console.log('DELETE sucessful')
                        res.send('pet has been DELETED!!')
                    }
                })
            }
    })
})




app.listen(PORT, (err)=> {
    if(err){
        throw err
    } else {
        console.log(`PORT listening on ${PORT}`)
    }
})

