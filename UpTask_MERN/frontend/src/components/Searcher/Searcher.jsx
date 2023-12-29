import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from '@nextui-org/react';
import { SearchIcon } from './SearchIcon';
import { users } from './data';
import useProjects from '../../hooks/useProjects';
import { useNavigate } from 'react-router-dom';

const ProjectSearcher = () => {
  const { searcher, handleSearcher, projects } = useProjects();
  const navigate = useNavigate();

  return (
    <Autocomplete
      classNames={{
        base: 'max-w-xs',
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
      }}
      defaultItems={users}
      inputProps={{
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[48px]',
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            'rounded-medium',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'dark:data-[hover=true]:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[hover=true]:bg-default-200',
            'data-[selectable=true]:focus:bg-default-100',
            'data-[focus-visible=true]:ring-default-500',
          ],
        },
      }}
      aria-label="Select an employee"
      placeholder="Enter employee name"
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background',
        },
      }}
      startContent={
        <SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />
      }
      radius="full"
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar
                alt={item.name}
                className="flex-shrink-0"
                size="sm"
                src={item.avatar}
              />
              <div className="flex flex-col">
                <span className="text-small">{item?.name}</span>
                <span className="text-tiny text-default-400">{item.team}</span>
              </div>
            </div>
            <Button
              className="border-small mr-0.5 font-medium shadow-small"
              radius="full"
              size="sm"
              variant="bordered"
            >
              Add
            </Button>
          </div>
        </AutocompleteItem>
      )}
      {projects?.map((project) => (
        <AutocompleteItem key={project._id} textValue={project.name}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar alt={project.name} className="flex-shrink-0" size="sm" />
              <div className="flex flex-col">
                <span className="text-small">{project?.name}</span>
              </div>
            </div>
            <Button
              className="border-small mr-0.5 font-medium shadow-small"
              radius="full"
              size="sm"
              variant="bordered"
              onClick={() => {
                navigate(`/projects/${project._id}`);
              }}
            >
              Add
            </Button>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default ProjectSearcher;
