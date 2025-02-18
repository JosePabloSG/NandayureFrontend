import {
  Clock,
  Folder,
  Home,
  LucideIcon,
  PanelTopOpen,
  SquarePen,
  UserCheck,
} from 'lucide-react';

export interface SubLink {
  href: string;
  label: string;
  dataCy?: string;
}

export interface NavLink {
  href: string;
  icon: LucideIcon;
  label: string;
  dataCy?: string;
  subLinks?: Record<string, SubLink>;
}

export const baseNavLinks: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
    dataCy: 'sidebar-dashboard-home',
  },
  gestionDocumentos: {
    href: '/document-management/digital-files',
    icon: Folder,
    label: 'Documentos digitales',
    dataCy: 'sidebar-dashboard-digital-documents',
  },
  gestionSolicitudes: {
    href: '/request-management',
    icon: UserCheck,
    label: 'Gestión de solicitudes',
    dataCy: 'sidebar-dashboard-request-management',
  },
  Solicitudes: {
    href: '/request',
    icon: SquarePen,
    label: 'Solicitudes',
    dataCy: 'sidebar-dashboard-requests',
    subLinks: {
      solicitudVacaciones: {
        href: '/request/vacation-request',
        label: 'Solicitud de vacaciones',
        dataCy: 'sidebar-dashboard-vacation-request',
      },
      boletaPago: {
        href: '/request/pay-slip',
        label: 'Boleta de pago',
        dataCy: 'sidebar-dashboard-pay-slip',
      },
      constanciaSalarial: {
        href: '/request/salary-certificate',
        label: 'Constancia salarial',
        dataCy: 'sidebar-dashboard-salary-certificate',
      },
    },
  },
  miSolicitudes: {
    href: '/request-management/my-requests',
    icon: PanelTopOpen,
    label: 'Mis solicitudes',
    dataCy: 'sidebar-dashboard-my-requests',
  },
  controlMarcas: {
    href: '/time-tracking',
    icon: Clock,
    label: 'Control de marcas',
    dataCy: 'sidebar-dashboard-time-tracking',
  },
  miExpediente: {
    href: '/my-file',
    icon: Folder,
    label: 'Mis Documentos',
    dataCy: 'sidebar-dashboard-my-documents',
  },
};

// The navLinks are structured for each role by extracting from the base object.
export const navLinksRH: Record<string, NavLink> = {
  home: baseNavLinks.home,
  miExpediente: baseNavLinks.miExpediente,
  gestionDocumentos: baseNavLinks.gestionDocumentos,
  gestionSolicitudes: baseNavLinks.gestionSolicitudes,
  Solicitudes: baseNavLinks.Solicitudes,
  miSolicitudes: baseNavLinks.miSolicitudes,
  controlMarcas: baseNavLinks.controlMarcas,
};

export const navLinksUser: Record<string, NavLink> = {
  home: baseNavLinks.home,
  miExpediente: baseNavLinks.miExpediente,
  Solicitudes: baseNavLinks.Solicitudes,
  miSolicitudes: baseNavLinks.miSolicitudes,
};

export const navLinksVA: Record<string, NavLink> = {
  home: baseNavLinks.home,
  miExpediente: baseNavLinks.miExpediente,
  gestionSolicitudes: baseNavLinks.gestionSolicitudes,
  Solicitudes: baseNavLinks.Solicitudes,
  miSolicitudes: baseNavLinks.miSolicitudes,
};
