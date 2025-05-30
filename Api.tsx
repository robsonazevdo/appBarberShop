import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = 'http://192.168.0.83:5000'; // Exemplo real de IP local
//const BASE_API = 'http://192.168.1.94:5000';

type SignInResponse = {
  token?: string;
  data?: {
    avatar: string;
    [key: string]: any;
  };
  error?: string;
};

type SignUpResponse = {
  [x: string]: any;
  token?: string;
  error?: string;
};

type CheckTokenResponse = {
  token?: string;
  data?: {
    avatar: string;
    [key: string]: any;
  };
  error?: string;
};

type Appointment = {
  id: number;
  barber_id: number;
  service: string;
  datetime: string;
};

type AppointmentResponse = {
  data(data: any): unknown;
  success?: boolean;
  appointment?: Appointment;
  appointments?: Appointment[];
  error?: string;
};

type GetBarbersResponse = any; // Tipar melhor se tiver estrutura definida

const Api = {
  checkToken: async (token: string): Promise<CheckTokenResponse> => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    const json = await req.json();
    return json;
  },

  signIn: async (email: string, password: string): Promise<SignInResponse> => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const json = await req.json();
    return json;
  },

  signUp: async (name: string, email: string, password: string): Promise<SignUpResponse> => {
    const req = await fetch(`${BASE_API}/auth/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await req.json();
    return json;
  },

  logout: async (): Promise<SignUpResponse> => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token})
    });
    const json = await req.json();
    return json;
  },

  getBarbers: async (
    lat: number | null = null,
    lng: number | null = null,
    loc: string | null = null
  ): Promise<GetBarbersResponse> => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&loc=${loc}`);
    const json = await req.json();
    return json;
  },

    getAllBarbers: async ( ): Promise<GetBarbersResponse> => {
    const token = await AsyncStorage.getItem('token');
    
    const req = await fetch(`${BASE_API}/barbers/all`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });;
    const json = await req.json();
    return json;
  },

  getBarbersName: async (name: string): Promise<GetBarbersResponse> => { 
  const token = await AsyncStorage.getItem('token');

  const req = await fetch(`${BASE_API}/barbers/search?token=${token}&name=${encodeURIComponent(name)}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const json = await req.json();
  return json;
},

  getBarber: async (id: number | null = null): Promise<GetBarbersResponse> => {
  const token = await AsyncStorage.getItem('token');
  const req = await fetch(`${BASE_API}/barber/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  return json;
},


setFavorite: async (barberId: number | null = null): Promise<GetBarbersResponse> => {
  const token = await AsyncStorage.getItem('token');

  const req = await fetch(`${BASE_API}/auth/favorite`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ barber: barberId }) 
  });

  const json = await req.json();
  return json;
},

getFavorites: async (): Promise<GetBarbersResponse> => {
  const token = await AsyncStorage.getItem('token');

  const req = await fetch(`${BASE_API}/auth/favorites`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  return json;
},

getFavorited: async (barberId: number | null = null): Promise<GetBarbersResponse> => {
  const token = await AsyncStorage.getItem('token');

  const req = await fetch(`${BASE_API}/auth/favorited?barber=${barberId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  const json = await req.json();
  return json;
},





createAppointment: async (
  barber_id: number,
  service: string,
  datetime: string
): Promise<AppointmentResponse> => {
  const token = await AsyncStorage.getItem('token');
  const req = await fetch(`${BASE_API}/appointments`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ barber_id, service, datetime })
  });

  const json = await req.json();
  return json;
},



getAppointments: async (): Promise<AppointmentResponse> => {
  const token = await AsyncStorage.getItem('token');

  const req = await fetch(`${BASE_API}/appointments`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  return json;
},


cancelAppointment: async (appointmentId: number): Promise<any> => {
  const token = await AsyncStorage.getItem('token');

  const req = await fetch(`${BASE_API}/appointments/${appointmentId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  return json;
},





};

export default Api;