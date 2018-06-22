
const express = require('express');

const req = require('axios');

const app = express();

const devices = [
{deviceId:1, name:"Home", status:'alarmed'},
{deviceId:2, name:"Office", status:'disalarmed'}];



app.get('/devices',(req,res) => res.send(devices));


const getuser = () => {
  return req.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    return Promise.resolve(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}


app.get('/users',(req,res) => {
  getuser()
    .then((users) => {
        res.send(users.map((user) => {
            return {
                userId: user.userId,
                name: user.name,
                email: user.email
            };
        }));
    });
});
app.listen(3000,()=> console.log("runnin on 3000"));