import { User } from "phosphor-react"

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

interface Record {
  id: string,
  event: string,
  user: string,
  day: string,
  timezone?: string,
  createdOn?: string,
}

interface UserConfig {
  firstName: string,
  lastName: string,
  email: string,
  hasMenstruationSupport: boolean,
  registeredOn: string,
}

interface User extends UserConfig{
  records: Record[],
}

interface DetailedRecord extends Record {
  eventDetails: Event
}


export type {
  Category,
  Event,
  User,
  UserConfig,
  Record,
  DetailedRecord,
}