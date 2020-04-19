function GET(type, chart) {
    return fetch(`/api/${type}/${chart}`);
}


function POST(data, a, b) {
  return fetch(`/api/${a}/${b}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


function PUT(data, a, b) {
  return fetch(`/api/${a}/${b}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


function DELETE(record, sortBy, order) {
  return fetch(`/api/data/one/${sortBy}/${order}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(record)
  });
}

const api = {
  GET,
  POST,
  PUT,
  DELETE
};

export default api;
