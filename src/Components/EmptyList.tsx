import React, { FunctionComponent } from 'react';
import {
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Button,
  EmptyStateVariant,
  ButtonVariant,
} from '@patternfly/react-core';
import { AddCircleOIcon, SearchIcon } from '@patternfly/react-icons';
import { useRedirect } from '../QueryParams/';

interface Props {
  label?: string;
  title?: string;
  message?: string;
  canAdd?: boolean;
  showButton?: boolean;
  path?: string;
  onButtonClick?: () => null;
}

const EmptyList: FunctionComponent<Props> = ({
  label = '',
  title = 'No items found.',
  message = '',
  canAdd = false,
  showButton = false,
  path = undefined,
  onButtonClick = undefined,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const redirect = useRedirect() as undefined;

  return (
    <EmptyState variant={EmptyStateVariant.full}>
      <EmptyStateIcon icon={canAdd ? AddCircleOIcon : SearchIcon} />
      <Title size="lg" headingLevel="h3">
        {title}
      </Title>
      <EmptyStateBody>{message}</EmptyStateBody>
      {(canAdd || showButton) && (
        <Button
          key="add-item-button"
          variant={ButtonVariant.primary}
          aria-label={label}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /* @ts-ignore */
            if (path) redirect(path);
            if (onButtonClick) onButtonClick();
          }}
        >
          {label}
        </Button>
      )}
    </EmptyState>
  );
};

export default EmptyList;
