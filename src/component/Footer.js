import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-[#222222]">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                    <img src="https://cdn0.iconfinder.com/data/icons/transportation-methods/128/motorcycle_orange-512.png" className="h-14 mr-3 rounded-full" alt="..." />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">MIDWESTMOTO</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="https://github.com/semihalperKeskin" target='_blank' className="mr-4 hover:underline md:mr-6 text-white">Github</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/salperkeskin/" target='_blank' className="mr-4 hover:underline md:mr-6 text-white">Linkedin</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-500 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Tüm hakları saklıdır.</span>
        </div>
    </footer>
  )
}

export default Footer