import type { User as AltogicUser } from "altogic";

export type Prediction = {
  _id: string;
  id: string;
  version: string;
  urls: {
    get: string;
    cancel: string;
  };
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  input: {
    image: string;
  };
  output: string;
  error: null;
  logs: null;
  metrics: {};
  user: User;
  originalImage: string;
};

export interface PredictionWithAvatar extends Prediction {
  avatar: Avatar;
}

export interface User extends AltogicUser {
  credit: number;
}

export interface Plan {
  _id: string;
  price: number;
  credit: number;
  name: string;
  stripePriceId: string;
  stripeProductId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  amount: number;
  plan: Plan;
  user: User;
  paymentNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginateData {
  count?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
}
export interface Avatar {
  _id: string;
  user: User;
  avatarURL: string;
  prediction: Prediction;
  createdAt: string;
  updatedAt: string;
}
