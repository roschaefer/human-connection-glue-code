import fetch from 'node-fetch';
const form = {
  email: 'test2@test2.de',
  password: '1234',
  strategy: 'local',
}

console.log(form);
fetch('http://localhost:3030/authentication', {
  method: 'post',
  body: JSON.stringify(form),
  headers: {
    'Content-Type': 'application/json'
  }
}).then((response) => {
  return response.json();
}).then((json) => {
  console.log(json);
})
