import styled from 'styled-components';
import Modal from '/imports/ui/components/modal/simple/component';
import Button from '/imports/ui/components/button/component';
import { colorBackground, colorWhite } from '/imports/ui/stylesheets/styled-components/palette';
import {
  jumboPaddingY,
  minModalHeight,
  headingsFontWeight,
  mdPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import { fontSizeLarge } from '/imports/ui/stylesheets/styled-components/typography';

const ScreenShareModal = styled(Modal)`
  padding: ${jumboPaddingY};
  min-height: ${minModalHeight};
  text-align: center;
`;

const Title = styled.h3`
  font-weight: ${headingsFontWeight};
  font-size: ${fontSizeLarge};
  color: ${colorBackground};
  white-space: normal;
  padding-bottom: ${mdPaddingX};
`;

const ScreenShareButton = styled(Button)`
  ${({ ghost }) => ghost && `
      span {
        box-shadow: none;
        background-color: transparent !important;
        border-color: ${colorWhite} !important;
      }
   `}
`;

export default {
  ScreenShareModal,
  Title,
  ScreenShareButton,
};
