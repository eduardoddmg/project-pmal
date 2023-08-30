import {
  Accordion as AccordionChakra,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export const Accordion = ({ title, children }) => {
  return (
    <AccordionChakra defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {children}
        </AccordionPanel>
      </AccordionItem>
    </AccordionChakra>
  );
};
