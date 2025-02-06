import  { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserData {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  dob: {
    date: string;
  };
  picture: {
    large: string;
  };
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative h-44 bg-gradient-to-r from-yellow-300 to-orange-400 flex items-center justify-center">
          <motion.img
            src={userData?.picture.large}
            alt="User"
            className="absolute -bottom-12 w-38 h-38 rounded-full border-4 border-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="pt-16 pb-6 px-6 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            {userData?.name.first} {userData?.name.last}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(userData?.dob.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>

          <motion.div
            className="mt-4 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="text-sm">{userData?.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Phone className="w-5 h-5 text-blue-500" />
              <span className="text-sm">{userData?.phone}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="text-sm">
                {userData?.location.street.number} {userData?.location.street.name},
                {userData?.location.city}, {userData?.location.state}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
