const workerService = require('../services/worker.service');

function addRoutes(app) {
  app.get('/api/worker/', (req, res) => {
    workerService.query()
      .then(workers => res.json(workers))
      .catch(error => console.error('An error occurred', error))
  });

  
  app.delete('/api/worker/:workerId', (req, res) => {
    const workerId = req.params.workerId;
    workerService.remove(workerId)
      .then(() => res.end())
      .catch(error => console.error('An error occurred', error))
  });

  app.post('/api/worker', (req, res) => {
    const worker = req.body;
    console.log('worker', worker);
    workerService.add(worker)
      .then(worker => { res.json(worker); })
      .catch(error => console.error('An error occurred', error))
  });

  app.put('/api/worker/:workerId', (req, res) => {
    const worker = req.body;
    workerService.update(worker)
      .then(worker => res.json(worker))
      .catch(error => console.error('An error occurred', error))
  });

}

module.exports = addRoutes;
