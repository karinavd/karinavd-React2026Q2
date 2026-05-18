import Back from './Back';

const About = () => {
  return (
    <div>
      <div className="min-h-screen bg-[#131212] text-white p-10 flex flex-col w-full">
        <Back />
        <div className="w-full flex flex-col  items-center ">
          <h1 className="text-4xl font-bold mb-6">About the application</h1>
          <div className=" p-6">
            <p className="text-xl mb-4">
              <b>Author:</b> Karyna
            </p>
            <p className="text-xl mb-4">
              <b>Github:</b>{' '}
              <a
                href="https://github.com/karinavd"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                karinavd
              </a>
            </p>
            <p className="text-xl">
              <b>Course: </b>
              <a
                href="https://app.rs.school/course/student/dashboard?course=react-2026-q2"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                RS School React Course
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
