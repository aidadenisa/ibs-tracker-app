// NOTE: THE PROPS WITH __ IN FRONT ARE ONLY USED IN THE FRONTEND (NOT FROM THE DB)
interface Category {
  id: string, 
  name: string,
  code: string,
  events : Event[]
}
interface Event {
  id: string,
  name: string,
  category_code: string,
  code: string,
  __selected: boolean,
}

interface UserRecord {
  id: string,
  event: string,
  user: string,
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
  User,
}