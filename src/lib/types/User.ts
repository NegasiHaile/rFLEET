export enum UserType {
  ShippingCompanyOrEmployee = 0,
  TruckCompanyOwnerOperator = 1,
  VendorsAndServices = 2,
  PassengerVehicleDrivers = 3,
  AgentsBrokersAndFreightForwarders = 4
}

export interface CreateUser {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  userType: UserType
}
