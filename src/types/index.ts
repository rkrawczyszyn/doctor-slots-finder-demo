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

export interface Metadata {
  updatedOn: string;
}

export interface Result {
  metadata: Metadata;
  slots: DoctorSlot[];
}
