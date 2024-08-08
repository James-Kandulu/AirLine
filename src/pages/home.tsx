import { useState } from 'react';
import { FormEvent } from 'react';
import QRCode from 'qrcode.react';
import { supabase } from '../client';
import './home.css'; // Import your CSS file

const Home = () => {
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    bags: '',
    ticket_number: '',
    destination: '',
    bag_details: '',
  });
  const [qrData, setQrData] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Generate QR code data from form values
    const qrValue = JSON.stringify(formValues);
    setQrData(qrValue);

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('air_luggage')
      .insert([
        {
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          email: formValues.email,
          bags: parseInt(formValues.bags, 10),
          ticket_number: formValues.ticket_number,
          destination: formValues.destination,
          bag_details: formValues.bag_details,
        },
      ]);

    // Handle response
    if (error) {
      console.error('Error inserting data:', error);
    } else if (data && data) {
      console.log('Data inserted successfully:', data);
    } else {
      console.warn('No data returned after insert.');
    }
  };

  return (
    <section className="background-container h-auto lg:px-24 px-10 py-10">
      <div className="relative z-10">
        <h1 className="text-xl font-semibold mb-4 text-center text-white">LUGGAGE REGISTER</h1>
        <form onSubmit={handleSubmit} method="post" className="py-5 w-full max-w-md space-y-4 mx-auto bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="mb-1 font-medium">Firstname</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={formValues.firstname}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname" className="mb-1 font-medium">Lastname</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={formValues.lastname}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="bags" className="mb-1 font-medium">Bags</label>
                <input
                  id="bags"
                  type="number"
                  name="bags"
                  placeholder="Bags"
                  min={1}
                  value={formValues.bags}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="ticket_number" className="mb-1 font-medium">Ticket Number</label>
                <input
                  id="ticket_number"
                  type="text"
                  name="ticket_number"
                  placeholder="Ticket Number"
                  value={formValues.ticket_number}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="destination" className="mb-1 font-medium">Destination</label>
              <input
                id="destination"
                type="text"
                name="destination"
                placeholder="Destination"
                value={formValues.destination}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bag_details" className="mb-1 font-medium">Bag Details</label>
              <input
                id="bag_details"
                type="text"
                name="bag_details"
                placeholder="Bag Details"
                value={formValues.bag_details}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition duration-300"
          />
        </form>

        {qrData && (
          <div className="mt-10 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">QR Code for Your Data:</h2>
              <QRCode value={qrData} size={256} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
