import Navbar from '../components/Navbar';
import yujin from "../assets/Yujin.png";
import Card from '../components/Card';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className='flex flex-col mih-h-screen'>
      <Navbar />
        <div className="flex flex-grow flex-col bg-background bg-gradient-to-b from-black from-20% to-background">
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

          <div className='relative mt-15 border-b bg-gray-400 mih-h-[800px]'>
            <div className='text-center mt-[15vh]'>
              <h2 className='text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide text-black'>Our Services</h2>
              <div className="flex justify-between items-center mx-[10vh] my-[10vh] mt-[10vh] mb-[20vh]">
                <Card 
                  title="Haircuts and Styling" 
                  description="Experience the latest trends and classic styles with our expert haircuts and styling services. Whether you want a bold new look or just a trim, our stylists will ensure you leave looking and feeling your best." 
                  imageUrl="https://res.cloudinary.com/mergernetwork/image/upload/w_500,h_200,c_limit,f_auto/posts/548121F3-F705-4E45-B8643551AF8E130C.jpg" 
                />
                <Card 
                  title="Manicure and Pedicure" 
                  description="Pamper yourself with our luxurious manicure and pedicure services. From classic treatments to the latest nail art trends, we ensure your hands and feet look their best." 
                  imageUrl="https://static.wixstatic.com/media/793c84_9dbcf359cce74133bfe3fbb2f3caa3e3~mv2.jpg/v1/fill/w_400,h_200,al_c,q_80/793c84_9dbcf359cce74133bfe3fbb2f3caa3e3~mv2.jpg" 
                />
                <Card 
                  title="Facial Treatments" 
                  description="Rejuvenate your skin with our professional facial treatments. Using high-quality products, we tailor each session to meet your skin's unique needs for a radiant glow." 
                  imageUrl="https://static.vecteezy.com/system/resources/thumbnails/044/558/907/small/skin-care-cosmetic-procedures-for-facial-care-photo.jpeg" 
                />
              </div>
            </div>
          </div>
          <Footer />
    </div>
  )
}

export default Home
