const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
// Do not touch this file
const { Employee } = require('./db/index.js');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const paginate = (pageNum, pageSize) => {
  return { limit: pageSize, offset: pageNum * pageSize };
};

app.post('/api/employees', (req, res, next) => {
  
  if(req.body.firstName != undefined && req.body.lastName != undefined && req.body.email != undefined && req.body.title != undefined){
    const newEmployee = req.body;
    
    Employee.create(newEmployee)
    .then(()=>{
      res.status(200).send('New employee created')
    })
    .catch(err=>{
          
          res.status(200).send(console.log(err))
    })
    .catch(next)
  } else {
    res.status(400).send('missing either first name, last name, title or email!')
  }
})

app.put('/api/employees/:id', (req, res, next) => {
  const id = req.params.id;
  Employee.update(
      req.body,
      {where: {id: id}}
  )
  .then(() => {
    res.status(200).send('updated')
  })
});

app.delete('/api/employees/:id', (req, res, next) => {
    const id = req.params.id;
    Employee.destroy({
      where: { id: id }
    })
    .then(data=>{
      res.status(200).send('complete')
    })
})

app.get('/api/employees/:page?', (req, res, next) => {
  const resultsPerPage = 50;
  // pageNum is zero indexed
  let pageNum = req.params.page;
  if (pageNum === undefined) {
    pageNum = 0;
  } else if (isNaN(pageNum)) {
    return res.status(400).send({ error: 'Invalid page number' });
  }

  const { limit, offset } = paginate(pageNum, resultsPerPage);
  Employee.findAndCountAll({
    limit,
    offset,
    order: [
      ['firstName', 'asc'],
      ['lastName', 'asc'],
    ],
  }).then(results => {
    res.status(200).send(results);
  });
});

app.get('/api/:id', (req, res, next) => {
  const id = req.params.id;
    Employee.findByPk(id)
    .then(data=>{
      res.status(200).send(data)
    })
    .catch(next)
});



module.exports = { app };
