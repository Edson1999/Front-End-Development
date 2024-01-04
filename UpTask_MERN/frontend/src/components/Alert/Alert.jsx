import { Card, CardBody, CardHeader } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { CheckIcon } from './CheckIcon';
import { InfoIcon } from './IconInfo';

const Alert = ({ alert }) => {
  const { title, msg, error } = alert;
  return (
    <Card
      className={`absolute bottom-4 right-4 z-[1] border-none 
      }`}
      isFooterBlurred
      radius="lg"
    >
      <CardHeader
        className={`flex gap-4 text-white ${
          error ? 'bg-[#DC3545]' : 'bg-[#28A745]'
        }`}
      >
        {error ? <InfoIcon /> : <CheckIcon />}

        <p className="text-lg">{title}</p>
      </CardHeader>
      <CardBody className="mb-2">
        <p className=" font-normal text-base">{msg}</p>
      </CardBody>
    </Card>
  );
};

Alert.propTypes = {
  alert: PropTypes.object,
};

export default Alert;
