const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5500
const path = require('path')


app.use(bodyParser.json())
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'));


const database = {
  users: [
    {
      id: '321',
      name: "john",
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '1314',
      name: "karimbellarabi",
      email: 'kareem@gmail.com',
      password: 'kareem',
      entries: 0,
      joined: new Date()
    },
  ]
}


 
app.get('/', (_, res) => {
  res.render('index.html')
})

//Register endpoint 
app.post('/signup', (req, res) => {
  const {name, email, password} = req.body

  database.users.push({
    id: '13141',
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  })

  res.status(201).render('profile', {name, email, password})
})


//Login endpoint
app.post('/login', (req, res) => {
  database.users.forEach((user) => {
    if(req.body.name === user.name & req.body.password === user.password) {
      res.status(200).json('success')
    }
    else {
      res.status(400).json('incorrect password or name')
    }

  }) 

})

//profileId endpoint 
app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  console.log(id)

  database.users.forEach( (user) => {
    if(id === user.id) {
      found = true
      user.entries++
      res.json(user.entries)
    }
  })
  if(!found) {
    res.json('User not found')
  }

}) 








app.listen(PORT, () => console.log(`Server running PORT on ${PORT}`))