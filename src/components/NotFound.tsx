import Back from './Back';

const NotFound = () => {
  return (
    <div className="w-full h-screen bg-black text-white p-10 ">
      <Back />
      <div className="flex flex-col items-center h-full justify-center gap-4">
        <h1 className="text-7xl font-bold mb-6">404</h1>
        <p className="text-3xl mb-4">Page not found</p>
        <p className="text-lg">The page you are looking for does not exist</p>
      </div>
    </div>
  );
};

export default NotFound;
