import { Button } from "@chakra-ui/react";
import { transparentize } from "polished";
import styled from "styled-components";
import { themeColors } from "../../assets/colors";

export const PrimaryButton = styled(Button)`
color: white;
background-color: ${themeColors.primaryButton};

&:hover {
  background-color: ${transparentize(0.3, themeColors.primaryButton)};
}
  }
`;
