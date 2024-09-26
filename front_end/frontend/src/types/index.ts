export interface Bike {
    id: number;
    type: string;
    status: string;
  }
  
  export interface Unidade { 
    id: number;
    nameUnidade: string;
    endereco: string;
    bikes: Bike[];
  }
  
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    bikes: Bike[];
    role: {
      name: string;
    };
  }
  
  // Definir a interface para os dados do formulário
 export interface RegisterForm {
    email: string;
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: string;
  }