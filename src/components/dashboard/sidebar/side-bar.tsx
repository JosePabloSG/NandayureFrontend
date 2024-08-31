'use client';
import Link from 'next/link';
import React from 'react';
import NavLinks from './nav-links';
import Image from 'next/image';
import clsx from 'clsx';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import { useSidebarState } from '../../../store/dashboard/useSidebar';

const SideBar = () => {
  const isOpen = useSidebarState((state) => state.isOpen);
  const MenuIsOpen = useSidebarState((state) => state.MenuIsOpen);
  const MenuIsClose = useSidebarState((state) => state.MenuIsClose);

  return (
    <div className="flex h-full">
      <div
        className={clsx(
          'flex flex-col px-3 py-4 md:px-2 border rounded transition-all duration-300 ease-in-out',
          isOpen ? 'w-72' : 'w-28',
          'overflow-hidden',
        )}
      >
        <button
          onClick={isOpen ? MenuIsClose : MenuIsOpen}
          className="fixed top-2 left-3 z-50 p-2 bg-white rounded-md shadow-md"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? (
            <HiX size={24} className="h-6 w-6 text-gray-600" />
          ) : (
            <HiMenuAlt2 size={24} className="h-6 w-6 text-gray-600" />
          )}
        </button>

        <Link
          className="mb-2 flex h-20 items-center justify-center rounded-m p-4 md:h-40"
          href="/"
        >
          <Image src="/LogoMuni.png" alt="logo" width={100} height={100} />
        </Link>

        <div
          className={clsx(
            'flex grow flex-col space-y-2 transition-all duration-300 ease-in-out',
            isOpen ? 'opacity-100' : 'opacity-0',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <NavLinks isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;