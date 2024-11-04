'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function DashboardFeature() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // Define the initial form values and validation schema
  const initialValues = {
    ticketName: '',
    description: '',
    price: 0,
    quantity: 1,
  };

  const validationSchema = Yup.object({
    ticketName: Yup.string().required('Ticket name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be at least 1')
      .integer('Quantity must be an integer'),
  });

  const handleSubmit = (values: any) => {
    console.log('Form submitted with values:', values);
    closeDialog(); // Close dialog on submit (you may want to handle this differently)
  };

  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <Image
        src={'/Artist.png'}
        layout="fill"
        alt='Image Not Found'
        objectFit="cover"
        quality={100}
        className='z-[0]'
      />
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white'>
        <button
          onClick={openDialog}
          className='mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300'
        >
          Generate Blink
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black rounded-lg p-6 w-80 shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Ticket Information</h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="ticketName" className="block text-white">Ticket Name</label>
                    <Field
                      type="text"
                      id="ticketName"
                      name="ticketName"
                      className="input input-bordered w-full p-2"
                    />
                    <ErrorMessage name="ticketName" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-white">Description</label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className="input input-bordered w-full p-2"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-white">Price</label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="input input-bordered w-full p-2"
                    />
                    <ErrorMessage name="price" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-white">Quantity</label>
                    <Field
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="input input-bordered w-full p-2"
                      min="1"
                    />
                    <ErrorMessage name="quantity" component="div" className="text-red-500" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </Form>
              )}
            </Formik>

            <button
              className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-300 mt-4"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
