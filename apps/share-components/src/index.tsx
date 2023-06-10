import { CreateAxiosDefaults } from 'axios';
import { MenuItemData as MenuNestItemData } from 'mui-nested-menu';
import DebitNoteIcon from 'share-components/src/components/AvixoIcons/debit-note-icon';
import AddressFill from './components/AddressFill/address-fill';
import AvatarFill from './components/AvatarFill/avatar-fill';
import AvixoAuthForm from './components/AvixoAuthForm/auth-form';
import AvixoTwoFAForm from './components/AvixoAuthForm/components/2fa-form';
import AvixoAuthForgotEmailForm from './components/AvixoAuthForm/components/forgot-email-form';
import AvixoNewPassword from './components/AvixoAuthForm/components/new-password-form';
import AvixoResetPassword from './components/AvixoAuthForm/components/reset-password';
import AvixoResetSuccessfulPassport from './components/AvixoAuthForm/components/reset-successful';
import AvixoCard, { AvixoCardActionButton, AvixoCardNoResult } from './components/AvixoCard/avixo-card';
import AvixoDrawer from './components/AvixoDrawer/avixo-drawer';
import AvixoDrawerConfirm from './components/AvixoDrawerComfirm/avixo-drawer-confirm';
import AvixoEmail from './components/AvixoEmail';
import AvixoFixedContainer, {
  Form,
  FormActions,
  FormBody,
} from './components/AvixoFixedContainer/avixo-fixed-container';
import AppointmentActionIcon from './components/AvixoIcons/appoinment-action-icon';
import AppointmentIcon from './components/AvixoIcons/appointment-icon';
import BillIcon from './components/AvixoIcons/bill-icon';
import InfoIcon from './components/AvixoIcons/info-icon';
import MoreIcon from './components/AvixoIcons/more-icon';
import NoteAddIcon from './components/AvixoIcons/note-add-icon';
import OngoingCasesIcon from './components/AvixoIcons/ongoing-cases-icon';
import PatientEnrolledIcon from './components/AvixoIcons/patient-enrolled-icon';
import PlusIcon from './components/AvixoIcons/plus-icon';
import ProfileIcon from './components/AvixoIcons/profile-icon';
import SecuritySafeIcon from './components/AvixoIcons/security-safe-icon';
import StatusIcon from './components/AvixoIcons/status-icon';
import { ClockQueueIcon, EndQueueIcon, StartQueueIcon } from './components/AvixoIcons/time-queue-icon';
import QualificationSection from './components/QualificationSection/qualification-section';

import AvixoAutoComplete from './components/AvixoAutoComplete/avixo-autocomplete';
import AvixoCHASStatus from './components/AvixoCHASStatus/chas-status';
import AvixoDisclaimerBar from './components/AvixoDisclaimerBar/avixo-disclaimer-bar';
import AvixoDashboardLayout from './components/AvixoLayout/avixo-dashboard-layout';
import AvixoLayout from './components/AvixoLayout/avixo-layout';
import AvixoListHeader from './components/AvixoListHeader/list-header';
import AvixoListLayout from './components/AvixoListLayout/avixo-list-layout';
import { MenuItemData } from './components/AvixoMenu/menu-type';
import AvixoMenuButton from './components/AvixoMenuButton/menu-button';
import AvixoNavbar from './components/AvixoNavbar/avixo-navbar';
import AvixoNestMenuCustom from './components/AvixoNestMenu/nest-menu';
import AvixoPagination from './components/AvixoPagination/avixo-pagination';
import AvixoPatientAutoComplete, {
  PatientOption,
} from './components/AvixoPatientAutocomplete/avixo-patient-autocomplete';
import AvixoPractitionerAutoComplete from './components/AvixoPractitionerAutocomplete/avixo-practitioner-autocomplete';
import AvixoPhoneNumber from './components/AvixoPhoneNumber';
import AvixoSearchBar from './components/AvixoSearchBar/searchbar';
import AvixoSideBar from './components/AvixoSideBar/avixo-sidebar';
import AvixoSnackbar from './components/AvixoSnackbar/avixo-snackbar';
import AvixoTable from './components/AvixoTable/avixo-table';
import AvixoTabs from './components/AvixoTabs/avixo-tabs';
import AvixoTimeSlot from './components/AvixoTimeSlot';
import AvixoTimeZone from './components/AvixoTimeZone';
import DetailsList from './components/DetailsList/details-list';
import { ListDataProps } from './components/DetailsList/details-list-types';
import EmailFill from './components/EmailFill/email-fill';
import MonthsList from './components/MonthList/months-list';
import OtpAuthForm from './components/PhoneAuthForm/otp-auth-form';
import PhoneAuthForm from './components/PhoneAuthForm/phone-auth-form';
import PhoneNumberFill from './components/PhoneFill/phone-fill';
import ApiRequest from './services/ApiRequest/api-request';
import { ApiError, ApiResponse } from './services/ApiRequest/api-request-type';
import { isDataProps } from './utils/dataUtils';

