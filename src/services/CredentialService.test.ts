// getUTCDate.test.ts

import { getUTCDate } from './CredentialService'; // Adjust the import path as necessary

describe('getUTCDate', () => {
  it('should return current date in ISO 8601 format if timestamp is null', () => {
    const currentDate = new Date().toISOString();
    const result = getUTCDate(null);
    // Only compare the date part to avoid test failures due to milliseconds difference
    expect(result.substring(0, 19)).toBe(currentDate.substring(0, 19));
  });

  it('should return current date in ISO 8601 format if timestamp is 0', () => {
    const currentDate = new Date().toISOString();
    const result = getUTCDate(0);
    // Only compare the date part to avoid test failures due to milliseconds difference
    expect(result.substring(0, 19)).toBe(currentDate.substring(0, 19));
  });

  it('should return the correct date in ISO 8601 format for a valid timestamp', () => {
    const timeStamp = 1627776000000; // Example timestamp
    const expectedDate = new Date(timeStamp).toISOString();
    const result = getUTCDate(timeStamp);
    expect(result).toBe(expectedDate.split(".")[0] + 'Z');
  });
});
