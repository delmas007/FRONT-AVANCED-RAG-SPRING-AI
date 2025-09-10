export interface Utilisateur2 {
  username: string;
  password?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  roles: string[];
  bearer: string;
  isAuthenticated: boolean;
  fileUploaded: boolean;
}