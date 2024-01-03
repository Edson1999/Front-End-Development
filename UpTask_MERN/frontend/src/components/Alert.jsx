import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  return (
    <Card
      className="absolute bottom-4 right-4 border-none"
      isFooterBlurred
      radius="lg"
    >
      <CardHeader>
        <p>Some title pitero</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{alert.msg}</p>
      </CardBody>
    </Card>
  );
};

Alert.propTypes = {
  alert: PropTypes.object,
};

export default Alert;
