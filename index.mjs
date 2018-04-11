import fetch from 'node-fetch';

async function getFirstProcedure(){
  const graphQlQuery = ' {"query": "{procedures(type: PREPARATION, pageSize: 1) { title type period currentStatus abstract voteDate submissionDate notify listType }}" }';
  return await fetch('https://democracy.bundestag.io/graphql', {
  method: 'post',
    body: graphQlQuery,
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    return response.json()
  }).then((json) => {
    return json.data.procedures[0];
  });
}


async function getAccessToken() {
  const form = {
  email: 'test2@test2.de',
    password: '1234',
    strategy: 'local',
  }
  return await fetch('http://localhost:3030/authentication', {
  method: 'post',
    body: JSON.stringify(form),
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    return response.json()
  }).then((json) => {
    return json.accessToken;
  });
}

async function contribute(accessToken, contribution) {
  return fetch('http://localhost:3030/contributions', {
    method: 'post',
    body: JSON.stringify(contribution),
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json();
  })
}

async function main() {
  let firstProcedure = await getFirstProcedure();
  let accessToken    = await getAccessToken();
  const contribution = {
    title: firstProcedure.title,
    content: firstProcedure.abstract,
    type: "post",
    language: "de",
    categoryIds: ["5ac7768f8d655d2ee6d48fe4"] // democracy-politics
  }
  let response = await contribute(accessToken, contribution);
  console.log(response);
}

main();
