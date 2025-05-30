export const ROUTES = {
  AUTH: {
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHECK_EMAIL: '/auth/check-email',
    CHECK_ID: '/auth/check-id',
    SESSION_VALIDATION: '/auth/me',
  },
  EMPLOYEES: {
    BASE: '/employees',
    BY_ID: (employeeId: number) => `/employees/${employeeId}`,
    UPDATE_JOB_POSITION: (employeeId: number) => `/employees/updateEmployeeJobPosition/${employeeId}`,
    DELETE: (employeeId: number) => `/employees/${employeeId}`,
    GET_DELETED: '/employees/deleted',
    RESTORE: (employeeId: number) => `/employees/restore/${employeeId}`,
  },
  ANALYTICS: {
    BASE: '/analitics',
    REQUESTS_SUMMARY: '/analitics/requestsSummary',
    DATES_WITH_REQUESTS: '/analitics/DatesWithRequests',
    EMPLOYEES_WITH_MOST_REQUESTS: '/analitics/employeesWithMostRequests',
    PEAK_REQUEST_TIMES: '/analitics/peak-request-times',
  },
  FAQS: {
    BASE: '/faqs',
    BY_ID: (id: number) => `/faqs/${id}`,
  },
  FAQ_CATEGORIES: {
    BASE: '/faq-categories',
    BY_ID: (id: number) => `/faq-categories/${id}`,
  },
  GOOGLE_DRIVE: {
    USER_FILES: (folderId: string) =>
      `/google-drive-files/MyFilesByFolder/${folderId}`,
    EMPLOYEE_FILES: (folderId: string) =>
      `/google-drive-files/FilesByFolder/${folderId}`,
    FILE_VIEW: (fileId: string) => `/google-drive-files/getFile/${fileId}`,
    UPLOAD: '/google-drive-files/upload',
    DELETE: (fileId: string) => `/google-drive-files/deleteFile/${fileId}`,
    FILES_BY_EMPLOYEE: (employeeId: number) =>
      `/google-drive-files/EmployeeFolders/${employeeId}`,
    MY_FOLDERS: '/google-drive-files/MyFolders',
  },
  PAY_SLIP: {
    BASE: '/request-payment-confirmations',
  },
  VACATION: {
    BASE: '/request-vacation',
  },
  SALARY_CERTIFICATES: {
    GET: '/salary-certificates',
    POST: '/request-salary-certificates',
  },
  REQUESTS: {
    BASE: '/requests',
    BY_EMPLOYEE: `/requests/MyRequests`,
    CURRENT_TO_APPROVE: '/request-approvals/currentToApprove',
    APPROVAL: (id: number) => `/request-approvals/${id}`,
    CANCELLED: (id: number) => `/requests/CancelRequest/${id}`,
  },
  ANNUITIES: {
    BASE: '/annuities',
    BY_ID: (annuityId: number) => `/annuities/${annuityId}`,
  },
  BUDGET_CODES: {
    BASE: '/budget-codes',
    BY_ID: (budgetCodeId: number) => `/budget-codes/${budgetCodeId}`,
  },
  CIVIL_STATUS: {
    BASE: '/marital-status',
    BY_ID: (civilStatusId: number) => `/marital-status/${civilStatusId}`,
  },
  DEPARTMENT_PROGRAMS: {
    BASE: '/department-programs',
    BY_ID: (departmentProgramId: number) =>
      `/department-programs/${departmentProgramId}`,
  },
  DEPARTMENTS: {
    BASE: '/departments',
    BY_ID: (departmentId: number) => `/departments/${departmentId}`,
    UPDATE_HEAD: (head: number) => `/departments/updateDepartmentHead/${head}`,
    EMPLOYEES: (departmentId: number) =>
      `/employees/allByDepartment/${departmentId}`,
  },
  FINANCIAL_INSTITUTIONS: {
    BASE: '/financial-institutions',
    BY_ID: (financialInstitutionsId: number) =>
      `/financial-institutions/${financialInstitutionsId}`,
  },
  GENDERS: {
    BASE: '/genders',
    BY_ID: (genderId: number) => `/genders/${genderId}`,
  },
  JOB_POSITIONS: {
    BASE: '/job-positions',
    BY_ID: (jobPositionId: number) => `/job-positions/${jobPositionId}`,
  },
  STUDIES: {
    BASE: '/studies',
    BY_ID: (studyId: number) => `/studies/${studyId}`,
  },
  STUDIES_CATEGORY: {
    BASE: '/studies-category',
    BY_ID: (studiesCategoryId: string) =>
      `/studies-category/${studiesCategoryId}`,
  },
  TYPE_FINANCIAL_INSTITUTIONS: {
    BASE: '/type-financial-institutions',
    BY_ID: (id: number) => `/type-financial-institutions/${id}`,
  },
  HOLIDAYS: {
    BASE: '/holidays',
    BY_ID: (id: number) => `/holidays/${id}`,
  },
  USERS: {
    CHANGE_USER_STATUS: '/auth/changeUserStatus',
    ALL_USERS: '/auth/getAllUsersWithFilters',
  },
  ROLES_MANAGEMENT: {
    BASE: '/roles',
    ADD_ROLE_TO_USER: '/auth/addRoleToUser',
    REMOVE_ROLE_FROM_USER: '/auth/removeRoleToUser',
  },
};
