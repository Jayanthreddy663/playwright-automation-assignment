export const bookingPayloads = {
  create(): Record<string, unknown> {
    return {
      firstname: 'John',
      lastname: 'Smith',
      totalprice: 500,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-06-01',
        checkout: '2026-06-10'
      },
      additionalneeds: 'Breakfast'
    };
  },

  updated(): Record<string, unknown> {
    return {
      ...bookingPayloads.create(),
      firstname: 'Alex'
    };
  },

  patch() {
    return {
      firstname: 'Patched'
    };
  },

  malformed() {
    return {
      firstname: 123
    };
  }
};