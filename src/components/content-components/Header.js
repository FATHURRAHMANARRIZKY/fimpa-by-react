// import { Button } from "antd";

const Header = () => {
  return (
    <div className="container relative w-full intro">
      {/* Background Image with Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="assets/intro1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Centered Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Fimpa</h1>
        <p className="text-lg md:text-xl mb-6">
        Your Pipes, Our Priority: Repair, Install, and Maintain with Care.
        </p>
        {/* <Button type="primary" size="large" className="bg-blue-500 border-none">
          Learn More
        </Button> */}
      </div>
    </div>
  );
};

export default Header;