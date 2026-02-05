#!/usr/bin/env node

import { ProfessionalProfileServer } from './server';

const server = new ProfessionalProfileServer();
server.run().catch(console.error);
