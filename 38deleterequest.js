const express = require('express');
const fs = require('fs');
const port = 3000;
const app = express();
const movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json());

app.delete('/api/v1/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movieToDelete = movies.find(el => el.id === id);

  if (!movieToDelete) {
    return res.status(404).json({
      status: 'Failure',
      message: "The movie is not available with ID " + id,
    });
  }

  const index = movies.indexOf(movieToDelete);
  movies.splice(index, 1);

  fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to delete movie',
      });
    }

    res.status(204).json({
      status: 'success',
      message: "The movie with ID " + id + " has been deleted successfully",
    });
  });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

