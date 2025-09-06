import { feathers } from '@feathersjs/feathers';
import { describe, it, expect } from 'vitest';
import sync, { SYNC } from '../lib';

describe('feathers-sync tests', () => {
  it('exports db adapters', () => {
    expect(typeof sync).toBe('function');
    expect(sync.redis).toBeTruthy();
    expect(sync.amqp).toBeTruthy();
  });

  it('throws an error when uri is missing', () => {
    expect(() => {
      feathers().configure(sync({} as any));
    }).toThrow(/A `uri` option with the database connection string has to be provided/);
  });

  it('throws an error for invalid adapter', () => {
    expect(() => {
      feathers().configure(sync({
        uri: 'something://localhost'
      }));
    }).toThrow(/something is an invalid adapter/);
  });

  it('exports SYNC symbol', () => {
    expect(typeof SYNC).not.toBe('undefined');
  });
});
