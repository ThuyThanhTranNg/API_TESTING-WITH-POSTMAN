const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let people = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    age: 25,
    email: 'nguyenvana@example.com',
    phone: '0123 456 789',
    address: '123 Đường ABC, Thành phố XYZ'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    age: 23,
    email: 'tranthib@example.com',
    phone: '0987 654 321',
    address: '456 Đường DEF, Thành phố ABC'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    age: 28,
    email: 'levanc@example.com',
    phone: '0909 888 777',
    address: '789 Đường GHI, Thành phố DEF'
  }
];


app.get('/', (req, res) => {
  res.send('Welcome to Personal Info API');
});


app.get('/api/v1', (req, res) => {
  res.json(people);
});


app.post('/api/v1', (req, res) => {
  const newPerson = req.body;
  newPerson.id = people.length ? people[people.length - 1].id + 1 : 1;
  people.push(newPerson);
  res.status(201).json({ message: 'Đã thêm người mới', data: newPerson });
});


app.put('/api/v1/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = people.findIndex(p => p.id === id);

  if (index !== -1) {
    people[index] = { ...people[index], ...req.body };
    res.json({ message: 'Đã cập nhật', data: people[index] });
  } else {
    res.status(404).json({ message: 'Không tìm thấy người dùng' });
  }
});


app.delete('/api/v1/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = people.findIndex(p => p.id === id);

  if (index !== -1) {
    const deleted = people.splice(index, 1);
    res.json({ message: 'Đã xóa người dùng', data: deleted[0] });
  } else {
    res.status(404).json({ message: 'Không tìm thấy người dùng' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
