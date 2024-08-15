export interface AuthResponse {
    idToken: string;
    email: string;
    resfreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }