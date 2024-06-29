const Navbar = () => {
    return (
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
          <div className="container px-4 mx-auto relative text-sm">
              <div className="flex justify-between items-center ">
                  <div className="flex items-center flex-shrink-0">
                      <a href="/" className="text-xl tracking-tight ">SEA Salon</a>
                  </div>
                  <ul className="hidden lg:flex ml-14 space-x-12">
                      <li>
                          <a href="/">Home</a>
                      </li>
                      <li>
                          <a href="/review">Review</a>
                      </li>
                      <li>
                          <a href="/reservation">Reservation</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
  
  export default Navbar