import { AvixoCardProps } from './components/AvixoCard/avixo-card-types';
import AvixoHTMLEditor from './components/AvixoHTMLEditor/avixo-html-editor';
import ActionFinaliseIcon from './components/AvixoIcons/action-finalise-icon';
import AddSquareIcon from './components/AvixoIcons/add-square-icon';
import AlertIcon from './components/AvixoIcons/alert-icon';
import AngleUpIcon from './components/AvixoIcons/angle-up-icon';
import BackIcon from './components/AvixoIcons/back-square-icon';
import CalendarOutlineIcon from './components/AvixoIcons/calendar-outline-icon';
import CalendarRemoveIcon from './components/AvixoIcons/calendar-remove-icon';
import CallIcon from './components/AvixoIcons/call-icon';
import ClipboardTickIcon from './components/AvixoIcons/clipboard-tick-icon';
import ClockIcon from './components/AvixoIcons/clock-icon';
import CollapseIcon from './components/AvixoIcons/collapsed-icon';
import ConfigIcon from './components/AvixoIcons/config-icon';
import ContactIcon from './components/AvixoIcons/contact-icon';
import CopyIcon from './components/AvixoIcons/copy-icon';
import DispenseIcon from './components/AvixoIcons/dispense-icon';
import DocumentIcon from './components/AvixoIcons/document-icon';
import DollarSquareIcon from './components/AvixoIcons/dollar-square-icon';
import Edit2Icon from './components/AvixoIcons/edit-2-icon';
import ExpandedIcon from './components/AvixoIcons/expanded-icon';
import ExportIcon from './components/AvixoIcons/export-icon';
import FiltersIcon from './components/AvixoIcons/filters-icon';
import FolderAdd from './components/AvixoIcons/folder-add';
import HamburgerIcon from './components/AvixoIcons/hamburger-icon';
import HomeIcon from './components/AvixoIcons/home-icon';
import ImportIcon from './components/AvixoIcons/import-icon';
import Info2Icon from './components/AvixoIcons/info-2-icon';
import LeftIcon from './components/AvixoIcons/left-icon';
import ListIcon from './components/AvixoIcons/list-icon';
import MenuIcon from './components/AvixoIcons/menu-icon';
import MoneyAddIcon from './components/AvixoIcons/money-add';
import OutlinedPrintIcon from './components/AvixoIcons/outlined-print-icon';
import PastQueueIcon from './components/AvixoIcons/past-queue-icon';
import PatientListIcon from './components/AvixoIcons/patient-list-icon';
import PlusOutlined from './components/AvixoIcons/plus-outlined-icon';
import PrintIcon from './components/AvixoIcons/print-icon';
import PrinterIcon from './components/AvixoIcons/printer-icon';
import RadioCheckedIcon from './components/AvixoIcons/radio-button-checked';
import RadioUnCheckedIcon from './components/AvixoIcons/radio-button-unchecked';
import RightIcon from './components/AvixoIcons/right-icon';
import SendIcon from './components/AvixoIcons/send-icon';
import SettleQueueIcon from './components/AvixoIcons/settle-queue-icon';
import SMSIcon from './components/AvixoIcons/sms-icon';
import StarIcon from './components/AvixoIcons/star-icon';
import StartDispensingIcon from './components/AvixoIcons/start-dispensing-icon';
import TickCirCleIcon from './components/AvixoIcons/tick-circle';
import TrashIcon from './components/AvixoIcons/trash-icon';
import TrashOutlineIcon from './components/AvixoIcons/trash-outline-icon';
import UserIcon from './components/AvixoIcons/user-icon';
import AppointmentsIcon from './components/HwardIcons/appointments-icon';
import DischargedIcon from './components/HwardIcons/discharged-icon';
import DischargedIconFrame from './components/HwardIcons/discharged-icons-frame';
import LogoutIcon from './components/HwardIcons/logout-icon';

