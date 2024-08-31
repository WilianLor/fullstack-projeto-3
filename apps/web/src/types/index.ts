export interface Domain {
  _id: string;
  domain: string;
  createdAt: Date;
  user: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data: T;
}
