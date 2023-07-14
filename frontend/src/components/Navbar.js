import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openUser, setOpenUser] = useState(false)


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const actions = [
    { name: 'All cars', href: '/' },
    { name: 'Create car', href: '#' },
  ]

  return (
    <header className="bg-white border-b">
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-14" aria-label="Global">
        <div className="flex flex-1">
            <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only text-indigo-500">Car app company</span>
                <img
                    className="mx-auto h-10 w-auto"
                    src="/favicon.ico"
                    alt="Car app company"
                />          
            </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open user menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
            All Candidates
          </a>
          <a href="/newCandidate" className="text-sm font-semibold leading-6 text-gray-900">
            Add candidate
          </a>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-8 z-10 mt-3 w-[200px] max-w-md overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5">
                <div>
                    <p
                      /* onClick={handleLogout} */
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-indigo-100"
                    >
                      Log out
                    </p>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only text-indigo-500">Candidate app</span>
                  <img
                      className="mx-auto h-10 w-auto"
                      src="/favicon.ico"
                      alt="Candidate app"
                  />          
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6">
              <div className="-my-6 divide-y divide-gray-500/10 flex flex-col justify-end">
                <div className="space-y-2 py-6 text-base font-bold leading-7 text-gray-900">
                  Candidates
                  <a
                    href="/"
                    className="block rounded-lg px-5 py-2 mt-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    All candidates
                  </a>
                  <a
                    href="/newCar"
                    className="block rounded-lg px-5 py-2 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Add candidate
                  </a>
                </div>
                <div className="space-y-2 py-6 text-base font-bold leading-7 text-gray-900">
                  User
                  <a
                    href="/logout"
                    className="block rounded-lg px-5 py-2 mt-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </nav>
    </header>
  )
}