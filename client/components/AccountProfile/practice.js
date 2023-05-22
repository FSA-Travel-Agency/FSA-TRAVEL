// import { useForm } from 'react-hook-form',
// import { zodResolver } from '@hookform/resolvers/zod',
// import { z } from 'zod',

// const schema = z.object({
//   firstName: z.string().min(1, { message: 'This is required*' }),
//   lastName: z.string().min(1, { message: 'This is required*' }),
//   practiceName: z.string().min(1, { message: 'This is required*' }),
//   npiNum: z.string().min(1, { message: 'This is required*' }),
//   tinNum: z.string().min(1, { message: 'This is required*' }),
//   licenseNum: z.string().min(1, { message: 'This is required*' }),
// }),

// export default function ProviderApplicationHome() {
//   const [page, setPage] = useState<number>(0),
//   const { register, handleSubmit, formState } = useForm({
//     defaultValues: {},
//     resolver: zodResolver(schema),
//   }),
//   const medplum = useMedplum(),

//   const { errors } = formState,
//   console.log(errors),

//   const onSubmit = async (data: {}) => {
//     console.log(data),
//   },

//   const pageDisplay = () => {
//     if (page === 0) {
//       return (
//         <ProviderApplication1
//           register={register}
//           setPage={setPage}
//           errors={errors}
//         />
//       ),
//     } else if (page === 1) {
//       return <ProviderApplication2 register={register} setPage={setPage} />,
//     }
//   },

//   return (
//     <div className='m-4'>
//       <h1 className='text-center text-xl font-bold uppercase tracking-widest'>
//         Provider Application
//       </h1>
//       <div className='mx-auto w-full max-w-[1000px] rounded-xl bg-white p-5 shadow-xl'>
//         <form onSubmit={handleSubmit(onSubmit)}>{pageDisplay()}</form>
//         {/* <input type='submit' /> */}
//       </div>
//     </div>
//   ),
// }

{
    /* <div className='flex items-center justify-center'>
    {page === 0 ? (
      <button
        onClick={() => setPage((curPage) => curPage + 1)}
        className='m-2 w-[20%] rounded-lg bg-beaconBackground p-2 text-white hover:text-gray-500'
      >
        Next
      </button>
    ) : (
      <div className='grid grid-cols-2 gap-4'>
        <button
          onClick={() => setPage((curPage) => curPage - 1)}
          className='m-2 w-full rounded-lg bg-beaconBackground p-2 text-white hover:text-gray-500'
        >
          Previous
        </button>
        <button
          onClick={() => setPage((curPage) => curPage + 1)}
          className='m-2 w-full rounded-lg bg-beaconBackground p-2 text-white hover:text-gray-500'
        >
          Next
        </button>
      </div>
    )}
  </div> */
  }

  




  // import React from 'react';

// export default function ProviderApplication1({
//   register,
//   setPage,
//   errors,
// }: any) {
//   return (
//     <div>
//       <div>
//         <div className='grid grid-cols-2 gap-8'>
//           <div className='grid grid-cols-1'>
//             <label htmlFor='firstName'>
//               First Name:{' '}
//               <span className='text-red-500'>{errors.firstName?.message}</span>
//             </label>
//             <input
//               required
//               type='text'
//               {...register('firstName', {
//                 required
//               })}
//               className='m-2 rounded-sm border border-gray-200 p-2'
//             />
//             <label htmlFor='practiceName'>
//               Name of Practice:{' '}
//               <span className='text-red-500'>
//                 {errors.practiceName?.message}
//               </span>
//             </label>
//             <input
//               type='text'
//               {...register('practiceName', {
//                 required
//               })}
//               className='m-2 rounded-sm border border-gray-200 p-2'
//             />
//             <label htmlFor='npiNum'>
//               NPI Number:{' '}
//               <span className='text-red-500'>{errors.npiNum?.message}</span>
//             </label>
//             <input
//               type='text'
//               {...register('npiNum', {
//                 required
//               })}
//               className='m-2 rounded-sm border border-gray-200 p-2'
//             />
//           </div>
//           <div className='grid grid-cols-1'>
//             <label htmlFor='lastName'>
//               Last Name:{' '}
//               <span className='text-red-500'>{errors.lastName?.message}</span>
//             </label>
//             <input
//               type='text'
//               {...register('lastName', {
//                 required
//               })}
//               className='m-2 rounded-sm border border-gray-200 p-2'
//             />
//             <label htmlFor='tinNum'>
//               TIN Number:{' '}
//               <span className='text-red-500'>{errors.tinNum?.message}</span>
//             </label>
//             <input
//               type='text'
//               {...register('tinNum', {
//                 required
//               })}
//               className='m-2 rounded-sm border border-gray-200 p-2'
//             />
//             <label htmlFor='licenseNum'>
//               License Number:{' '}
//               <span className='text-red-500'>{errors.licenseNum?.message}</span>
//             </label>
//             <input
//               type='text'
//               {...register('licenseNum', {
//                 required
//               })}
//               className='m-2 rounded-sm border border-gray-200 p-2'
//             />
//           </div>
//         </div>
//       </div>
//       <div className='flex items-center justify-center'>
//         <button
//           disabled={Object.keys(errors).length >= 1}
//           onClick={() => setPage((curPage: any) => curPage + 1)}
//           className='m-2 w-[20%] rounded-lg bg-beaconBackground p-2 text-white hover:text-gray-500'
//         >
//           <input type='submit' disabled={Object.keys(errors).length >= 1} />
//         </button>
//         {/* <input
//           className='m-2 w-[20%] rounded-lg bg-beaconBackground p-2 text-white hover:text-gray-500'
//           type='submit'
//           value='Next'
//         /> */}
//       </div>
//     </div>
//   );
// }





// import React from 'react';

// export default function ProviderApplication2({ register, setPage }: any) {
//   return (
//     <div>
//       ProviderApplication2
//       <label htmlFor='tinNum'>TIN Number:</label>
//       <input
//         type='text'
//         {...(register('lastName'),
//         {
//           required: true,
//         })}
//         className='m-2 rounded-sm border border-gray-200 p-2'
//       />
//       {/* <input type='submit' /> */}
//       <div className='grid grid-cols-2 place-items-center'>
//         <button
//           onClick={() => setPage((curPage: any) => curPage - 1)}
//           className='m-2 w-[40%] rounded-lg bg-beaconBackground p-2 text-white hover:text-gray-500'
//         >
//           Previous
//         </button>
//         <button className='m-2 w-[40%] rounded-lg bg-beaconBackground p-2 text-white hover:text-gray-500'>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
