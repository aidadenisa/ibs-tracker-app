interface Category {
  id: string, 
  name: string,
  code: string,
  events? : Event[]
}
interface Event {
  id: string,
  name: string,
  category_code: string,
  code: string,
}

interface UserRecord {
  id: string,
  event: Event,
  user: User,
  date: string,
}

interface NewRecord {
  eventId: string,
}

interface User {
  firstName: string,
  lastName: string,
  email: string,
  hasMenstruationSupport: boolean,
  registeredOn: string,
  records: UserRecord[],
}

export type {
  Category,
  Event,
  UserRecord,
  NewRecord,
  User
}