import { Router, Request, Response, NextFunction } from 'express';
import { getCaseTracker } from '../services/casetrackerService';  // Import getCaseTrackers function from casetrackerService
const router = Router();

// Handle GET request to fetch profiles

router.get('/get-case-tracker', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles = await getCaseTracker();  // Get profiles from the database
    res.status(200).json(profiles);  // Return profiles as JSON response
  } catch (error) {
    next(error);
  }
});

export default router;
