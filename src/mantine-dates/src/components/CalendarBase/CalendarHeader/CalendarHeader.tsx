import React from 'react';
import {
  ActionIcon,
  UnstyledButton,
  SelectChevronIcon,
  MantineSize,
  Selectors,
  DefaultProps,
} from '@mantine/core';
import { ArrowIcon } from './ArrowIcon';
import useStyles from './CalendarHeader.styles';

export type CalendarHeaderStylesNames = Selectors<typeof useStyles>;

export interface CalendarHeaderProps
  extends DefaultProps<CalendarHeaderStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  hasPrevious: boolean;
  hasNext: boolean;
  onNext?(): void;
  onPrevious?(): void;
  onNextLevel?(): void;
  label?: string;
  nextLevelDisabled?: boolean;
  size?: MantineSize;
  __staticSelector?: string;
  nextLabel?: string;
  previousLabel?: string;
  preventLevelFocus?: boolean;
  preventFocus?: boolean;
  __stopPropagation?: boolean;
}

const iconSizes = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
};

export function CalendarHeader({
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  onNextLevel,
  className,
  label,
  nextLevelDisabled,
  size,
  classNames,
  styles,
  __staticSelector = 'CalendarHeader',
  nextLabel,
  previousLabel,
  preventLevelFocus = false,
  preventFocus,
  unstyled,
  __stopPropagation,
  ...others
}: CalendarHeaderProps) {
  const { classes, cx, theme } = useStyles(
    { size },
    { classNames, styles, unstyled, name: __staticSelector }
  );

  const iconSize = theme.fn.size({ size, sizes: iconSizes });

  return (
    <div className={cx(classes.calendarHeader, className)} {...others}>
      <ActionIcon<'button'>
        className={classes.calendarHeaderControl}
        disabled={!hasPrevious}
        onClick={onPrevious}
        aria-label={previousLabel}
        onMouseDown={(event) => preventFocus && event.preventDefault()}
        unstyled={unstyled}
        data-mantine-stop-propagation={__stopPropagation || undefined}
      >
        <ArrowIcon direction="left" width={iconSize} height={iconSize} />
      </ActionIcon>

      <UnstyledButton<'button'>
        unstyled={unstyled}
        className={classes.calendarHeaderLevel}
        disabled={nextLevelDisabled}
        onClick={onNextLevel}
        tabIndex={preventLevelFocus ? -1 : 0}
        onMouseDown={(event) => preventFocus && event.preventDefault()}
        data-mantine-stop-propagation={__stopPropagation || undefined}
      >
        {label}
        {!nextLevelDisabled && (
          <SelectChevronIcon
            error={false}
            size={size}
            className={classes.calendarHeaderLevelIcon}
          />
        )}
      </UnstyledButton>

      <ActionIcon<'button'>
        className={classes.calendarHeaderControl}
        disabled={!hasNext}
        onClick={onNext}
        aria-label={nextLabel}
        unstyled={unstyled}
        onMouseDown={(event) => preventFocus && event.preventDefault()}
        data-mantine-stop-propagation={__stopPropagation || undefined}
      >
        <ArrowIcon direction="right" width={iconSize} height={iconSize} />
      </ActionIcon>
    </div>
  );
}

CalendarHeader.displayName = '@mantine/dates/CalendarHeader';
