import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import { SearchIcon } from './SearchIcon.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import useProjects from '../../hooks/useProjects.jsx';
import user from '../../resources/user.svg';
import Searcher from '../Searcher.jsx';
// import ProjectSearcher from '../Searcher/Searcher.jsx';

export default function App() {
  const { auth, closeSesionAuth } = useAuth();
  const { handleSearcher, signOut } = useProjects();

  const handleCloseSession = () => {
    closeSesionAuth();
    signOut();
    localStorage.removeItem('token');
  };

  return (
    <Navbar position="static" className="bg-white" isBordered maxWidth="full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="sm:block font-bold text-blue-600 text-3xl">UpTask</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center gap-8" justify="end">
        <Input
          classNames={{
            base: 'max-w-xl sm:max-w-[22rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Ingresa una palabra para buscar..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          onClick={handleSearcher}
        />
        {/* <ProjectSearcher /> */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="User"
              size="sm"
              src={user}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Sesión Iniciada como</p>
              <p className="font-semibold text-blue-600">{auth?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">Mi Perfil</DropdownItem>
            <DropdownItem key="configurations">Configuraciones</DropdownItem>
            <DropdownItem key="help_and_feedback">
              Ayuda & Comentarios
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={handleCloseSession}
            >
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <Searcher />
    </Navbar>
  );
}
