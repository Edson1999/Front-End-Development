import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  // Image,
} from '@nextui-org/react';

export default function GlobalCard(props) {
  const { headerText, bodyText, footerText } = props;
  return (
    <Card className="m-3 h-[97%]">
      {headerText && (
        <>
          <CardHeader className="flex gap-4 bg-blue-700">
            {/* <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            /> */}
            {headerText}
          </CardHeader>
          <Divider />
        </>
      )}
      {bodyText && (
        <>
          <CardBody className="p-4 overflow-auto">{bodyText}</CardBody>
        </>
      )}
      {footerText && (
        <>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              {footerText}
            </Link>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

GlobalCard.propTypes = {
  headerText: PropTypes.object,
  bodyText: PropTypes.object,
  footerText: PropTypes.object,
};
