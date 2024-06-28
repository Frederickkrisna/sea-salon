import Navbar from '../components/Navbar';
import yujin from "../assets/Yujin.png";
import Card from '../components/Card';

function Home() {
  return (
    <div className='flex flex-col mih-h-screen'>
      <Navbar />
        <div className="flex flex-grow flex-col bg-background bg-gradient-to-b from-black from-50% to-gray-500">
        <div className="flex flex-row items-center justify-center">
          <div className='flex justify-between'>
            <img src={yujin}/>
            <div>
            <h1 className="text-8xl text-primary mx-[14vh] mt-[24vh] whitespace-nowrap">SEA Salon</h1>
            <p className="text-sm font-medium text-primary mx-[15vh] mt-[2vh] whitespace-nowrap">
              “Beauty and Elegance Redefined”
            </p>
            </div>
          </div>
        </div>
        </div>

          <div className='relative mt-15 border-b bg-gray-200 mih-h-[800px]'>
            <div className='text-center'>
              <h2 className='text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide text-black'>Our Services</h2>
              <div className="flex justify-between items-center mx-[10vh] my-[10vh] mt-[10vh] ">
                <Card 
                  title="Card Title" 
                  description="This is a description of the card. It can be a brief introduction to the content of the card." 
                  imageUrl="https://via.placeholder.com/400x200" 
                />
                <Card 
                  title="Card Title" 
                  description="This is a description of the card. It can be a brief introduction to the content of the card." 
                  imageUrl="https://via.placeholder.com/400x200" 
                />
                <Card 
                  title="Card Title" 
                  description="This is a description of the card. It can be a brief introduction to the content of the card." 
                  imageUrl="https://via.placeholder.com/400x200" 
                />
              </div>
            </div>
          </div>

    </div>
  )
}

export default Home
