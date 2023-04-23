var express = require('express');
var router = express.Router();

const mockData = [
  { id: 1, name: 'Anna', timestamp: '2023-04-20T12:34:56Z', severity: 'low' },
  { id: 2, name: 'John', timestamp: '2023-04-19T10:23:45Z', severity: 'medium' },
  { id: 3, name: 'Alice', timestamp: '2023-04-18T08:12:34Z', severity: 'high' },
  { id: 4, name: 'Adam', timestamp: '2023-04-17T06:01:23Z', severity: 'medium' },
  { id: 5, name: 'Victor', timestamp: '2023-04-16T04:50:12Z', severity: 'low' },
  { id: 6, name: 'David', timestamp: '2023-04-15T02:39:01Z', severity: 'medium' },
  { id: 7, name: 'George', timestamp: '2023-04-14T00:27:50Z', severity: 'high' },
  { id: 8, name: 'Martin', timestamp: '2023-04-13T22:16:39Z', severity: 'medium' },
  { id: 9, name: 'Grace', timestamp: '2023-04-12T20:05:28Z', severity: 'low' },
  { id: 10, name: 'Harry', timestamp: '2023-04-11T17:54:17Z', severity: 'medium' },
  { id: 11, name: 'Vicky', timestamp: '2023-04-10T15:43:06Z', severity: 'high' },
  { id: 12, name: 'Jack', timestamp: '2023-04-09T13:31:55Z', severity: 'medium' },
];

/* GET home page. */
router.get('/events', function(req, res, next) {
  res.status(200).json(mockData);
});

router.post('/events/ignore', function(req, res, next) {
  try {
    if(!req.body.id) {
      return res.status(400).json({ error: 'Bad Request' })
    }
    res.status(200).json({id: req.body.id})
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }
});

router.post('/events/report', function(req, res, next) {
  try {
    if(!req.body.id) {
      return res.status(400).json({ error: 'Bad Request' })
    }
    res.status(200).json({id: req.body.id})
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }
});

module.exports = router;