import AppointmentsOutlineIcon from './components/HwardIcons/appointments-outline-icon';
import CasesIcon from './components/HwardIcons/cases-icon';
import { CloseIcon as HwardCloseIcon } from './components/HwardIcons/close-icon';
import DotsIcon from './components/HwardIcons/dots-icon';
import InvoicesIcon from './components/HwardIcons/invoices-icon';
import LeftArrowIcon from './components/HwardIcons/left-arrow-icon';
import LoadingSpinnerIcon from './components/HwardIcons/loading-spinner-icon';
import PatientInfoIcon from './components/HwardIcons/patient-info-icon';
import VitalIcon from './components/HwardIcons/vital-icon';
import PencilIcon from './components/HwardIcons/pencil-icon';

import HwardFixedContainer from './components/HwardFixedContainer/hward-fixed-container';
import HwardLayout from './components/HwardLayout/hward-layout';
import PatientCard from './components/PatientCard/patient-card';

import type { AuthPhase } from './components/AvixoAuthForm/types';
import type { DefaultFormProps } from './components/AvixoFixedContainer/avixo-fixed-container-types';
import CalendarIcon from './components/AvixoIcons/calendar-icon';
import CandleIcon from './components/AvixoIcons/candle-icon';
import ClockFillIcon from './components/AvixoIcons/clock-fill-icon';
import CloseIcon from './components/AvixoIcons/close-icon';
import DeleteGoalIcon from './components/AvixoIcons/delete-goal-icon';
import EditSquareIcon from './components/AvixoIcons/edit-square-icon';
import EmailIcon from './components/AvixoIcons/email-icon';
import EyeIcon from './components/AvixoIcons/eye-icon';
import MedicalRecordIcon from './components/AvixoIcons/medical-record-icon';
import RefundIcon from './components/AvixoIcons/refund-icon';
import UploadIcon from './components/AvixoIcons/upload-icon';

import ArchiveTickIcon from './components/AvixoIcons/archive-tick-icon';
import VuesaxClipboardIcon from './components/AvixoIcons/vuesax-clipboard';
import AvixoImageAnnotate from './components/AvixoImageAnnotate/avixo-image-annotate';
import type { AvixoTabData } from './components/AvixoTabs/avixo-tabs-types';
import DaysPerWeek from './components/DaysPerWeek/days-per-week';
import HolidaySection from './components/HolidaySection/holiday-section';
import yup from './services/yup';
import DefaultRecord from './types/default-record';
import { PageProps, PermissionToRouteProps, RouteMatchingProps } from './types/page';
import Price from './types/price';
import { getAlertMessage } from './utils/alertUtils';
import { forwardRequest, parsePayloadFieldsToInteger } from './utils/apiUtils';
import { getCookieValue, removeCookieValue, setCookieValue } from './utils/cookieUtils';
import { getToken, removeToken, setToken } from './utils/tokenUtils';

