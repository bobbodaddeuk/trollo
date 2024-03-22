import { SetMetadata } from '@nestjs/common';
import { CardWorker } from 'src/worker/types/worker.type';

export const WORKERS_KEY = 'workers';
export const Workers = (...workers: CardWorker[]) => SetMetadata(WORKERS_KEY, workers);
