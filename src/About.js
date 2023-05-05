import Herosection from "./components/Herosection";


const About = () => {
//   const { Myname } = useProductContext();

  const data = {
    name: "E-Commerce",
  };
  return (
    <>
      
      <Herosection mydata={data} />
    </>
  );
};

export default About;
