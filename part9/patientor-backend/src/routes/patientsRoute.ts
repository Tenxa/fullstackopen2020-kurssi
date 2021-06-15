import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, parseEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entryBody = parseEntry(req.body);
  res.send(patientsService.addEntryToPatient(req.params.id, entryBody));
});

export default router;