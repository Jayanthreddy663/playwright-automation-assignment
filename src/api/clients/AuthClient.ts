import { APIRequestContext } from '@playwright/test';
import { API_CONSTANTS } from '../../data/apiConstants';

export class AuthClient {
  constructor(
    private request: APIRequestContext
  ) {}

  async getToken(): Promise<string> {
    const response = await this.request.post(
      `${API_CONSTANTS.BASE_URL}/auth`,
      {
        data: {
          username: API_CONSTANTS.AUTH.USERNAME,
          password: API_CONSTANTS.AUTH.PASSWORD
        }
      }
    );

    const body = await response.json();

    return body.token;
  }
}