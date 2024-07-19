import { Gender, Role, Status } from "./enums";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: Gender;
  profilePictureUrl: string;
  bio: string;
  websiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  status: Status;
  role: Role;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  facebookProfileUrl: string;
  twitterProfileUrl: string;
  linkedinProfileUrl: string;
  instagramProfileUrl: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Pokemon {
  id: number;
  name: string;
  type1?: string;
  type2?: string;
  image?: string;
  hp?: number;
  abilities?: string;
  attack?: string;
  defense?: string;
  speed?: string;
  specialAttack?: string;
  specialDefense?: string;
}
