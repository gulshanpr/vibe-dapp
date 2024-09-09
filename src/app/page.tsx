import { Login } from "./login";
export default function Home() {

  return (
    <div className="grid grid-cols-2 h-[vh]">

     <div className="flex flex-col justify-center items-center mb-2">

      <h1 className="text-[10rem] pt-[6rem] font-medium text-[#7400c3] ">VIBE<span className="text-[8rem] pt-[6rem] font-custom2 text-black" >check.</span></h1>
      <p className="text-[5rem] font-bold">so Loud.</p>
      <p className="text-[5rem] font-thin mb-2">so Quite.</p>

      
      <Login/>
      
     

     </div>


     <div className="flex justify-center items-center mt-11 ">
      <img className="rounded-xl" src="images/Drawing Faces.jpeg" alt="" />
     </div>
        
     
      


    </div>
  );
}
