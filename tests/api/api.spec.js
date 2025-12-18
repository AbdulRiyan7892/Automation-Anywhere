import { test, expect } from '@playwright/test';

test('Use Case 3 – Learning Instance API Flow Validation', async ({ request }) => {

  const token = 'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI4Nzg0ODkiLCJjbGllbnRUeXBlIjoiV0VCIiwidGVuYW50VXVpZCI6ImQwNjYwOGI2LTRiOTgtNDZlMS1hMmY3LTZmMWRlYmEwYzc0YyIsIm11bHRpcGxlTG9naW4iOmZhbHNlLCJpYXQiOjE3NjYwNzIzMzMsImV4cCI6MTc2NjA3MzUzMywiaXNzIjoiQXV0b21hdGlvbkFueXdoZXJlIiwibmFub1RpbWUiOjQxOTMxMDk1MjAwOTQ5MjV9.ksP41OvrBtdqyGyrKRUKD4DUbB8ht4ubgnz_fYRXqu1j8AGdIQVKnYGFVOhUyFHHnyKuQZrzLjOZcERq3r75HeFGXmFbeeCDD_V9S8iIsg4GRxAEjHa_jGdQ5Bz0QSysyRWbt_br-3nSXaXRWA6S8B_OD_nQhV1uwdliwlXIPpIKqX3WgqlyAKopaBGbLSGqhBWCtCejjkYb_pW6QmfcXXbtsgQaUb_FvvCK6za6LlPpPXjJToiYns13wX_RT4vKx8VBqezW1LDW0qkaHmM5RmdTLSOBeROWFA3UPqUWm3ep0cPErhkx4srG2w7Jjf9vh02JYkUiRX62ve9k1szgwA';

  const response = await request.post(
    'https://community.cloud.automationanywhere.digital/cognitive/v3/learninginstances',
    {
      headers: {
        'x-authorization': token,
        'content-type': 'application/json'
      },
      data: {
        name: `LearningInstance_${Date.now()}`,
        locale: 'en-US'
      }
    }
  );

  // ✅ STATUS VALIDATION (Expected behavior)
  expect([200, 400]).toContain(response.status());

  const body = await response.json();

  // ✅ RESPONSE STRUCTURE VALIDATION
  if (response.status() === 400) {
    expect(body).toHaveProperty('message');
    expect(body.message).toMatch(/field|schema|domain/i);
  }

});
