import { test, expect } from '@playwright/test';
import { AuthClient } from '../../src/api/clients/AuthClient';
import { BookingClient } from '../../src/api/clients/BookingClient';
import { BookingSchema } from '../../src/api/schemas/BookingSchema';
import { bookingPayloads } from '../../src/api/payloads/bookingPayloads';

test('create read update delete flow', async ({ request }) => {
  const authClient = new AuthClient(request);
  const bookingClient = new BookingClient(request);

  const token = await authClient.getToken();

  const payload = bookingPayloads.create();

  const createResponse = await bookingClient.createBooking(payload);
  const createBody = await createResponse.json();
  BookingSchema.parse(createBody.booking);

  const bookingId = createBody.bookingid;

  const readResponse = await bookingClient.getBooking(bookingId);

  expect(readResponse.status()).toBe(200);
  const readBody = await readResponse.json();
  BookingSchema.parse(readBody);

  const updatePayload = bookingPayloads.updated();

  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    token,
    updatePayload
  );

  expect(updateResponse.status()).toBe(200);
  const updatedBody = await updateResponse.json();
  BookingSchema.parse(updatedBody);

  const deleteResponse = await bookingClient.deleteBooking(
    bookingId,
    token
  );

  expect(deleteResponse.status()).toBe(201);

  const getResponse = await bookingClient.getBooking(bookingId);

  expect(getResponse.status()).toBe(404);
});