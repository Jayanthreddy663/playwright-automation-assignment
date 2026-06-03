import { APIRequestContext } from '@playwright/test';
import { API_CONSTANTS } from '../../data/apiConstants';

export class BookingClient {
  constructor(
    private request: APIRequestContext
  ) {}

  async createBooking(payload: object) {
    return this.request.post(
      `${API_CONSTANTS.BASE_URL}/booking`,
      {
        data: payload
      }
    );
  }

  async getBooking(id: number) {
    return this.request.get(
      `${API_CONSTANTS.BASE_URL}/booking/${id}`
    );
  }

  async getBookings() {
    return this.request.get(
      `${API_CONSTANTS.BASE_URL}/booking`
    );
  }

  async updateBooking(
    id: number,
    token: string,
    payload: object
  ) {
    return this.request.put(
      `${API_CONSTANTS.BASE_URL}/booking/${id}`,
      {
        headers: {
          Cookie: `token=${token}`
        },
        data: payload
      }
    );
  }

  async patchBooking(
    id: number,
    token: string,
    payload: object
  ) {
    return this.request.patch(
      `${API_CONSTANTS.BASE_URL}/booking/${id}`,
      {
        headers: {
          Cookie: `token=${token}`
        },
        data: payload
      }
    );
  }

  async deleteBooking(
    id: number,
    token: string
  ) {
    return this.request.delete(
      `${API_CONSTANTS.BASE_URL}/booking/${id}`,
      {
        headers: {
          Cookie: `token=${token}`
        }
      }
    );
  }
}