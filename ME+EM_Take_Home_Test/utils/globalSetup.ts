import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

async function globalSetup(config: FullConfig): Promise<void> {
    dotenv.config({
        path: '.env.env',
        override: true
    });
}

export default globalSetup;