export {
  type ListDataProps,
  type ApiResponse,
  type MenuItemData,
  type CreateAxiosDefaults,
  type AvixoCardProps,
  type DefaultRecord,
  type ApiError,
  type PageProps,
  type PermissionToRouteProps,
  type RouteMatchingProps,
  type DefaultFormProps,
  type AvixoTabData,
  type MenuNestItemData,
  type AuthPhase,
  type PatientOption,
  type Price,
  /**
   * Export Component
   */
  AvixoTable,
  AvixoNavbar,
  AvixoTabs,
  DetailsList,
  AvixoSideBar,
  AvixoSnackbar,
  AvixoMenuButton,
  AddressFill,
  AvatarFill,
  PhoneNumberFill,
  QualificationSection,
  EmailFill,
  AvixoPhoneNumber,
  AvixoTimeSlot,
  AvixoTimeZone,
  AvixoEmail,
  AvixoAuthForm,
  AvixoTwoFAForm,
  AvixoFixedContainer,
  AvixoDrawerConfirm,
  AvixoCard,
  AvixoCardNoResult,
  AvixoCardActionButton,
  AvixoPagination,
  AvixoSearchBar,
  AvixoHTMLEditor,
  AvixoListHeader,
  AvixoDrawer,
  AvixoDisclaimerBar,
  MonthsList,
  DaysPerWeek,
  AvixoCHASStatus,
  Form,
  FormBody,
  FormActions,
  AvixoPatientAutoComplete,
  AvixoPractitionerAutoComplete,
  AvixoAutoComplete,
  AvixoListLayout,
  AvixoAuthForgotEmailForm,
  AvixoResetPassword,
  AvixoResetSuccessfulPassport,
  AvixoNewPassword,
  AvixoImageAnnotate,
  AvixoNestMenuCustom,
  HolidaySection,
  /**
   * Hward
   */
  HwardLayout,
  PatientCard,
  PhoneAuthForm,
  OtpAuthForm,
  HwardFixedContainer,

  /**
   * Icons
   */
  MoreIcon,
  StatusIcon,
  InfoIcon,
  PlusIcon,
  SecuritySafeIcon,
  BillIcon,
  ProfileIcon,
  HomeIcon,
  ContactIcon,
  ConfigIcon,
  AppointmentIcon,
  ExportIcon,
  ImportIcon,
  PlusOutlined,
  TrashIcon,
  FolderAdd,
  Edit2Icon,
  PrintIcon,
  AddSquareIcon,
  ActionFinaliseIcon,
  StartDispensingIcon,
  DispenseIcon,
  PatientListIcon,
  ClockIcon,
  OutlinedPrintIcon,
  ClipboardTickIcon,
  DollarSquareIcon,
  TickCirCleIcon,
  RadioCheckedIcon,
  RadioUnCheckedIcon,
  Info2Icon,
  MenuIcon,
  BackIcon,
  HamburgerIcon,
  CallIcon,
  DocumentIcon,
  UserIcon,
  CopyIcon,
  EmailIcon,
  CalendarIcon,
  EditSquareIcon,
  ClockFillIcon,
  MedicalRecordIcon,
  DeleteGoalIcon,
  CloseIcon,
  StarIcon,
  SMSIcon,
  PrinterIcon,
  AlertIcon,
  DebitNoteIcon,
  AngleUpIcon,
  FiltersIcon,
  CalendarOutlineIcon,
  ListIcon,
  UploadIcon,
  LeftIcon,
  RightIcon,
  CalendarRemoveIcon,
  SendIcon,
  SettleQueueIcon,
  PastQueueIcon,
  TrashOutlineIcon,
  OngoingCasesIcon,
  NoteAddIcon,
  PatientEnrolledIcon,
  AppointmentActionIcon,
  RefundIcon,
  StartQueueIcon,
  EndQueueIcon,
  ClockQueueIcon,
  MoneyAddIcon,
  ExpandedIcon,
  CollapseIcon,
  CandleIcon,
  EyeIcon,
  ArchiveTickIcon,
  /**
   * Hward Icons
   * */
  DischargedIcon,
  DischargedIconFrame,
  AppointmentsIcon,
  PatientInfoIcon,
  VitalIcon,
  CasesIcon,
  LeftArrowIcon,
  InvoicesIcon,
  HwardCloseIcon,
  AppointmentsOutlineIcon,
  VuesaxClipboardIcon,
  LogoutIcon,
  LoadingSpinnerIcon,
  DotsIcon,
  PencilIcon,
  /**
   * Export lib, services
   */
  ApiRequest,

  /**
   * Export Layout
   */
  AvixoDashboardLayout,
  AvixoLayout,

  /**
   * Export utils
   */
  getToken,
  setToken,
  removeToken,
  isDataProps,
  forwardRequest,
  yup,
  getAlertMessage,
  parsePayloadFieldsToInteger,
  getCookieValue,
  setCookieValue,
  removeCookieValue,
};
