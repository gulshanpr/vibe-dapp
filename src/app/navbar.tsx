import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className=" flex ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                VIBE<span className='text-black font-custom'>check</span>
              </Link>
            </div>
           </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar