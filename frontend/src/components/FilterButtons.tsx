import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

interface FilterButtonsProps {
  options: string[];
  defaultIndex?: number; // Optional prop for the default selected index
  disabledOptions?: number[]; // Optional prop for disabled button indices
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  options,
  defaultIndex = 0, // Default to the first option if not provided
  disabledOptions = [], // Default to no disabled options
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        {options[selectedIndex]}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem key={option} selected={index === selectedIndex} onClick={() => handleMenuItemClick(index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FilterButtons;
