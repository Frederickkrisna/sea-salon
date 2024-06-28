const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Contact Us :</h2>
            <ul>
              <li className="mb-2">
                <span className="text-gray-400">○ Thomas</span><br />
                <span className="ml-4">Phone Number : <a href="tel:08123456789" className="text-blue-300 hover:text-blue-500">08123456789</a></span>
              </li>
              <li className="mb-2">
                <span className="text-gray-400">○ Sekar</span><br />
                <span className="ml-4">Phone Number : <a href="tel:08164829372" className="text-blue-300 hover:text-blue-500">08164829372</a></span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Opening Hours :</h2>
            <ul>
              <li className="mb-2">
                Monday - Friday : 9 AM - 6 PM
              </li>
              <li className="mb-2">
                Saturday : 10 AM - 4 PM
              </li>
              <li className="mb-2">
                Sunday : Closed
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SEA Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
