export interface DoctorSlot {
  start: string;
  doctor_id: number;
  booked: boolean;
  _links: {
    address: {
      href: string;
      method: string;
    };
  };
}

export interface DoctorDetail {
  id: number;
  displayName: string;
  addressId: number;
}
