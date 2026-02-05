import { ProfessionalProfile } from './types';
import * as fs from 'fs';
import * as path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'profile.json');

function loadProfile(): ProfessionalProfile {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      throw new Error(`Profile data file not found at ${DATA_PATH}`);
    }
    const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error loading profile data from ${DATA_PATH}:`, error);
    throw error;
  }
}

export const professionalProfile: ProfessionalProfile = loadProfile();
